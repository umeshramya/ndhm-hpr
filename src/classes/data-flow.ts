import Header from "./header";
import { v4 as uuidv4 } from "uuid";
import Request from "./request";

export default class DataFlow extends Header {
  constructor(_baseUrl: string, _accessToken: string) {
    super(_baseUrl, _accessToken);
  }
  /**
   * API called by HIP to acknowledge Health information request receipt. Either the hiRequest or error must be specified. hiRequest element returns the same transactionId as before with a status indicating that the request is acknowledged.
   * @param  config.healthId: string; phradddress or ABHA addrress of patient
   * @param config.transactionId: string;  trasactionID recived by request callback
   * @param  config.requestId: string; request id as recived by notify callback
   * @returns
   */
  onhipRequest = async (config: {
    healthId: string;
    transactionId: string;
    requestId: string;
    errCode?: string;
    errMessage?: string;
  }) => {
    try {
      const headers = this.headers(config.healthId);
      const url = `${this.baseUrl}gateway/v0.5/health-information/hip/on-request`;

      const body: any = {
        requestId: uuidv4(),
        timestamp: new Date().toISOString(),
        hiRequest: {
          transactionId: config.transactionId,
          sessionStatus: "ACKNOWLEDGED",
        },

        resp: {
          requestId: config.requestId,
        },
      };

      if (config.errCode) {
        body.error = {
          code: config.errCode,
          message: config.errMessage || "Error occured",
        };
      }

      const res = await new Request().request({
        headers: headers,
        method: "POST",
        requestBody: body,
        url: url,
      });

      return body;
    } catch (error) {
      console.log(error);
    }
  };

  dataPushURL = async (config: {
    healthId: string;
    datapushUrl: string;
    linkEntries?: {
      link: string;
      media: "application/fhir+json";
      checksum: "string";
      careContextReference: string;
    }[];
    dataEntries?: {
      content: string;
      media: "application/fhir+json";
      checksum: "string";
      careContextReference: string;
    }[];
    pageCount: number;
    pageIndex: number;
    transactionId: string;
    expireDate: string;
    publicKey: string;
    nonce: string;
    errCode: string;
    errMessage: string;
  }) => {
    try {
      const headers = this.headers(config.healthId);
      const url = config.datapushUrl;

      const entrise: any[] = [];
      if (config.dataEntries) {
        config.dataEntries.forEach((element) => {
          entrise.push(element);
        });
      }
      if (config.linkEntries) {
        config.linkEntries.forEach((el) => {
          entrise.push(el);
        });
      }

      const body: any = {
        pageNumber: config.pageIndex,
        pageCount: config.pageCount,
        transactionId: config.transactionId,
        entries: entrise,
        keyMaterial: {
          cryptoAlg: "ECDH",
          curve: "Curve25519",
          dhPublicKey: {
            expiry: config.expireDate,
            parameters: "Curve25519/32byte random key",
            keyValue: config.publicKey,
          },
          nonce: config.nonce,
        },
      };

      if (config.errCode) {
        body.error = {
          code: config.errCode,
          message: config.errMessage || "Error occured",
        };
      }

      const res = await new Request().request({
        headers: headers,
        method: "POST",
        requestBody: body,
        url: url,
      });

      return body;
    } catch (error) {
      console.log(error);
    }
  };
}
