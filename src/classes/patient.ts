import moment from "moment";
import request from "request";
import { v4 as uuidv4 } from 'uuid';

export default class Patient {
    private baseUrl: string;
    constructor(_baseUrl: string) {
        this.baseUrl = _baseUrl
    }

    hipVerifyPatinetByHealthId = async (accessToken: string, healthId: string, hipId: string, hipType: string): Promise<any> => {
        const url = `${this.baseUrl}gateway/v0.5/users/auth/fetch-modes`;


        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }


        const requestBody = {
            "requestId": uuidv4(),
            "timestamp": moment.utc().format(`YYYY-MM-DDTHH:mm:ss.SSSSSS`),
            "query": {
                "id": healthId,
                "purpose": "LINK",
                "requester": {
                    "type": hipType,
                    "id": hipId
                }

            }
        }
        console.log(requestBody)
        const body = JSON.stringify(requestBody)
        console.log(body)



        return new Promise((resolve, reject) => {
            request(url, {
                headers: headers,
                body: JSON.parse(JSON.stringify(requestBody)),
                method: "POST"
            },
                (err, res) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(res.statusCode)
                        resolve(res)
                    }
                }
            )
        })
    }

}