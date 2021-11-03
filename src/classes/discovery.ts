import Header from "./header";
import { v4 as uuidv4 } from 'uuid';
import Request from "./request";

export default class Discovery extends Header{
    constructor(_baseUrl: string, _accessToken: string, _xCmId: "sbx" | "ndhm") {
        super(_baseUrl, _accessToken, _xCmId)
    }

    onDiscovery = async(config:{
        transactionId : string,
        patientReferenceNumber : string;
        patientDisplay : string;
        careContexts : {"referenceNumber": string,"display": string}[],
        matchedBy : string[]
        errCode : string;
        errMessage : string;
         requestId: string
    })=>{


        const url = `${this.baseUrl}gateway/v0.5/care-contexts/on-discover`    
   const body = {
            "requestId": uuidv4(),
            "timestamp": new Date().toISOString(),
            "transactionId": config.transactionId,
            "patient": {
              "referenceNumber": config.patientReferenceNumber,
              "display": config.patientDisplay,
              "careContexts": config.careContexts,
              "matchedBy":config.matchedBy
            },
            "error": {
              "code": config.errCode,
              "message": config.errMessage
            },
            "resp": {
              "requestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
          }

          await new Request().request({
            "headers": this.headers, "method": "POST", "requestBody": body, "url": url
        })

        return body

    }

}