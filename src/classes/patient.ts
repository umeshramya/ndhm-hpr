import moment from "moment";
import request from "request";
import { v4 as uuidv4 } from 'uuid';
import axios  from "axios";
import Request from "./request";
import { Register } from "..";

export default class Patient {
    private baseUrl: string;
    constructor(_baseUrl: string) {
        this.baseUrl = _baseUrl
    }

    hipVerifyPatinetByHealthId = async (config:{accessToken: string, healthId: string, hipId: string, hipType: string, purpose : string, xCmId: "sbx" | "ndhm" }): Promise<any> => {
        const url = `${this.baseUrl}gateway/v0.5/users/auth/fetch-modes`;
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.accessToken}`,
            "X-CM-ID": config.xCmId
        }
        const requestBody = {
            "requestId": uuidv4(),
            "timestamp":  new Date().toISOString(),
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
            "headers" : headers, "method" : "POST", "requestBody" : requestBody, "url" : url
        })
   

    
        }
     hipPatientInit= async (config:{accessToken: string, healthId: string, hipId: string, hipType: string, purpose : string, xCmId:"sbx" | "ndhm", authMode :   "MOBILE_OTP"| "DEMOGRAPHICS" |"AADHAAR_OTP"}):Promise<any> =>{
         const url = `${this.baseUrl}gateway/v0.5/users/auth/init`
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.accessToken}`,
            "X-CM-ID": config.xCmId
        }
        const body= {
            "requestId": uuidv4(),
            "timestamp":  new Date().toISOString(),
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
                "headers" : headers, "method" : "POST", "requestBody" : body, "url" : url
            })
    }


    hipAuthConfirm = async (config : {accessToken: string, xCmId: "sbx" | "ndhm", transactionId: string, authCode : string })=>{
        const url = `${this.baseUrl}gateway/v0.5/users/auth/confirm`
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.accessToken}`,
            "X-CM-ID": config.xCmId
        }

        const body ={
            "requestId": uuidv4(),
            "timestamp":  new Date().toISOString(),
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
                "headers" : headers, "method" : "POST", "requestBody" : body, "url" : url
            })

    }

    }