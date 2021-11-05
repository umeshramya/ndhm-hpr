import {X_CM_ID} from "./config"
export default class Header {
    /**
     * this is request url for gateway consent manger
     */
    public baseUrl: string ="";
    /**
     * cmid header in request
     */
    public xCmId: string ="";

    /**
     * actual header object in request
     */
    private headersObject={}
    /**
     * access token form client id and client token
     */
    protected accessToken: string;

    /**
     * 
     * @param baseUrl this is gateway url for sendng request
     * @param _accessToken dervied from cleant is and client secret
     */
    constructor(baseUrl:string, _accessToken: string) {
        this.accessToken = _accessToken;
        this.baseUrl=baseUrl

    }
    
    /**
     * header is reset from class wide variables set 
     * i.e accessToken and xCmId:
     */
    headers (healthId:string):any{
        this.setXCmId(healthId)
        this.setBaseUrl(this.xCmId)
        this.headersObject = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.accessToken}`,
            "X-CM-ID": this.xCmId
        }
        return this.headersObject
    }

    /**
     * This sets the cmid from healthid 
     * @param healthId healthid with CM id has ro passed
     */
     setXCmId(healthId:string){
        let index=  healthId.lastIndexOf("@")
        this.xCmId = healthId.substring(index+1)
    }


    /**
     * 
     * @param cmidmatch the 
     */
     setBaseUrl(cmid:string){
       let url = X_CM_ID.filter(el=>el.id == cmid)[0].url
       if(url){
           this.baseUrl = url
       }

    }
    /**
     * 
     * @returns this tbase url of class 
     */
    getBaseUrl():string{
        return this.baseUrl
    }

    getXCmId():string{
        return this.xCmId
    }
}