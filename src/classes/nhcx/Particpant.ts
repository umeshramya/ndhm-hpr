import { v4 as uuidv4 } from "uuid";
import axios, { AxiosRequestConfig } from "axios";

const roles = [
  "10001",
  "10002",
  "10003",
  "10004",
  "10005",
  "10006",
  "10007",
  "10008",
] as const;
type Role = (typeof roles)[number];

interface CREATE_OPTIONS {
  linked_registry_codes: string[];
  registryid: string;
  participant_name: string;
  scheme_code: string;
  state: string;
  district: string;
  roles: string[];
  primaryEmail: string;
  phone: string[];
  primaryMobile: string;
  signing_cert_path: string;
  encryption_cert: string;//base64 string
  endpoint_url: string;
}

interface UPDATE_OPTION extends CREATE_OPTIONS {
  participant_code: string;
}

interface RequestHeaders {
  Accept: string;
  "Content-Type": string;
  uid: string;
  bearer_auth: string;
}
export default class Participant {
  private url = "";
  private endpointUrl = "";
  private accessToken: string = "";
  private heeder: RequestHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    uid: uuidv4(),
    bearer_auth: `Bearer ${this.accessToken}`,
  };

  constructor(options: {
    _accessToken: string;
    url: string;
    endpointUrl: string;
  }) {
    this.accessToken = options._accessToken;
    this.heeder = {
      Accept: "application/json",
      "Content-Type": "application/json",
      uid: uuidv4(),
      bearer_auth: `Bearer ${this.accessToken}`,
    };
    this.url = options.url;
    this.endpointUrl = options.endpointUrl;
  }

  /**
   * @depricated
   * @param options
   * @returns
   */
  async create(options: CREATE_OPTIONS) {
   if(!options.endpoint_url){
    options.endpoint_url = this.endpointUrl
   }

   const resp: any = await axios.post(
    `${this.url}/participant/create`,
    options,
    {
      headers: this.heeder as any,
    }
  );

  return resp.data;
  }



  async update(options: UPDATE_OPTION) {
    if (!options.endpoint_url) {
      options.endpoint_url = this.endpointUrl;
    }

    const resp: any = await axios.post(
      `${this.url}/participant/update`,
      options,
      {
        headers: this.heeder as any,
      }
    );

    return resp.data;
  }

  async fetchPartipants(partipitantType: "PROVIDER" | "PAYER") {
    const body = {
      role: partipitantType,
      fromdate: `01/01/1970`,
      todate: `01/01/${new Date().getFullYear() + 1}`,
    };
    const resp = await axios.post(`${this.url}/fetch/participants/list`, body, {
      headers: this.heeder as any,
    });
    return resp;
  }

  async fetchCert(participantId: string): Promise<any> {
    const body = {
      participantid: participantId,
    };
    const resp = await axios.post(`${this.url}/fetch/certs`, body, {
      headers: this.heeder as any,
    });
    return resp.data;
  }

  async search(participantId: string): Promise<UPDATE_OPTION> {
    const body = {
      participant_code: participantId,
    };
    const resp: any = await axios.post(`${this.url}/participant/search`, body, {
      headers: this.heeder as any,
    });
    return resp.data;
  }

  /**
   * This method links abha to polices
   * @param options
   * @returns
   */
  async linkPolicyesToAbha(options: {
    requestid: string;
    abhanumber: string;
    mobilenumber: string;
    memberid: string;
    payerid: "string";
    policies: {
      productid: string;
      productname: string;
    }[];
    processingid: string;
  }): Promise<{
    result: string;
    errormessage?: {
      errorcode: string;
      errordescription: string;
    };
  }> {
    const resp: any = await axios.post(
      `${this.url}/participant/link/abha/policy`,
      options,
      {
        headers: this.heeder as any,
      }
    );
    return resp.data;
  }

  /**
   * This method gets all policies connected to mobile/abha
   * @param options
   * @returns
   */
  async getPolicies(options: {
    identifiertype: "MobileNo" | "AbhaNumber" | "MemberId";
    identifiervalue: string;
  }): Promise<{
    participantdetails: {
      participantcode: string;
      participantname: string;
    }[];
  }> {
    const resp: any = await axios.post(
      `${this.url}/participant/get/policies`,
      options,
      {
        headers: this.heeder as any,
      }
    );
    return resp;
  }

  /**
   * Updates partcipants cert and endpoint url
   * @param options
   * @returns
   */
  async participantCertUpdtae(options: {
    participantcode: string;
    encryptioncert: string;
    endpointurl: string;
  }) {
    const resp: any = await axios.post(
      `${this.url}/v2/participant/update`,
      options,
      {
        headers: this.heeder as any,
      }
    );
    return resp.data;
  }
}
