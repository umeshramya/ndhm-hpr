const ndm = require("../lib/")

const dotenv = require('dotenv')
dotenv.config()
const regi = new ndm.Register(process.env.NDHM_CLIENT_ID, process.env.NDHM_CLIENT_SECRET, process.env. NDHM_URL)

const getToken = async()=>{
    const tok = JSON.parse(await regi.getAccessToken()).accessToken;
    return tok
}



module.exports = {
    getToken
};