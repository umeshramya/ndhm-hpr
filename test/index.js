const { Register, Patient } = require("ndhm-hpr")
const dotenv = require("dotenv").config()

const register = async () => {
    const baseUrl = "https://dev.abdm.gov.in/"
    const endpointUrl = "https://webhook.site/1cb38974-6b4e-490a-8b20-052744f93e91"
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

    let patient = new Patient("https://dev.ndhm.gov.in/", accesstoken, "sbx")
    await patient.hipVerifyPatinetByHealthId({

        "healthId": "umeshbilagi@sbx",
        "hipId": "jjh_123",
        "hipType": "HIP",
        "purpose": "KYC_AND_LINK",

    })

    await patient.hipPatientInit({

        "healthId": "umeshbilagi@sbx",
        "hipId": "jjh_123",
        "hipType": "HIP",
        "purpose": "KYC_AND_LINK",
        "authMode": "MOBILE_OTP"

    })
}

register();