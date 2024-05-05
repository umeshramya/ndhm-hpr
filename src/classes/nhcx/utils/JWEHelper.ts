import jose from "node-jose";
const { JWK, JWE, parse } = jose;
import axios from "axios";

export class JWEHelper {
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
    const buffer = Buffer.from(JSON.stringify(options.payload));
    const fields = { alg, ...options.headers };
    const encrypted = await JWE.createEncrypt(
      { format, contentAlg, fields },
      key
    )
      .update(buffer)
      .final();
    return encrypted;
  }

  static async decrypt(options : { cert:any, payload:any }) {

    if (!(options.cert && options.payload)) throw new Error("Invalid Input");
    let keystore = JWK.createKeyStore();
    await keystore.add(await JWK.asKey(options.cert, "pem"));
    let parsedPayload = parse.compact(options.payload);
    let decrypted = await parsedPayload.perform(keystore);
    const payloadString = decrypted.payload.toString();
    const payloadMap = JSON.parse(payloadString);
    decrypted.payload = payloadMap;
    // @ts-ignore
    const { key, plaintext, protected: _, ...rest } = decrypted;

    return rest;
  }
}