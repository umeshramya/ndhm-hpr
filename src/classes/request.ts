import axios from "axios";
import request from "request";
export default class Request {
  async request(config: {
    headers: any;
    requestBody: any;
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  }): Promise<any> {
    const body = JSON.stringify(config.requestBody);

    return new Promise((resolve, reject) => {
      request(
        {
          headers: config.headers,
          body: body,
          url: config.url,
          method: config.method,
        },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }
}

export class RequestAxios {
  async request(config: {
    headers: any;
    requestBody: any;
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  }): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
        method: config.method,
        headers: config.headers,
        url: config.url,
        data: config.requestBody,
      }).then((res) => resolve(res)).catch(err=>reject(err));
    });
  }
}
