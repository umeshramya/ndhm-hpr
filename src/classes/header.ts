import {X_CM_ID} from "./config"
export default class Header {
    /**
     * this is request url for gateway consent manger
     */
    public baseUrl: string ="";
    public xCmId: string ="";
    protected headers={}
    protected accessToken: string;
    constructor( _accessToken: string) {
        this.accessToken = _accessToken;
    }
    
    /**
     * header is reset from class wide variables set 
     * i.e accessToken and xCmId:
     */
    setHeader (healthId:string){
        this.setXCmId(healthId)
        this.setBaseUrl(this.xCmId)
        this.headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.accessToken}`,
            "X-CM-ID": this.xCmId
        }
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
       this.baseUrl = X_CM_ID.filter(el=>el.id == cmid)[0].url

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