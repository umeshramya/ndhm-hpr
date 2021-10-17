import request from "request"
export default class Request{

    async request (config:{headers : any, requestBody:any, url:string, method : "GET" | "POST" | "PUT" | "DELETE" | "PATCH"}):Promise<any>{
        const body = JSON.stringify(config.requestBody)
        
        return new Promise((resolve, reject)=>{
            request({
                "headers" : config.headers,
                "body" : body,
                "url" : config.url,
                "method" : config.method
            }, (err, res)=>{
                if (err){
                    reject(err)
                }else{
                    resolve(res)
                }
            })
        })
    }

}