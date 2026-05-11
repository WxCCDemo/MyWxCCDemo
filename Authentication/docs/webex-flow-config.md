# Webex AI Agent Configuration

Current Webex AI Agent action fulfillment can be handled with Webex Connect fulfillment flows or custom events back to Flow Designer. This project is designed to sit behind that flow as the CRM gate while Webex Connect owns OTP generation and OTP verification.

## Autonomous AI Agent Action

Create an action named:

```text
secure_otp_customer_verification
```

Suggested action description:

```text
Verify the customer through a secure OTP page before CRM access or protected customer data is allowed. Use this action when the customer asks for account-specific banking help or when a CRM profile must be opened. Do not ask the customer to say or type the OTP in the AI Agent conversation.
```

Input slots:

```json
{
  "customer_id": "Bank customer identifier from the contact flow or lookup.",
  "customer_name": "Customer display name.",
  "registered_mobile": "Registered mobile number used by Webex Connect Generate OTP.",
  "contact_id": "Webex contact or interaction ID.",
  "reason": "Why verification is needed.",
  "ipaddr": "Optional customer IP address."
}
```

## Webex Connect Fulfillment Flow

1. Create a Webex Connect flow with AI Agent as the start node.
2. Add an HTTP node.
3. Use the Webex Connect Generate OTP node to send the OTP.
4. POST to this service to create the CRM gate session:

```text
https://YOUR-SERVICE.example.com/api/ai-agent/otp/start
```

5. Return `verification_url` to the AI Agent.
6. The customer enters the OTP on the secure page, which posts to your Webex Connect Verify OTP flow.
7. After the Verify OTP node, call this service:

```text
https://YOUR-SERVICE.example.com/api/webex-connect/otp/result
```

8. Configure flow outcomes to return:

```json
{
  "verification_status": "$verification_status",
  "verification_id": "$verification_id",
  "message": "$message",
  "verification_url": "$verification_url",
  "crm_url": "$crm_url"
}
```

9. In the AI Agent response logic, only treat `verification_status=verified` as permission to continue.

## Human Agent Fallback

If the AI Agent cannot verify the customer, transfer with context:

```json
{
  "escalation_type": "custom",
  "escalation_trigger": "otp_verification_required",
  "actions": {
    "otp_verification_required": [
      {
        "type": "transfer",
        "input": {
          "customer_id": "{{customer_id}}",
          "registered_mobile": "{{registered_mobile}}",
          "verification_status": "{{verification_status}}"
        }
      }
    ]
  }
}
```

The Human Agent desktop can call:

```text
POST /api/human-agent/otp/start
```

The CRM should remain blocked unless that response returns:

```json
{
  "verification_status": "verified"
}
```
