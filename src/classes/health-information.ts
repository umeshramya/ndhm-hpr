import Header from "./header";
import { v4 as uuidv4 } from "uuid";
import Request from "./request";

export interface STATUS_RESPONSES_HEALTH_INFORMATION_NOTIFY{
  "careContextReference": string,
  "hiStatus": "DELIVERED"| "OK" | "ERRORED",
  "description": string
}

export default class HealthInformation extends Header {
  constructor(_baseUrl: string, _accessToken: string) {
    super(_baseUrl, _accessToken);
  }

  /**
   *  * API called by HIU and HIP during data-transfer.
   * HIP on transfer of data would send sessionStatus - one of [TRANSFERRED, FAILED]
   * HIP would also send hiStatus for each careContextReference - on of [DELIVERED, ERRORED]
   * HIU on receipt of data would send sessionStatus - one of [TRANSFERRED, FAILED]. For example, FAILED when if data was not sent or if invalid data was sent
   * HIU would also send hiStatus for each careContextReference - one of [OK, ERRORED]  
   * @param config 
   * @returns 
   */
  notify = async (config: {
    healthId: string;
    consentId: string;
    transactionId : string
    notifer : "HIU" | "HIP";
    notifierId : string;
    hipId : string;
    sessionStatus : "TRANSFERRED" | "FAILED" ;
    errCode?: string;
    errMessage?: string;
    statusResponses:STATUS_RESPONSES_HEALTH_INFORMATION_NOTIFY[]
  }) => {
    try {
      const headers = this.headers(config.healthId);
    const url = `${this.baseUrl}gateway/v0.5/health-information/notify`;

   
    const body: any = {
      requestId: uuidv4(),
      timestamp: new Date().toISOString(),
      "notification": {
        "consentId": config.consentId,
        "transactionId": config.transactionId,
        "doneAt":new Date().toISOString(),
        "notifier": {
          "type": config.notifer,
          "id": config.notifierId
        },
        "statusNotification": {
          "sessionStatus": config.sessionStatus,
          "hipId": config.hipId,
          "statusResponses":config.statusResponses
        }
      }
    };

    if (config.errCode) {
      body.error = {
        code: config.errCode,
        message: config.errMessage || "Error occured",
      };
    }

    const res=  await new Request().request({
      headers: headers,
      method: "POST",
      requestBody: body,
      url: url,
    });





    return body;
    } catch (error) {
  console.log(error)
    }
    
  };
}
