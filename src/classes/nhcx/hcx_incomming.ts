import Constants from "./utils/Constants";
import { JWEHelper } from "./utils/JWEHelper";

export default class NhcxIncommingRequest {
  private participantCode: string;
  private encryptionPrivateKey: string;
  private Constants: Constants;
  private output: any;
  private headers: any;
  private payload: any;

  constructor(options: {
    participantCode: string;
    encryptionPrivateKey: string;
  }) {
    this.encryptionPrivateKey = options.encryptionPrivateKey;
    this.participantCode = options.participantCode;
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

  async process(payload: any, operation: string) {
    this.validateRequest(payload);
    let decryptedPayload = await JWEHelper.decrypt({
      cert: this.encryptionPrivateKey,
      payload: payload,
    });
    let header = decryptedPayload.header;
    this.output[this.Constants.HEADERS] = header;
    this.output[this.Constants.PAYLOAD] = decryptedPayload.payload;
    return this.output;
  }
}
