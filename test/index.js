const { Register, Patient } = require("ndhm-hpr")
const dotenv = require("dotenv").config()

const register = async () => {
    const baseUrl = "https://dev.abdm.gov.in/"
    const endpointUrl = "https://webhook.site/a9aa7f1b-36cb-4378-ab0f-50586e8e0e67"
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

    let patient = new Patient("https://dev.ndhm.gov.in/")
    await patient.hipVerifyPatinetByHealthId({
        "accessToken" : accesstoken,
        "healthId" : "umeshbilagi@sbx",
        "hipId" : "jjh_123",
        "hipType" : "HIP",
        "purpose" : "KYC_AND_LINK",
        "xCmId" : "sbx"
    })

    await patient.hipPatientInit({
        "accessToken" : accesstoken,
        "healthId" : "umeshbilagi@sbx",
        "hipId" : "jjh_123",
        "hipType" : "HIP",
        "purpose" : "KYC_AND_LINK",
        "xCmId" : "sbx",
        "authMode" : "MOBILE_OTP"
    })
}

register();