import crypto from "node:crypto";

const sessions = new Map();

export function createSession(input) {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const session = {
    id,
    createdAt: now,
    updatedAt: now,
    status: "pending",
    method: input.method || "webex-connect-otp",
    otp: null,
    crmUrl: null,
    input,
    audit: [
      {
        at: now,
        event: "session.created",
        actor: input.actor || "ai-agent"
      }
    ]
  };
  sessions.set(id, session);
  return session;
}

export function getSession(id) {
  return sessions.get(id);
}

export function updateSession(id, patch, auditEvent) {
  const session = sessions.get(id);
  if (!session) return null;

  Object.assign(session, patch, { updatedAt: new Date().toISOString() });
  if (auditEvent) {
    session.audit.push({
      at: session.updatedAt,
      ...auditEvent
    });
  }

  return session;
}

export function listSessions() {
  return Array.from(sessions.values()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
