const {Register, UserAuth, AbhaNumber} = require("ndhm-hrp")

export default async function handler(req, res) {
  try {
    const baseUrl = process.env.NDHM_URL
    const endpointUrl = process.env.NDHM_API
    const register = new Register(process.env.CLIENT_ID, process.env.CLIENT_SECRET, baseUrl);
    const accesstoken = (await register.getAccessToken().then(res => JSON.parse(res))).accessToken

    const abha = new AbhaNumber(accesstoken,process.env.ABHA_BASE_URL);
    const curRes =await abha.generatAadhaareOTP("514790474721");
    
  
    res.status(200).json({ body: curRes});
  } catch (error) {
     console.log(error)
    res.status(500).sned(error)
  }

}
