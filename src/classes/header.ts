export default class Header {
    protected baseUrl: string;
    protected accessToken: string;
    protected xCmId: string;
    protected headers={}
    constructor(_baseUrl: string, _accessToken: string, _xCmId: string) {
        this.baseUrl = _baseUrl;
        this.accessToken = _accessToken;
        this.xCmId = _xCmId;
        this.setHeader()
    }
    /**
     * header is reset from class wide variables set 
     * i.e accessToken and xCmId:
     */
    setHeader (){
        this.headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.accessToken}`,
            "X-CM-ID": this.xCmId
        }
    }
}