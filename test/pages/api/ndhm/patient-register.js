// NEXT
import {Register, Patient} from "ndhm-hpr"
export default async function handler (req, res) {
    const baseUrl = process.env.NDHM_URL
    const endpointUrl = process.env.NDHM_API
    const register = new Register(process.env.CLIENT_ID, process.env.CLIENT_SECRET, baseUrl);
    const accesstoken = (await register.getAccessToken().then(res => JSON.parse(res))).accessToken
    console.log(accesstoken)
    await register.updateHealthcareUrl(accesstoken, endpointUrl)
    await register.registerFacility(accesstoken,
        {
            "active": true,
            "alias": ["Eg"],
            "id": "jjh_123",
            "name": "JJH",
            "type": "HIP"
        })

        let patient = new Patient(process.env.NDHM_URL, accesstoken, "sbx")
        let result=    await patient.hipVerifyPatinetByHealthId({
                "healthId": "umeshbilagi@sbx",
                "hipId": "jjh_123",
                "hipType": "HIP",
                "purpose": "KYC_AND_LINK",
        
            })
            res.status(200).json({ result})

}
  