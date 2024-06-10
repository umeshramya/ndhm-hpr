const ndm = require("../../lib");
const dotenv = require('dotenv')



dotenv.config()

const { getToken } = require("../accessToken");


const participate = async ()=>{
  const accessToken = await getToken()
  const ret= new ndm.Participant({
    _accessToken :   accessToken,
    "endpointUrl" : process.env.NHCX_ENDPOINT_URL,
    "privateKey" : process.env.NHCX_PRIVATE_KEY,
    "publicKey" : process.env.NHCX_PUBLIC_KEY,
    "publicKey" : process.env.NHCX_PUBLIC_KEY,
    "url" : process.env.NHCX_PARTICIPANT_HCX_SERVICE_URL
  })
  return ret;
}

const createProvider = async () => {
 console.log(process.env.NHCX_PARTICIPANT_HCX_SERVICE_URL)
  const curPart = await participate()
  const res = await curPart.create({
    participant_name: `Jeevan Jyoti Hospital`,
    primaryEmail: `umeshbilagi@gmail.com`,
    phone: ["9343403620"],
    registryid: `IN2910000001`,
   "state" : "Karanataka",
   "roles" : ["10001"],
   "encryption_cert" : process.env.NHCX_PUBLIC_KEY,
   "district" : "DHarawad",
       "address" : {
      "description" : "Physical address of the facility including its geolocation",
      "default_address" : {
        "city" : "Hubli",
        "country" : "India",
        "description" : "Default address details",
        "postal_code" : "580020",
        "state" : "Karnataka",
        "street" : "HNo 11, Near pilley school",
        
      }
    },
    "scheme_code" : "PMJAY",
    "payment_details" : {
      "description" : "Default payment details (UPI or A/C Number + IFSC Code)",
      "default_payment" : {
        "description" : "Default payment details",
        "account_number" : "1234567788",
        "ifsc_code" : "DFG123",
        "UPI" : "246567289@ybl"
      }
    },
   
  });

  console.log(res);
};

const createProviderV2 = async () => {
 try {
  const curPart = await participate()
  const res = await curPart.createV2({
   "email" : "umehsbilagi@gmail.com",
   "registryid" : "IN2910000001",
   "role" : "10001",
   "mobilenumber" : "9343403620",
   // "registrytype" : "HFR",
   "endpointurl" : process.env.NHCX_ENDPOINT_URL
  })
 } catch (error) {
  console.log(error)
 }

 
  
 };
 

const createPayor = async () => {
  const curPart = await participate()
  const res = await curPart.create( {
    "encryption_cert" : process.env.NHCX_PUBLIC_KEY,
    "address" : {
      "description" : "Physical address of the facility including its geolocation",
      "default_address" : {
        "city" : "Hubli",
        "country" : "India",
        "description" : "Default address details",
        "postal_code" : "580020",
        "state" : "Karnataka",
        "street" : "HNo 11, Near pilley school",
        
      }
    },
    "scheme_code" : "PMJAY",
    "payment_details" : {
      "description" : "Default payment details (UPI or A/C Number + IFSC Code)",
      "default_payment" : {
        "description" : "Default payment details",
        "account_number" : "1234567788",
        "ifsc_code" : "DFG123",
        "UPI" : "246567289@ybl"
      }
    },
    "participant_name" : "My TQP",
    "registryid" : "IN0000T457",
    "phone" : ["083622062624"],
    "primaryEmail" : "adbilagi@gmail.com",
    "roles" : ["10003"],
    "state" : "Karanataka",
    "district" : "Dharaead"
  });

  console.log(res);
};

const update =  async () => {
  const curPart = await participate()
  const res = await curPart.update( {
      participant_name: `Jeevan Jyoti Cardiology Hospital and Research center`,
      status : ["Created"],
      primaryEmail: `umeshbilagi@gmail.com`,
      phone: ["9343403620"],
      participant_code : "1000000423@sbx",
    "payment_details" : {
      "description" : "Default payment details (UPI or A/C Number + IFSC Code)",
      "default_payment" : {
        "description" : "Default payment details",
        "account_number" : "1234567788",
        "ifsc_code" : "DFG123",
        "UPI" : "246567289@ybl"
      }
    },
    "address" : {
      "description" : "Physical address of the facility including its geolocation",
      "default_address" : {
        "city" : "Hubli",
        "country" : "India",
        "description" : "Default address details",
        "postal_code" : "580020",
        "state" : "Karnataka",
        "street" : "HNo 11, Near pilley school",
        
      }
    },
    "state" : "Karantaka",
    "district" : "Dharawad"

    });
  
    console.log(res);
  };


const getList = async ()=>{
  const curPart = await participate()
  const res = await curPart.fetchPartipants("PAYER")
    // console.log(res.data.participantdetails.filter(el=> el.participantcode == "1000000423@sbx"))
    
    // get payer
    console.log(res.data)
    //  console.log(res.data.participantdetails.filter(el=> el.participantcode == "1000000590@sbx"))
}

 const getCert  = async(id)=>{

  const curPart = await participate()
  const res = await curPart.fetchCert(id)

  const data = res.encryption_cert;
  
  // console.log(data)
  return data
  const buffer = Buffer.from(data, 'binary');

// Encode the buffer to base64
const base64Encoded = buffer.toString('base64');
return base64Encoded
// console.log(base64Encoded);
  
}

const search  = async(id)=>{

  const curPart = await participate()
  res = await curPart.search(id);

  console.log(res)


  
}

const getPlicies =async()=>{
  const curPart = await participate()
  const res = await curPart.getPolicies({"identifiertype" : "MobileNo", "identifiervalue" : "9343403620"})
  console.log(res.data)
}
const updateCert = async ()=>{
  const fs = require("fs")
  const publicCert = fs.readFileSync("./keys/public_cert.pem", 'utf8');

  const curPart = await participate()
  const res = await curPart.participantCertUpdtae({
    "encryptioncert" : publicCert,
    "endpointurl" : process.env.NHCX_ENDPOINT_URL,
    "participantcode" : "1000000423@sbx"
  })

console.log(res)
}

let  id="1000000423@sbx"
// id = "1000000578@sbx"
// id= "1000000423@sbx"
createProviderV2()
// createPayor();
// update()
// getList()

// getCert(id)
// search(id)
// getPlicies()
// updateCert()


// let encodedData = "MCowBQYDK2VwAyEAfeyB5GnUMnUeqPfW180FGS+s7N8dWmH6X4ZG2x9Vd/Y=";
// let decodedData = atob(encodedData);

// console.log(decodedData);

module.exports={getCert}


