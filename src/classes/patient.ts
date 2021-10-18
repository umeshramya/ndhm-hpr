import moment from "moment";
import request from "request";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import Request from "./request";
import { Register } from "..";

export default class Patient {
    private baseUrl: string;
    private accessToken: string;
    private xCmId: "sbx" | "ndhm";
    private headers: {}
    constructor(_baseUrl: string, _accessToken: string, _xCmId: "sbx" | "ndhm") {
        this.baseUrl = _baseUrl;
        this.accessToken = _accessToken;
        this.xCmId = _xCmId;
        this.headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.accessToken}`,
            "X-CM-ID": this.xCmId
        }
    }

    hipVerifyPatinetByHealthId = async (config: { healthId: string, hipId: string, hipType: string, purpose: string }): Promise<any> => {
        const url = `${this.baseUrl}gateway/v0.5/users/auth/fetch-modes`;
        const requestBody = {
            "requestId": uuidv4(),
            "timestamp": new Date().toISOString(),
            "query": {
                "id": config.healthId,
                "purpose": config.purpose,
                "requester": {
                    "type": config.hipType,
                    "id": config.hipId
                }

            }
        }

        return await new Request().request({
            "headers": this.headers, "method": "POST", "requestBody": requestBody, "url": url
        })



    }
    hipPatientInit = async (config: { healthId: string, hipId: string, hipType: string, purpose: string, authMode: "MOBILE_OTP" | "DEMOGRAPHICS" | "AADHAAR_OTP" }): Promise<any> => {
        const url = `${this.baseUrl}gateway/v0.5/users/auth/init`

        const body = {
            "requestId": uuidv4(),
            "timestamp": new Date().toISOString(),
            "query": {
                "id": config.healthId,
                "purpose": config.purpose,
                "authMode": config.authMode,
                "requester": {
                    "type": config.hipType,
                    "id": config.hipId
                }
            }
        }

        return await new Request().request({
            "headers": this.headers, "method": "POST", "requestBody": body, "url": url
        })
    }


    hipAuthConfirm = async (config: { transactionId: string, authCode: string }) => {
        const url = `${this.baseUrl}gateway/v0.5/users/auth/confirm`
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.accessToken}`,
            "X-CM-ID": this.xCmId
        }

        const body = {
            "requestId": uuidv4(),
            "timestamp": new Date().toISOString(),
            "transactionId": config.transactionId,
            "credential": {
                "authCode": config.authCode,
                //   "demographic": {
                //     "name": "janki das",
                //     "gender": "M",
                //     "dateOfBirth": "1972-02-29",
                //     "identifier": {
                //       "type": "MOBILE",
                //       "value": "+919800083232"
                //     }
            }
        }
        return await new Request().request({
            "headers": headers, "method": "POST", "requestBody": body, "url": url
        })

    }

    hipPatientAddContext = async (config: { careContextAccessToken: string; patientId: string; patinetDisplay: string; careContextId: string; careContextDisplay: string }) => {

        const url = `${this.baseUrl}gateway/v0.5/links/link/add-contexts`
        const body = {
            "requestId": uuidv4(),
            "timestamp": new Date().toISOString(),
            "link": {
                "accessToken": config.careContextAccessToken,
                "patient": {
                    "referenceNumber": config.patientId,
                    "display": config.patinetDisplay,
                    "careContexts": [
                        {
                            "referenceNumber": config.careContextId,
                            "display": config.careContextDisplay
                        }
                    ]
                }
            }
        }

        return await new Request().request({
            "headers": this.headers, "method": "POST", "requestBody": body, "url": url
        })


    }

}