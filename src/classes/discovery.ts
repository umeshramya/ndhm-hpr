import Header from "./header";
import { v4 as uuidv4 } from "uuid";
import Request from "./request";

export default class Discovery extends Header {
  constructor(_baseUrl: string, _accessToken: string) {
    super(_baseUrl, _accessToken);
  }
  /**
   * Result of patient care-context discovery request at HIP end. If a matching patient found with zero or more care contexts associated, it is specified as result attribute. If the prior discovery request, resulted in errors then it is specified in the error attribute. Reasons of errors can be
   * @param config  body
   * @returns
   */
  onDiscovery = async (config: {
    transactionId: string;
    patientReferenceNumber: string;
    patientDisplay: string;
    careContexts: { referenceNumber: string; display: string }[];
    matchedBy: string[];
    errCode?: string;
    errMessage?: string;
    requestId: string;
    healthId: string;
  }) => {
    const headers = this.headers(config.healthId);
    const url = `${this.baseUrl}gateway/v0.5/care-contexts/on-discover`;
    const phrurl =
      "https://phrdev.ndhm.gov.in/gateway/v0.5/care-contexts/on-discover";
    const devurl = `https://webhook.site/2bbc9a81-e5ec-4555-bb83-c211974df004/gateway/v0.5/care-contexts/on-discover`;
    const body: any = {
      requestId: uuidv4(),
      timestamp: new Date().toISOString(),
      transactionId: config.transactionId,
      patient: {
        referenceNumber: config.patientReferenceNumber,
        display: config.patientDisplay,
        careContexts: config.careContexts,
        matchedBy: config.matchedBy,
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

    await new Request().request({
      headers: headers,
      method: "POST",
      requestBody: body,
      url: url,
    });

    await new Request().request({
      headers: headers,
      method: "POST",
      requestBody: body,
      url: devurl,
    });
    await new Request().request({
      headers: headers,
      method: "POST",
      requestBody: body,
      url: phrurl,
    });
    await new Request().request({
      headers: headers,
      method: "POST",
      requestBody: body,
      url: devurl,
    });

    return body;
  };
}
