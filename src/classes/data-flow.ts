import Header from "./header";
import { v4 as uuidv4 } from "uuid";
import Request from "./request";

export default class DataFlow extends Header {
  constructor(_baseUrl: string, _accessToken: string) {
    super(_baseUrl, _accessToken);
  }
  /**
   * API called by HIP to acknowledge Health information request receipt. Either the hiRequest or error must be specified. hiRequest element returns the same transactionId as before with a status indicating that the request is acknowledged.
   * @param  config.healthId: string; phradddress or ABHA addrress of patient
   * @param config.transactionId: string;  trasactionID recived by request callback
   * @param  config.requestId: string; request id as recived by notify callback
   * @returns
   */
  onhipRequest = async (config: {
    healthId: string;
    transactionId: string;
    requestId: string;
    errCode?: string;
    errMessage?: string;
  }) => {
    try {
      const headers = this.headers(config.healthId);
      const url = `${this.baseUrl}gateway/v0.5/health-information/hip/on-request`;

      const body: any = {
        requestId: uuidv4(),
        timestamp: new Date().toISOString(),
        hiRequest: {
          transactionId: config.transactionId,
          sessionStatus: "ACKNOWLEDGED",
        },

        resp: {
          requestId: config.requestId,
        },
      };

      if (config.errCode) {
        body.error = {
          code: config.errCode,
          message: config.errMessage || "Error occured",
        };
      }

      const res = await new Request().request({
        headers: headers,
        method: "POST",
        requestBody: body,
        url: url,
      });

      return body;
    } catch (error) {
      console.log(error);
    }
  };
}
