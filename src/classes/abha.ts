import { v4 as uuidv4 } from "uuid";
import Request from "./request";
import Header from "./header";

export default class AbhaNumber {
  private abhaBaseUrl:
    | `https://healthidsbx.abdm.gov.in/api`
    | `https://healthid.abdm.gov.in/api`;
  private headers: any;

  constructor(_accessToken: string, env: "Dev" | "Prod") {
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${_accessToken}`,
    };
    if (env == "Dev") {
      this.abhaBaseUrl = "https://healthidsbx.abdm.gov.in/api";
    } else {
      this.abhaBaseUrl = "https://healthid.abdm.gov.in/api";
    }
  }

  generatAadhaareOTP = async (
    aadhaar: number
  ): Promise<{
    mobileNumber: string;
    txnId: string;
  }> => {
    const url = `${this.abhaBaseUrl}/v1/registration/aadhaar/generateOtp`;
    const body = {
      aadhaar: aadhaar,
    };

    const res = await new Request().request({
      headers: this.headers,
      method: "POST",
      requestBody: body,
      url: url,
    });

    return res;
  };

  aadharVerifyOtp = async (
    otp: string,
    txnId: string
  ): Promise<{
    mobileNumber: string;
    txnId: string;
  }> => {
    const url = `${this.abhaBaseUrl}/v1/registration/aadhaar/verifyOTP`;

    const body = {
      otp: otp,
      txnId: txnId,
    };

    const res = await new Request().request({
      headers: this.headers,
      method: "POST",
      requestBody: body,
      url: url,
    });

    return res;
  };

  generateMobileOtp = async (
    mobile: string,
    txnId: string
  ): Promise<{
    mobileNumber: string;
    txnId: string;
  }> => {
    const url = `${this.abhaBaseUrl}/v1/registration/aadhaar/generateMobileOTP`;

    const body = {
      mobile: mobile,
      txnId: txnId,
    };

    const res = await new Request().request({
      headers: this.headers,
      method: "POST",
      requestBody: body,
      url: url,
    });

    return res;
  };

  verifyMobileOtp = async (
    otp: string,
    txnId: string
  ): Promise<{
    mobileNumber: string;
    txnId: string;
  }> => {
    const url = `${this.abhaBaseUrl}/v1/registration/aadhaar/verifyMobileOTP`;

    const body = {
      otp: otp,
      txnId: txnId,
    };

    const res = await new Request().request({
      headers: this.headers,
      method: "POST",
      requestBody: body,
      url: url,
    });

    return res;
  };
}
