
import { v4 as uuidv4 } from "uuid";
import { JWEHelper } from "./utils/JWEHelper";
import Constants from "./utils/Constants";
export default class NhcxOutGoingRequest {
  private Constants: any;
  private participantCode: string;
  constructor(options: { participantCode: string }) {
    this.Constants = new Constants();
    this.participantCode = options.participantCode;
  }

  private createHeader(options: {
    recipientCode: string | any[];
    apiCallId?: any;
    correlationId?: string;
    workflowId?: string;
  }) {
    const headers = {
      [this.Constants.ALG]: "RSA-OAEP",
      [this.Constants.ENC]: "A256GCM",
      [this.Constants.HCX_API_CALL_ID]: options.apiCallId || uuidv4(),
      [this.Constants.HCX_TIMESTAMP]: new Date().toISOString(),
    };

    headers[this.Constants.HCX_SENDER_CODE] = this.participantCode;
    headers[this.Constants.HCX_RECIPIENT_CODE] = options.recipientCode;
    headers[this.Constants.HCX_CORRELATION_ID] =
      options.correlationId || uuidv4();
    headers[this.Constants.WORKFLOW_ID] = options.workflowId || uuidv4();

    return headers;
  }

  async encryptPayload(options: {
    fhirPayload: any;
    recipientCode: any;
    apiCallId?: any;
    correlationId?: any;
    workflowId?: any;
    receipantPublicCert: any;
  }) {
    try {
      const headers = this.createHeader({
        recipientCode: options.recipientCode,
        correlationId: options.correlationId,
        workflowId: options.workflowId,
        apiCallId: options.apiCallId,
      });
      if (typeof options.fhirPayload !== "object") {
        throw new Error("Fhir payload must be an object");
      }
      const publicCert = options.receipantPublicCert;
      const encrypted = await JWEHelper.encrypt({
        cert: publicCert.data,
        headers,
        payload: options.fhirPayload,
      });
      return encrypted;
    } catch (error: any) {
      console.error(
        `Error in encryptPayload: ${error.message}\n${error.stack}`
      );
    }
  }
}
