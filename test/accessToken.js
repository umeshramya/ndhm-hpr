const ndm = require("../lib/")
const NDHM_CLIENT_ID="SBX_000676"
const NDHM_CLIENT_SECRET="8ec7c02e-46bd-4ff4-ab87-14c1ecd21343"
const NDHM_URL="https://dev.abdm.gov.in/"
const regi = new ndm.Register(NDHM_CLIENT_ID, NDHM_CLIENT_SECRET, NDHM_URL)

const getToken = async()=>{
    const tok = JSON.parse(await regi.getAccessToken()).accessToken;
    return tok
}



module.exports = {
    getToken
};