# Architecture

```mermaid
sequenceDiagram
    participant Customer
    participant Webex as Webex AI Agent
    participant Flow as Webex Connect / Flow Designer
    participant Page as Secure OTP Page
    participant Gate as CRM Gate Service
    participant Agent as Human Agent Desktop
    participant CRM

    Customer->>Webex: Requests account help
    Webex->>Flow: Action: secure_otp_customer_verification
    Flow->>Flow: Generate OTP node
    Flow->>Gate: POST /api/ai-agent/otp/start
    Gate-->>Flow: verification_url
    Flow-->>Webex: Fulfillment outcome
    Webex-->>Customer: Open secure verification page
    Customer->>Page: Enters OTP outside transcript
    Page->>Flow: Submit OTP
    Flow->>Flow: Verify OTP node
    Flow->>Gate: POST /api/webex-connect/otp/result
    alt Verified
        Agent->>CRM: Open protected profile
    else Not verified
        Agent->>Gate: POST /api/human-agent/otp/start
    end
```

## Components

- Webex AI Agent action: Collects the needed slots and starts fulfillment.
- Webex Connect or Flow Designer: Generates the OTP, verifies the OTP, and returns only the result.
- Secure OTP Page: Receives the OTP directly from the customer outside the AI Agent transcript.
- CRM Gate Service: Owns the audit status and CRM release decision.
- CRM: Opened only when the service returns `verification_status=verified`.

## Production Hardening

- Persist sessions and audit events in an approved database.
- Add rate limits by customer ID, contact ID, and agent ID.
- Enforce mutual TLS or private networking between Webex fulfillment and the service where possible.
- Add a case ID or contact session ID to every request and audit row.
- Mask customer identifiers in logs.
