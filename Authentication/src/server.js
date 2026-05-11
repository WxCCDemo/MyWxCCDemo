import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createSession, getSession, listSessions, updateSession } from "./sessionStore.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const publicDir = join(__dirname, "..", "public");
const port = Number(process.env.PORT || 3000);

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(body, null, 2));
}

function sendJavascript(res, body) {
  res.writeHead(200, {
    "Content-Type": "application/javascript; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(body);
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function isAuthorized(req) {
  const secret = process.env.AGENT_SHARED_SECRET;
  if (!secret) return true;
  return req.headers.authorization === `Bearer ${secret}`;
}

function crmUrlFor(customerId) {
  const base = process.env.CRM_BASE_URL || "https://crm.example-bank.internal/customer";
  return `${base}/${encodeURIComponent(customerId)}`;
}

function publicUrlFor(path) {
  const base = process.env.PUBLIC_BASE_URL || `http://localhost:${port}`;
  return `${base.replace(/\/$/, "")}${path}`;
}

function verifyUrlForPublicConfig() {
  if (process.env.WEBEX_CONNECT_VERIFY_URL) {
    return process.env.WEBEX_CONNECT_VERIFY_URL;
  }

  return process.env.DUO_MOCK_MODE === "true" ? "/api/mock-webex-connect/otp/verify" : "";
}

function toAgentOutcome(session) {
  return {
    verification_status: session.status,
    verification_id: session.id,
    customer_id: session.input.customerId,
    method: session.method,
    verification_url: session.status === "pending" ? session.input.verificationUrl : null,
    message:
      session.status === "verified"
        ? "Customer verified. CRM access can be opened."
        : session.status === "pending"
          ? "Customer verification is pending. Keep CRM access blocked."
          : "Customer was not verified. Keep CRM access blocked.",
    crm_url: session.status === "verified" ? session.crmUrl : null
  };
}

async function handleOtpStart(req, res, actor = "ai-agent") {
  if (!isAuthorized(req)) return sendJson(res, 401, { error: "Unauthorized" });

  const body = await readJson(req);
  const input = {
    actor,
    method: "webex-connect-otp",
    customerId: body.customer_id || body.customerId,
    customerName: body.customer_name || body.customerName,
    registeredMobile: body.registered_mobile || body.registeredMobile,
    contactId: body.contact_id || body.contactId,
    reason: body.reason || "CRM access request"
  };

  if (!input.customerId || !input.registeredMobile) {
    return sendJson(res, 400, {
      error: "customer_id and registered_mobile are required"
    });
  }

  const session = createSession(input);
  const verificationPath = `/verify.html?id=${encodeURIComponent(session.id)}`;
  const verificationUrl = publicUrlFor(verificationPath);

  const updated = updateSession(
    session.id,
    {
      otp: {
        attempts: 0,
        maxAttempts: 3,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString()
      },
      input: {
        ...session.input,
        verificationUrl
      }
    },
    {
      event: "webex_connect.otp_session.created",
      actor,
      delivery: "webex-connect",
      maskedMobile: input.registeredMobile.replace(/\d(?=\d{4})/g, "*")
    }
  );

  return sendJson(res, 200, {
    ...toAgentOutcome(updated),
    note: "Use Webex Connect Generate OTP and Verify OTP nodes. This service never creates, stores, or validates the OTP."
  });
}

async function handleOtpResult(req, res) {
  if (!isAuthorized(req)) return sendJson(res, 401, { error: "Unauthorized" });

  const body = await readJson(req);
  const session = getSession(body.verification_id || body.id);
  const status = body.verification_status || body.status;

  if (!session || session.method !== "webex-connect-otp" || !session.otp) {
    return sendJson(res, 404, { error: "Verification session not found" });
  }

  if (session.status !== "pending") {
    return sendJson(res, 200, toAgentOutcome(session));
  }

  if (new Date(session.otp.expiresAt).getTime() < Date.now()) {
    const expired = updateSession(
      session.id,
      { status: "expired" },
      { event: "otp.expired", actor: "customer" }
    );
    return sendJson(res, 200, toAgentOutcome(expired));
  }

  if (status === "verified") {
    const verified = updateSession(
      session.id,
      {
        status: "verified",
        crmUrl: crmUrlFor(session.input.customerId)
      },
      { event: "webex_connect.otp.verified", actor: "webex-connect" }
    );
    return sendJson(res, 200, toAgentOutcome(verified));
  }

  const attempts = session.otp.attempts + 1;
  const nextOtp = { ...session.otp, attempts };
  const nextStatus = status === "denied" || attempts >= session.otp.maxAttempts ? "denied" : "pending";
  const updated = updateSession(
    session.id,
    {
      status: nextStatus,
      otp: nextOtp
    },
    {
      event: nextStatus === "denied" ? "webex_connect.otp.denied" : "webex_connect.otp.failed_attempt",
      actor: "webex-connect"
    }
  );

  return sendJson(res, 200, {
    ...toAgentOutcome(updated),
    remaining_attempts: Math.max(0, session.otp.maxAttempts - attempts)
  });
}

async function handleMockOtpVerify(req, res) {
  if (process.env.DUO_MOCK_MODE !== "true") {
    return sendJson(res, 404, { error: "Mock OTP verification is disabled" });
  }

  const body = await readJson(req);
  const session = getSession(body.verification_id || body.id);

  if (!session || session.method !== "webex-connect-otp" || !session.otp) {
    return sendJson(res, 404, { error: "Verification session not found" });
  }

  const verificationStatus = String(body.otp || "") === "1234" ? "verified" : "pending";
  const mockReq = {
    headers: {},
    async *[Symbol.asyncIterator]() {
      yield Buffer.from(
        JSON.stringify({
          verification_id: session.id,
          verification_status: verificationStatus
        })
      );
    }
  };

  return handleOtpResult(mockReq, res);
}

async function serveStatic(req, res) {
  const requestPath = req.url === "/" ? "/index.html" : new URL(req.url, "http://localhost").pathname;
  const safePath = requestPath.replace(/\.\./g, "");
  const filePath = join(publicDir, safePath);
  const type = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8"
  }[extname(filePath)] || "application/octet-stream";

  try {
    const content = await readFile(filePath);
    res.writeHead(200, { "Content-Type": type });
    res.end(content);
  } catch {
    sendJson(res, 404, { error: "Not found" });
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === "GET" && url.pathname === "/health") {
      return sendJson(res, 200, { ok: true });
    }

    if (req.method === "POST" && url.pathname === "/api/ai-agent/otp/start") {
      return handleOtpStart(req, res, "ai-agent");
    }

    if (req.method === "POST" && url.pathname === "/api/human-agent/otp/start") {
      return handleOtpStart(req, res, "human-agent");
    }

    if (req.method === "POST" && url.pathname === "/api/webex-connect/otp/result") {
      return handleOtpResult(req, res);
    }

    if (req.method === "POST" && url.pathname === "/api/mock-webex-connect/otp/verify") {
      return handleMockOtpVerify(req, res);
    }

    if (req.method === "GET" && url.pathname === "/api/sessions") {
      return sendJson(res, 200, { sessions: listSessions().map(toAgentOutcome) });
    }

    if (req.method === "GET" && url.pathname.startsWith("/api/sessions/")) {
      const session = getSession(url.pathname.split("/").pop());
      return session ? sendJson(res, 200, session) : sendJson(res, 404, { error: "Session not found" });
    }

    if (req.method === "GET" && url.pathname === "/config.js") {
      return sendJavascript(
        res,
        `window.WEBEX_CONNECT_VERIFY_URL = ${JSON.stringify(verifyUrlForPublicConfig())};\n`
      );
    }

    if (req.method === "GET") {
      return serveStatic(req, res);
    }

    sendJson(res, 405, { error: "Method not allowed" });
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
});

server.listen(port, () => {
  console.log(`Webex Connect OTP CRM gate listening on http://localhost:${port}`);
});
