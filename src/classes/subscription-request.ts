import Header from "./header";
import { v4 as uuidv4 } from "uuid";
import Request from "./request";



type categories ="LINK" | "DATA"
export interface HIU_SUBSCRIPTION_REQUEST {
  requestId: string
  timestamp: string
  subscription: {
    purpose:  {
      text: string
      code: string
      refUri: string
    }
    patient: {
      id: string
    }
    hiu: {
      id: string
    }
    hips?: {
      id: string
    }[]
    categories: categories[]
    period: {
      from: string
      to: string
    }
    
  }
}

export interface HIU_SUBSCRIPTION_REQUEST_ON_NOTIFY {
  requestId: string
  timestamp: string
  acknowledgement: {
    status: "OK"[]
    subscriptionRequestId: string
  }
  error?: {
    code: number
    message: string
  }
  resp: {
    requestId: string
  }
  
}

export default class SubscriptionRequest extends Header {
  constructor(_baseUrl: string, _accessToken: string) {
    super(_baseUrl, _accessToken);
  }

/**
 * creates a request for subscription. The subscription categories can be for care-contexts linkages or availability of data against existing care-contexts. Note that the requester must have HIU role
 * @param config 
 * @returns 
 */
  sunscriptionRequest = async (config: HIU_SUBSCRIPTION_REQUEST, healthId:string) => {
    try {
      const headers = this.headers(healthId);
      const url = `${this.baseUrl}gateway/v0.5/subscription-requests/cm/init`;
      const body: HIU_SUBSCRIPTION_REQUEST={
        ...config,
        "requestId" : uuidv4(),
        "timestamp" :   new Date().toISOString(),
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

  /**
   * This API is called by HIU as acknowledgement to subscription request relevant notifications.
   * @param config 
   * @param healthId 
   * @returns 
   */
  sunscriptionRequestOnNotify = async (config: HIU_SUBSCRIPTION_REQUEST_ON_NOTIFY, healthId:string) => {
    try {
      const headers = this.headers(healthId);
      const url = `${this.baseUrl}gateway/v0.5/subscription-requests/hiu/on-notify`;
      const body: HIU_SUBSCRIPTION_REQUEST_ON_NOTIFY={
        ...config,
        "requestId" : uuidv4(),
        "timestamp" :   new Date().toISOString(),
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










