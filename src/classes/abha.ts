import { v4 as uuidv4 } from "uuid";
import Request from "./request";
import Header from "./header";

export default class AbhaNumber {
  private abhaBaseUrl: string;
  private headers: any;

  constructor(_accessToken: string, abhaBaseUrl: string) {
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${_accessToken}`,
    };
    this.abhaBaseUrl = abhaBaseUrl;
  }

  generatAadhaareOTP = async (
    aadhaar: number
  ): Promise<{
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
    const ret = JSON.parse(JSON.stringify(res));
    return JSON.parse(ret.body);
  };

  aadharVerifyOtp = async (options: {
    otp: string;
    txnId: string;
    restrictions?: string;
  }): Promise<{
    txnId: string;
  }> => {
    const url = `${this.abhaBaseUrl}/v1/registration/aadhaar/verifyOTP`;

    const body = {
      otp: options.otp,
      restrictions: options.restrictions,
      txnId: options.txnId,
    };

    const res = await new Request().request({
      headers: this.headers,
      method: "POST",
      requestBody: body,
      url: url,
    });

    const ret = JSON.parse(JSON.stringify(res));
    return JSON.parse(ret.body);
  };

  generateMobileOtp = async (
    mobile: string,
    txnId: string
  ): Promise<{
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

    const ret = JSON.parse(JSON.stringify(res));
    return JSON.parse(ret.body);
  };

  verifyMobileOtp = async (
    otp: string,
    txnId: string
  ): Promise<{
    txnId: string;
  }> => {
    const url = `${this.abhaBaseUrl}/v1/registration/aadhaar/verifyMobileOTPP`;

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

    const ret = JSON.parse(JSON.stringify(res));
    return JSON.parse(ret.body);
  };

  createHealthIdWithPreVerified = async (options: {
    email: string;
    firstName: string;
    healthId: string;
    lastName: string;
    middleName: string;
    password: string;
    profilePhoto: string;
    txnId: string;
  }): Promise<{
    authMethods: ["AADHAAR_OTP"];
    dayOfBirth: string;
    districtCode: string;
    districtName: string;
    email: string;
    firstName: string;
    gender: string;
    healthId: string;
    healthIdNumber: string;
    kycPhoto: string;
    lastName: string;
    middleName: string;
    mobile: string;
    monthOfBirth: string;
    name: string;
    new: true;
    stateCode: string;
    stateName: string;
    tags: {
      additionalProp1: string;
      additionalProp2: string;
      additionalProp3: string;
    };
    token: string;
    yearOfBirth: string;
  }> => {
    const url = `${this.abhaBaseUrl}/v1/registration/aadhaar/createHealthIdWithPreVerified`;

    const body = options;

    const res = await new Request().request({
      headers: this.headers,
      method: "POST",
      requestBody: body,
      url: url,
    });

    const ret = JSON.parse(JSON.stringify(res));
    return JSON.parse(ret.body);
  };
}
