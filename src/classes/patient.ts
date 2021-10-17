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

    hipVerifyPatinetByHealthId = async (accessToken: string, healthId: string, hipId: string, hipType: string): Promise<any> => {
        const url = `${this.baseUrl}gateway/v0.5/users/auth/fetch-modes`;
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
            "X-CM-ID": "sbx"
        }
        const requestBody = {
            "requestId": uuidv4(),
            "timestamp":  new Date().toISOString(),
            "query": {
                "id": healthId,
                "purpose": "LINK",
                "requester": {
                    "type": hipType,
                    "id": hipId
                }

            }
        }

        return await new Request().request({
            "headers" : headers, "method" : "POST", "requestBody" : requestBody, "url" : url
        })
   

    
        }

    }