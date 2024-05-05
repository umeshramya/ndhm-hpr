
import { v4 as uuidv4 } from "uuid";
import { JWEHelper } from "./utils/JWEHelper";
import Constants from "./utils/Constants";
import axios from "axios";
export default class NhcxOutGoingRequest {
  private Constants: any;
  private participantCode: string;
  private protocolBasePath:string;
  private accessToken:string
  constructor(options: { participantCode: string, protocolBasePath:string, accessToken:string }) {
    this.Constants = new Constants();
    this.participantCode = options.participantCode;
    this.protocolBasePath = options.protocolBasePath
    this.accessToken = options.accessToken
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

  private async encryptPayload(options: {
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


 private  async initializeHCXCall(operation: any, jwePayload: any, accessToken:string) {
    try {
      const url = `${this.protocolBasePath}${operation}`;
      const payload = JSON.stringify({ payload: jwePayload, });
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      try {
        const response = await axios.post(url, payload, { headers });
        return response.data;
      } catch (e) {
        console.error(`Initialize HCX: ${e}`);
      }
    } catch (error) {
      console.error(`Initialize HCX: ${error}`);
    }
  }


  async process(options:{fhirPayload: any, recipientCode: any, operation: any, apiCallId: any, correlationId: any, workflowId: any, receipantPublicCert:any }) {
    try {
      const encryptedPayload = await this.encryptPayload({
        "apiCallId" : options.apiCallId,
        "correlationId" : options.correlationId,
        "fhirPayload" : options.fhirPayload,
        "receipantPublicCert" : options.receipantPublicCert,
        "recipientCode" : options.recipientCode,
        "workflowId" : options.workflowId
      });
      const response = await this.initializeHCXCall(options.operation, encryptedPayload,this.accessToken);
      return {
        payload: encryptedPayload,
        response,
      };
    } catch (error) {
      console.error(`Error in process: ${error}`);

      throw new Error("Processing failed.");
    }
  }

}
