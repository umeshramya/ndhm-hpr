import { v4 as uuidv4 } from 'uuid';
import Request from "./request";
import Header from "./header";

export default class Link extends Header{
    constructor(_baseUrl: string, _accessToken: string) {
        super(_baseUrl, _accessToken)
    }

    AddContext = async (config: {healthId:string, careContextAccessToken: string; patientId: string; patinetDisplay: string; careContextId: string; careContextDisplay: string }) => {

        const headers = this.headers(config.healthId)
        const url = `${this.baseUrl}gateway/v0.5/links/link/add-contexts`
        const body = {
            "requestId": uuidv4(),
            "timestamp": new Date().toISOString(),
            "link": {
                "accessToken": config.careContextAccessToken,
                "patient": {
                    "referenceNumber": config.patientId,
                    "display": config.patinetDisplay,
                    "careContexts": [
                        {
                            "referenceNumber": config.careContextId,
                            "display": config.careContextDisplay
                        }
                    ]
                }
            }
        }

        await new Request().request({
            "headers": headers, "method": "POST", "requestBody": body, "url": url
        })

        return body


    }
}


