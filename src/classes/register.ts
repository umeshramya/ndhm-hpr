import request from "request"
import Request  from "./request";

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
        const body = {
            "clientId": this.clientID,
            "clientSecret": this.clinetSecrete
        }
    
        const url = `${this.baseUrl}gateway/v0.5/sessions`
        const headers = {
            "Content-Type": "application/json"
        }
        
        return new Request().request({
            "headers" : headers, "url" : url, "requestBody" : body, "method" : "POST"
        }).then(res=>res.body)
    
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
        const body = { url: endPointUrl }

        return new Request().request({
            "headers" : headers, "requestBody" : body, method : "PATCH", "url" : url
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
        const body = config
    
        const url = `${this.baseUrl}devservice/v1/bridges/services`
    
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }

        
        return new Request().request({
            "headers" : headers, "requestBody" : body, method : "PUT", "url" : url
        })
    
    
    
    }
    


}