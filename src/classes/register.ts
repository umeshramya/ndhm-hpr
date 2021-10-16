import request from "request"

export default class Register{
    private clientID:string;
    private clinetSecrete:string;
    private baseUrl:string;

    constructor(_cleintId:string,_clientSecrete:string, _baseUrl:string="https://dev.abdm.gov.in/"){
        this.clientID= _cleintId;
        this.clinetSecrete=_clientSecrete;
        this.baseUrl = _baseUrl;
    }

    /**
     * 
     * @returns return access token in promise
     */
    getAccessToken = async():Promise<any> => {
        const body = JSON.stringify({
            "clientId": this.clientID,
            "clientSecret": this.clinetSecrete
        })
    
        const url = `${this.baseUrl}gateway/v0.5/sessions`
        const headers = {
            "Content-Type": "application/json"
        }
    
        return new Promise((resolve, reject) => {
            request(url, {
                "body": body,
                "method": "post",
                "headers": headers
            }, (err:any, res:any) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res.body)
                }
            })
        })
    
    
    }

    /**
     * 
     * @param accessToken access token
     * @param endPointUrl this HIP endpoint URL
     * @returns Promise
     */
    updateHealthcareUrl =async (accessToken:string, endPointUrl:string):Promise<any> => {
        const url = `${this.baseUrl}devservice/v1/bridges`
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
        const body = JSON.stringify({ url: endPointUrl })
    
        return new Promise((resolve, reject) => {
            request(url, {
                headers: headers,
                body: body,
                method: "PATCH"
    
            },
                (err, res) => {
                    if (err) {
                        reject(err)
                    } else {
                       
                        resolve(res)
                    }
                }
            )
        })
    }
    
    /**
     * 
     * @param accessToken accessToken
     * @param config config for organization
     * @returns Promise
     */
     registerFacility = async (accessToken:string, config:{
        "id": string;
        "name": string
        "type": string
        "active": boolean
        "alias": []
    }):Promise<any> => {
        const body = JSON.stringify(config)
    
        const url = `${this.baseUrl}devservice/v1/bridges/services`
    
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    
        return new Promise((resolve, reject) => {
            request(url, {
                headers: headers,
                body: body,
                method: "PUT"
    
            },
                (err, res) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                }
            )
        })
    
    
    }
    


}