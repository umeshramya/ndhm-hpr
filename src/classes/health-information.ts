import Header from "./header";
import { v4 as uuidv4 } from "uuid";
import Request from "./request";

export interface STATUS_RESPONSES_HEALTH_INFORMATION_NOTIFY {
  careContextReference: string;
  hiStatus: "DELIVERED" | "OK" | "ERRORED";
  description: string;
}

export default class HealthInformation extends Header {
  constructor(_baseUrl: string, _accessToken: string) {
    super(_baseUrl, _accessToken);
  }

  /**
   * Request for Health information against a consent id. CM would generate a transactionId against each consent and pass it as trnasaction context / correlation id to the HIP and also return the same to HIU via /on-request.
   * @param config
   * @returns
   */
  notify = async (config: {
    healthId: string;
    consentId: string;
    transactionId: string;
    notifer: "HIU" | "HIP";
    notifierId: string;
    hipId: string;
    sessionStatus: "TRANSFERRED" | "FAILED";
    errCode?: string;
    errMessage?: string;
    statusResponses: STATUS_RESPONSES_HEALTH_INFORMATION_NOTIFY[];
  }) => {
    try {
      const headers = this.headers(config.healthId);
      const url = `${this.baseUrl}gateway/v0.5/health-information/notify`;

      const body: any = {
        requestId: uuidv4(),
        timestamp: new Date().toISOString(),
        notification: {
          consentId: config.consentId,
          transactionId: config.transactionId,
          doneAt: new Date().toISOString(),
          notifier: {
            type: config.notifer,
            id: config.notifierId,
          },
          statusNotification: {
            sessionStatus: config.sessionStatus,
            hipId: config.hipId,
            statusResponses: config.statusResponses,
          },
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

  cmRequest = async (config: {
    healthId: string;
    consentId: string;
    dateRange: {
      from: string;
      to: string;
    };
    publicKey: string;
    expireDate: string;
    nounce: string;
    dataPushUrl: string;
    errCode?: any;
    errMessage?: any;
  }) => {
    try {
      const headers = this.headers(config.healthId);
      const url = `${this.baseUrl}gateway/v0.5/health-information/cm/request`;

      const body :HIU_CM_REQUEST= {
        requestId: uuidv4(),
        timestamp: new Date().toISOString(),
        hiRequest: {
          consent: {
            id: config.consentId,
          },
          dateRange: config.dateRange,
          dataPushUrl: config.dataPushUrl,
          keyMaterial: {
            cryptoAlg: "ECDH",
            curve: "Curve25519",
            dhPublicKey: {
              expiry: config.expireDate,
              parameters: "Curve25519/32byte random key",
              keyValue: config.publicKey,
            },
            nonce: config.nounce,
          },
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


/**
 * This interface is Cm_request decrypt keys
 */
export interface HIU_CM_REQUEST {
  hiRequest: {
    consent: {
      id: string
    }
    dateRange: {
      to: string
      from: string
    }
    dataPushUrl: string
    keyMaterial: {
      curve: string
      nonce: string
      cryptoAlg: string
      dhPublicKey: {
        expiry: string
        keyValue: string
        parameters: string
      }
    }
  }
  requestId: string
  timestamp: string;
  error?: {
    code: any,
    message: any
  }
}

