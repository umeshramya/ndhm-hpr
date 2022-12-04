import Header from "./header";
import { v4 as uuidv4 } from "uuid";
import Request from "./request";

type requesterType = "HIU"| "HIP"
export interface PATIENT_FIND {
  requestId: string
  timestamp: string
  query: {
    patient:  {
      id: string
    }
    
    requester: {
      type:  requesterType[]
      id: number
    }
  }
}



export default class Patients extends Header {
  constructor(_baseUrl: string, _accessToken: string) {
    super(_baseUrl, _accessToken);
  }
  /**
   * This API is called by HIP as acknowledgement to notification of consents, in cases of consent revocation and expiration.
   * @param  config.healthId: string; phradddress or ABHA addrress of patient
   * @param config.consentId: string; consent id recive by notify callback
   * @param  config.requestId: string; request id as recived by notify callback
   * @returns
   */
  smsNotify2 = async (config: {
    healthId : "unknown@sbx" | "unknown@abdm"
    phoneNo:string
    patientName?:string
    careContextInfo:string
    deeplinkUrl?:string
    facilityName?:string
    hipid:string;
    errCode?: string;
    errMessage?: string;
  }) => {
    try {
      const headers = this.headers(config.healthId);
    const url = `${this.baseUrl}gateway/v0.5/patients/sms/notify2`;
   
    const body: any = {
      requestId: uuidv4(),
      timestamp: new Date().toISOString(),
      "notification": {
        "phoneNo":config.phoneNo,
        "receiverName": config.patientName,
        "careContextInfo": config.careContextInfo,
        "deeplinkUrl": config.deeplinkUrl,
        "hip": {
          "name": config.facilityName,
          "id": config.hipid
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

  /**
   * This API is meant for identify to patient given her consent-manager-user-id
   * @param config 
   * @param healthId 
   * @returns 
   */
  find = async (
    config: PATIENT_FIND,
    healthId: string
  ) => {
    try {
      const headers = this.headers(healthId);
      const url = `${this.baseUrl}gateway/v0.5/patients/find`;
      const body: PATIENT_FIND = {
        ...config,
        requestId: uuidv4(),
        timestamp: new Date().toISOString(),
      };

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
