// const jose = require("node-jose")
// const { JWK, JWE, parse } = jose;
const axios = require("axios")
const v4 = require("uuid").v4

const NodeRSA = require("node-rsa")

const { getToken } = require("./accessToken");




async function encrypt(data, publicKeyPem) {

    const key = new NodeRSA();
    key.importKey(publicKeyPem, "public")
    const dataToEncrypt = Buffer.from(data, "utf8")

    const encryptedData = key.encrypt(dataToEncrypt, "base64" ,"utf8", {
        encryptionScheme: 'oaep',

        hash: 'sha1',
        mgf: {
          hash: 'sha1',
        }
    
      });

   

      return encryptedData

}



const send= async () =>{
    const publicKey =`-----BEGIN PUBLIC KEY-----
    MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAstWB95C5pHLXiYW59qyO
    4Xb+59KYVm9Hywbo77qETZVAyc6VIsxU+UWhd/k/YtjZibCznB+HaXWX9TVTFs9N
    wgv7LRGq5uLczpZQDrU7dnGkl/urRA8p0Jv/f8T0MZdFWQgks91uFffeBmJOb58u
    68ZRxSYGMPe4hb9XXKDVsgoSJaRNYviH7RgAI2QhTCwLEiMqIaUX3p1SAc178ZlN
    8qHXSSGXvhDR1GKM+y2DIyJqlzfik7lD14mDY/I4lcbftib8cv7llkybtjX1Aayf
    Zp4XpmIXKWv8nRM488/jOAF81Bi13paKgpjQUUuwq9tb5Qd/DChytYgBTBTJFe7i
    rDFCmTIcqPr8+IMB7tXA3YXPp3z605Z6cGoYxezUm2Nz2o6oUmarDUntDhq/PnkN
    ergmSeSvS8gD9DHBuJkJWZweG3xOPXiKQAUBr92mdFhJGm6fitO5jsBxgpmulxpG
    0oKDy9lAOLWSqK92JMcbMNHn4wRikdI9HSiXrrI7fLhJYTbyU3I4v5ESdEsayHXu
    iwO/1C8y56egzKSw44GAtEpbAkTNEEfK5H5R0QnVBIXOvfeF4tzGvmkfOO6nNXU3
    o/WAdOyV3xSQ9dqLY5MEL4sJCGY1iJBIAQ452s8v0ynJG5Yq+8hNhsCVnklCzAls
    IzQpnSVDUVEzv17grVAw078CAwEAAQ==
    -----END PUBLIC KEY-----`


    /***
     *  This function need to bed impliments 
     * RSA/ECB/OAEPWithSHA-1AndMGF1Padding in javascript
     */


    let encrypted = encrypt("", publicKey)
    console.log(encrypted)

    return

//    encrypted =`CsTrUH18wLv5sGtCWgNAaUZL+mXbPCLA/TUWxRV8nm5qz+hnpLTttlvLHrlCDzvYwQLMW4htmptXTkbbGCfCnZchB+i8xavYtrA8wKv2vfSv4myTdfX5phCvX5/47eiMJoK/KtgaIL/JvfrijjUYq8abiUjNhzhgdOHbrmX4U5qyjFPd6yCSj1qfce0QGSFul/woYMR28jHtD97cjK5CpYxJEdLhMHjqUANi2BWGSsQUoeik60a6LPHX9NOLkCsZJ02ehHa+tMzG0FE8n09rsAo3nOwWeQxBMMEmdY1iwyh2vV1UNrIckA9R/jhMFkpRl1Gbd1QO5Zr60Il6gqFejITc+IOw7EiZwMYC9TGBUse5HmRBbsm6mnjUnjVxk0Y5qwzlxLJkMvVtg+RjtJAMzrn+vMe586dDfe14s6apVFsUkJ5bOSjpZhaumgFrh/9KEUPxO7kz8Nt7x5drlPZW9FOPEOYejh69s6yWNBWlhjvR3fxgoPZMeLl8ddFIIwWdiq98G0jxRb3cTFI4XZ80enJcesJehcJyViVcyGvPS4jdGBZrb96exYt1DRt+qMIoyLnjIHEAjc5ha3dy/9DCjY3WFGW33uOnV28Un9zUSVxXd/4j/hOoDEpm1yTbqqrLXOXo92/fcV2kZ+Hmg3Se3qR/kGBZxnsfz0pEwUVZsNo=`

      const accessToken = await getToken()
  

      const axios = require('axios');
      let data = JSON.stringify({
        "scope": [
          "abha-login",
          "mobile-verify"
        ],
        "loginHint": "mobile",
        "loginId": encrypted,
        "otpSystem": "abdm"
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://abhasbx.abdm.gov.in/abha/api/v3/profile/login/request/otp',
        headers: { 
          'Authorization': `Bearer ${accessToken}`, 
          'TIMESTAMP': new Date().toISOString(), 
          'REQUEST-ID': v4(), 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      
  


}



send()

