import Header from "./header";
import { v4 as uuidv4 } from "uuid";
import Request from "./request";

export interface HIU_SUBSCRIPTIONS_ON_NOTIFY {
  requestId: string;
  timestamp: string;
  acknowledgement: {
    status: string;
    eventId: string;
  };

  error?: {
    code: number;
    message: string;
  };
  resp: {
    requestId: string;
  };
}

export default class Subscriptions extends Header {
  constructor(_baseUrl: string, _accessToken: string) {
    super(_baseUrl, _accessToken);
  }

  /**
   * This API is called by HIU as acknowledgement to consent notifications, specifically for cases when consent is REVOKED or EXPIRED.
   * @param config
   * @param healthId
   * @returns
   */
  sunscriptionOnNotify = async (
    config: HIU_SUBSCRIPTIONS_ON_NOTIFY,
    healthId: string
  ) => {
    try {
      const headers = this.headers(healthId);
      const url = `${this.baseUrl}gateway/v0.5/subscriptions/hiu/on-notify`;
      const body: HIU_SUBSCRIPTIONS_ON_NOTIFY = {
        ...config,
        requestId: uuidv4(),
        timestamp: new Date().toISOString(),
      };

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
