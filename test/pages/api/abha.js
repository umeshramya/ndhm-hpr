const {Register, UserAuth, AbhaNumber} = require("ndhm-hrp")

export default async function handler(req, res) {
  const baseUrl = process.env.NDHM_URL
  const endpointUrl = process.env.NDHM_API
  const register = new Register(process.env.CLIENT_ID, process.env.CLIENT_SECRET, baseUrl);
  const accesstoken = (await register.getAccessToken().then(res => JSON.parse(res))).accessToken
  console.log(accesstoken)
  // const abha = new AbhaNumber(accesstoken,"Dev");
  // const curRes =await abha.generatAadhaareOTP("514790474721");
  // console.log(curRes)

  res.status(200).json({ body: req.body });
}
