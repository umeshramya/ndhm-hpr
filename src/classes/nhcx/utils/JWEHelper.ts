import jose from "node-jose";
const { JWK, JWE, parse } = jose;
import axios from "axios";

export default class JWEHelper {
  static async encrypt(options: {
    cert: any,
    headers: any,
    payload: any,

  }) {
    const format = "compact"
    const contentAlg = "A256GCM"
    const alg ="RSA-OAEP-256"
    if (!(options.cert && options.headers && options.payload)) throw new Error("Invalid Input");
    let key = await JWK.asKey(options.cert, "pem");
    // const buffer = Buffer.from(JSON.stringify(options.payload));
    const fields = { alg, ...options.headers };
    const encrypted = await JWE.createEncrypt(
      { format, contentAlg, fields },
      key
    )
      .update(JSON.stringify(options.payload))
      .final();
    return encrypted;
  }

  static async decrypt(options: { privateKey: string, payload: string }) {
    if (!(options.privateKey && options.payload)) throw new Error("Invalid Input");
  
    const privateKey = await jose.JWK.asKey(options.privateKey, 'pem');
    const decrypted = await jose.JWE.createDecrypt(privateKey).decrypt(options.payload);

    return decrypted.payload.toString();
  }
  
}