import { v4 as uuidv4 } from "uuid";
import axios from "axios";

interface CREATE_OPTIONS {
  linked_registry_codes?: string[];
  registryid: string;
  participant_name: string;
  scheme_code?: string;
  roles?: string[];
  primaryEmail: string;
  phone: string[];
  primaryMobile: string;
  signing_cert_path?: string;
  encryption_cert?: string;
  endpoint_url: string;
}

interface UPDATE_OPTION {
    participant_code: string;
    participant_name: string;
    scheme_code?: string;
    roles?: string[];
    primaryEmail: string;
    phone: string[];
    primaryMobile: string;
    signing_cert_path?: string;
    encryption_cert?: string;
    endpoint_url: string;
  }
  

  

interface RequestHeaders {
  Accept: string;
  "Content-Type": string;
  uid: string;
  bearer_auth: string;
}
export default class Participant {
  private url = "https://sbxhcx.abdm.gov.in/participanthcxservice";

  private privateKey =
    "MC4CAQAwBQYDK2VwBCIEIFc5jUo4Ibd7SWrSBuiQ7qPYCRS5Qb7vrA/wpou6Eon9";
  private publicKey =
    "MCowBQYDK2VwAyEAfeyB5GnUMnUeqPfW180FGS+s7N8dWmH6X4ZG2x9Vd/Y=";

  //   // MCowBQYDK2VwAyEAff39af0ydR79/f39/QUZL/39/R1aYf1f/Ub9H1V3/Q==

  // private privateKey = "MC4CAQAwBQYDK2VwBCIEIFBFaukSxefcRyWJEtR80xYDGpj3myqVsgdfPZsj2T4B"
  // private publicKey = "MCowBQYDK2VwAyEAz9lEu26r5YKrGJ3uAUQcAnS373ochmXwKKNo72cYqYY="
  private accessToken: string = "";
  private heeder: RequestHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    uid: uuidv4(),
    bearer_auth: `Bearer ${this.accessToken}`,
  };

  constructor(_accessToken: string) {
    this.accessToken = _accessToken;
    this.heeder = {
      Accept: "application/json",
      "Content-Type": "application/json",
      uid: uuidv4(),
      bearer_auth: `Bearer ${this.accessToken}`,
    };
  }

  async create(options: CREATE_OPTIONS) {
    // Example usage:
    const body: CREATE_OPTIONS = {
      linked_registry_codes: ["10001"],
      registryid: options.registryid,
      participant_name: options.participant_name,
      scheme_code: options.scheme_code || "PMJAY",
      roles: ["10001"],
      primaryEmail: options.primaryEmail,
      phone: options.phone,
      primaryMobile: options.primaryMobile,
      // signing_cert_path: "string",
      encryption_cert: this.publicKey,
      endpoint_url: options.endpoint_url,
    };

    const resp = await axios.post(`${this.url}/participant/create`, body, {
      headers: this.heeder as any,
    });

    return resp;
  }

  async update(options: UPDATE_OPTION) {
    // Example usage:
    const body: UPDATE_OPTION = {
        participant_code: options.participant_code,
        participant_name: options.participant_name,
        scheme_code: "PMJAY",
        roles: ["10001"],
        primaryEmail: options.primaryEmail,
        phone: options.phone,
        primaryMobile: "9899912323",
        // signing_cert_path: "string",
        encryption_cert: this.publicKey,
        endpoint_url: options.endpoint_url,
      };

    const resp = await axios.post(`${this.url}/participant/update`, body, {
      headers: this.heeder as any,
    });

    return resp;
  }


  async fetchPartipants(partipitantType:"PROVIDER" | "PAYER") {
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


  async fetchCert (participantId:string):Promise<any>{
    const body = {
      "participantid": participantId
    }
    const resp = await axios.post(`${this.url}/fetch/certs`, body, {
      headers: this.heeder as any,
    });
    return resp;
  }
}
