const { Register, Patient } = require("ndhm-hpr")
const dotenv = require("dotenv").config()

const register = async () => {
    const baseUrl = "https://dev.abdm.gov.in/"
    const endpointUrl = "https://webhook.site/e8f2282a-2813-4ad8-8229-9a45ba44597b"
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
let result=    await patient.hipVerifyPatinetByHealthId({

        "healthId": "umeshbilagi@sbx",
        "hipId": "jjh_123",
        "hipType": "HIP",
        "purpose": "KYC_AND_LINK",

    })

//  let result =    await patient.hipPatientInit({

//         "healthId": "45-1348-0023-0587",
//         "hipId": "jjh_123",
//         "hipType": "HIP",
//         "purpose": "KYC_AND_LINK",
//         "authMode": "MOBILE_OTP"

//     })

    console.log(JSON.parse(JSON.stringify(result)))
}

register();