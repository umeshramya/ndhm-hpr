import Header from "./header";
import { v4 as uuidv4 } from "uuid";
import Request from "./request";

export default class Profile extends Header {
  constructor(_baseUrl: string, _accessToken: string) {
    super(_baseUrl, _accessToken);
  }
  /**
   * Result of patient care-context discovery request at HIP end. If a matching patient found with zero or more care contexts associated, it is specified as result attribute. If the prior discovery request, resulted in errors then it is specified in the error attribute. Reasons of errors can be
   * @param config  body
   * @returns
   */
  onProfile = async (config: {
    errCode?: string;
    errMessage?: string;
    requestId: string;
    healthId: string;
    tokenNumber : string;
  }) => {
    const headers = this.headers(config.healthId);
    // const url = `${this.baseUrl}v0.5/patients/profile/on-share`;
    const url = `${this.baseUrl}v1.0/patients/profile/on-share`;
   
    const body: any = {
      requestId: uuidv4(),
      timestamp: new Date().toISOString(),
      acknowledgement: {
        status: "SUCCESS",
        healthId: config.healthId,
        tokenNumber:config.tokenNumber
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



    await new Request().request({
      headers: headers,
      method: "POST",
      requestBody: body,
      url: url,
    });




    return body;

  };
}
