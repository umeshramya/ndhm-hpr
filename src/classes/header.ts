export default class Header {
    protected baseUrl: string;
    protected accessToken: string;
    protected xCmId: "sbx" | "ndhm";
    protected headers: {}
    constructor(_baseUrl: string, _accessToken: string, _xCmId: "sbx" | "ndhm") {
        this.baseUrl = _baseUrl;
        this.accessToken = _accessToken;
        this.xCmId = _xCmId;
        this.headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.accessToken}`,
            "X-CM-ID": this.xCmId
        }
    }
}