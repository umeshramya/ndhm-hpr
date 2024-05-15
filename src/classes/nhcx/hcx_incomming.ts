import Constants from "./utils/Constants";
import  JWEHelper from "./utils/JWEHelper";

import jose from "node-jose";
const { JWK, JWE, parse } = jose;

export default class NhcxIncommingRequest {
  private encryptionPrivateKey: string;
  private Constants: Constants;
  private output: any;
  private headers: any;
  private payload: any;

  constructor(options: {
    encryptionPrivateKey: string;
  }) {
    this.encryptionPrivateKey = options.encryptionPrivateKey;

    this.headers = null;
    this.payload = null;
    this.output = {};
    this.Constants = new Constants();
  }

  validateRequest(jwePayload: any) {
    if (typeof jwePayload !== "object") {
      if ("payload" in jwePayload) {
        return true;
      } else {
        const error = new Error();
        error.message = "Incommeing reuest does not conatin payload";
        error.name = "invalid Payload";
        throw error;
      }
    } else {
      const error = new Error();
      error.message = "Incommeing reuest no body object";
      error.name = "invalid Payload";
      throw error;
    }
  }

  async process(options:{payload: any, publicCert:string, privateKey:string}) {
    // this.validateRequest(payload);

    let decryptedPayload = await JWEHelper.decrypt({
      privateKey: options.privateKey,
      payload: options.payload.payload,
    });

   let ret = JSON.parse(decryptedPayload)
   if( ret && ret.type == "Buffer" ){
    ret = JSON.parse(Buffer.from(ret).toString("utf8"))
  }

  return ret

  }


  
}
