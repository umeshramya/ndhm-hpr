const {Register} = require("ndhm-hpr")
const dotenv = require("dotenv").config()

const register = async ()=>{
    const endpointUrl="https://webhook.site/38af130b-c175-49f5-8d58-7cae7b3865cd"
    const register = new Register(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

    const accesstoken =(await register.getAccessToken().then(res=>JSON.parse(res))).accessToken
    await register.updateHealthcareUrl(accesstoken, endpointUrl)
    await register.registerFacility(accesstoken,
        {
            "active" : true,
            "alias" : ["Eg"],
            "id" : "jjh_123",
            "name" : "JJH",
            "type" : "HIP"
        })
}

register();