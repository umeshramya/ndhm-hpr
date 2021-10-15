import request from "request";
import { v4 as uuidv4 } from 'uuid';

export default class Patient{
    private baseUrl:string;
    constructor(_baseUrl:string){
        this.baseUrl=_baseUrl
    }

    hipVerifyPatinetByHealthId = async (accessToken:string, healthId:string, hipId:string, hipType:string):Promise<any>=>{
        const url = `${this.baseUrl}gateway/v0.5/users/auth/fetch-modes`;
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
        const body = JSON.stringify(
            {
                "requestId": "5f7a535d-a3fd-416b-b039-c97d021fbacd",
                "timestamp": "2021-10-15T16:54:51.817Z",
                "query": {
                  "id": "umeshbilagi@ndhm",
                  "purpose": "KYC",
                  "requester": {
                    "type": "HIP",
                    "id": "100002"
                  }
                }
              }
        //     {
        //     "requestId": `${uuidv4()}`,
        //     "timestamp": `${}`,
        //     "query": {
        //         "id": healthId,
        //         "purpose": "KYC_AND_LINK",
        //         "requester": {
        //             "type": hipType,
        //             "id": hipId
        //         }
        //     }
        // }
        )

        return new Promise((resolve, reject) => {
            request(url, {
                headers: headers,
                body: body,
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