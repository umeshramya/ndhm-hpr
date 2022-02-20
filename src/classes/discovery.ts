import Header from "./header";
import { v4 as uuidv4 } from "uuid";
import Request from "./request";

export default class Discovery {
  // private baseUrl: string;
  // constructor(_baseUrl: string) {
  //   this.baseUrl = _baseUrl;
  // }

  onDiscovery = (config: {
    transactionId: string;
    patientReferenceNumber: string;
    patientDisplay: string;
    careContexts: { referenceNumber: string; display: string }[];
    matchedBy: string[];
    errCode: string;
    errMessage: string;
    requestId: string;
  }) => {
    // const url = `${this.baseUrl}gateway/v0.5/care-contexts/on-discover`;
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

    return body;
  };
}
