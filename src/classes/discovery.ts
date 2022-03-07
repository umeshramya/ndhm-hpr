import Header from "./header";
import { v4 as uuidv4 } from "uuid";
import Request from "./request";

export default class Discovery extends Header {
  constructor(_baseUrl: string, _accessToken: string) {
    super(_baseUrl, _accessToken);
  }

  onDiscovery = async (config: {
    transactionId: string;
    patientReferenceNumber: string;
    patientDisplay: string;
    careContexts: { referenceNumber: string; display: string }[];
    matchedBy: string[];
    errCode: string;
    errMessage: string;
    requestId: string;
    healthId: string;
  }) => {
    const headers = this.headers(config.healthId);
    // const url = `${this.baseUrl}gateway/v0.5/care-contexts/on-discover`;
    const url = `https://webhook.site/2bbc9a81-e5ec-4555-bb83-c211974df004/gateway/v0.5/care-contexts/on-discover`;
    const body = {
      requestId: uuidv4(),
      timestamp: new Date().toISOString(),
      transactionId: config.transactionId,
      patient: {
        referenceNumber: config.patientReferenceNumber,
        display: config.patientDisplay,
        careContexts: config.careContexts,
        matchedBy: config.matchedBy,
      },
      error: {
        code: config.errCode,
        message: config.errMessage,
      },
      resp: {
        requestId: config.requestId,
      },
    };

    await new Request().request({
      headers: headers,
      method: "POST",
      requestBody: body,
      url: url,
    });

    return body;
  };
}
