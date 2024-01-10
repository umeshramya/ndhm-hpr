import { JWK, JWE, parse } from 'node-jose';

interface EncryptOptions {
  cert: string;
  headers: Record<string, any>;
  payload: Record<string, any>;
  format?: "compact" | "general" | "flattened" | undefined;
  contentAlg?: string;
  alg?: string;
}

interface DecryptOptions {
  cert: string;
  payload: string;
}

const encrypt = async ({
  cert,
  headers,
  payload,
  format = 'compact',
  contentAlg = "A256GCM",
  alg = "RSA-OAEP-256"
}: EncryptOptions): Promise<any> => {
  if (!(cert && headers && payload)) throw new Error('Invalid Input');
  let key = await JWK.asKey(cert, "pem");
  const buffer = Buffer.from(JSON.stringify(payload));
  const fields = { alg, ...headers };
  const encrypted = await JWE.createEncrypt({ format , contentAlg, fields }, key).update(buffer).final();
  return encrypted;
};

const decrypt = async ({ cert, payload }: DecryptOptions): Promise<any> => {
  if (!(cert && payload)) throw new Error('Invalid Input');
  let keystore = JWK.createKeyStore();
  await keystore.add(await JWK.asKey(cert, "pem"));
  let parsedPayload = parse.compact(payload);
  let decrypted = await parsedPayload.perform(keystore);
  return decrypted;
};

export { encrypt, decrypt };
