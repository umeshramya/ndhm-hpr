export const HcxStatus = [
    "request.initiated",
    "request.queued",
    "response.complete",
    "response.partial",
    "response.error"
  ] as const
  
  
 export  interface  HcxProtectedHeaders {
    "x-hcx-api_call_id": string;
    "x-hcx-workflow_id": string;
    "x-hcx-request_id": string;
    "x-hcx-status": typeof HcxStatus[number];
    "x-hcx-timestamp": string;
    "x-hcx-sender_code": string;
    "x-hcx-recipient_code": string;
    "x-hcx-correlation_id": string;
    "x-hcx-ben-abha-id" : string
  }


