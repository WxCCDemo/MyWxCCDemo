# DBS Webex Connect Secure OTP CRM Gate

This project is a reference implementation for a banking contact-center flow where a Webex AI Agent or Human Agent sends the customer to a secure OTP page before opening a CRM portal.

The intended policy is simple:

1. The AI Agent gathers or receives customer identity context.
2. Webex Connect uses its Generate OTP node to send the OTP to the registered mobile number.
3. The AI Agent gives the customer a secure verification page instead of asking them to say or type the OTP in the conversation.
4. The secure page submits the OTP to a Webex Connect flow that uses the Verify OTP node.
5. Webex Connect calls this service with only `verified`, `denied`, or `pending`.
6. The CRM URL is returned only after verification.
7. If the AI Agent cannot complete verification, the Human Agent can trigger the same secure OTP gate before opening CRM.

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

In local demo mode, enter OTP `1234` on the customer page to verify successfully.

For production, set your Webex Connect Verify OTP endpoint with:

```text
WEBEX_CONNECT_VERIFY_URL=https://your-webex-connect-endpoint.example/verify-otp
```

## Webex Connect Setup

The Webex Connect flow should:

1. Receive the AI Agent verification request.
2. Generate and send the OTP using the Webex Connect Generate OTP node.
3. Return this service's `verification_url` to the AI Agent.
4. Receive the OTP from the secure page.
5. Verify it using the Webex Connect Verify OTP node.
6. Call `/api/webex-connect/otp/result` with only the final status.

The OTP itself should not be returned to the AI Agent or stored in this service.

## Configuration

Set these environment variables when deploying:

```text
PORT=3000
PUBLIC_BASE_URL=https://your-verification-service.example.com
AGENT_SHARED_SECRET=long-random-secret
CRM_BASE_URL=https://crm.example-bank.internal/customer
WEBEX_CONNECT_VERIFY_URL=https://your-webex-connect-endpoint.example/verify-otp
```

## API

### AI Agent Action

```http
POST /api/ai-agent/otp/start
Authorization: Bearer ${AGENT_SHARED_SECRET}
Content-Type: application/json
```

```json
{
  "customer_id": "CUST-48291",
  "customer_name": "Avery Tan",
  "registered_mobile": "6587414102",
  "contact_id": "webex-contact-123",
  "reason": "Open CRM profile during support call"
}
```

### Human Agent Push

```http
POST /api/human-agent/otp/start
Authorization: Bearer ${AGENT_SHARED_SECRET}
Content-Type: application/json
```

Uses the same payload. The audit trail records `human-agent` as the actor.

### Example Response

```json
{
  "verification_status": "pending",
  "verification_id": "477a89f8-a8a8-45ab-bd4e-570f168b4e49",
  "customer_id": "CUST-48291",
  "method": "webex-connect-otp",
  "verification_url": "https://your-verification-service.example.com/verify.html?id=477a89f8-a8a8-45ab-bd4e-570f168b4e49",
  "message": "Customer verification is pending. Keep CRM access blocked.",
  "crm_url": null
}
```

### Webex Connect Result Callback

```http
POST /api/webex-connect/otp/result
Authorization: Bearer ${AGENT_SHARED_SECRET}
Content-Type: application/json
```

```json
{
  "verification_id": "477a89f8-a8a8-45ab-bd4e-570f168b4e49",
  "verification_status": "verified"
}
```

## Webex Setup

See [docs/webex-flow-config.md](docs/webex-flow-config.md) and [webex-ai-agent-action.json](webex-ai-agent-action.json).

## Security Notes

- Do not let the AI Agent construct arbitrary CRM URLs.
- Keep the Webex shared secret in a vault.
- Do not return OTP values to the AI Agent, transcript, CRM, or this service's audit logs.
- Treat `verification_id` and the Webex Connect verification result as audit records.
- In production, replace the in-memory session store with your bank-approved audit store.
