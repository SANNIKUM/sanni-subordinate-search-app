import { getApiUrl, getEnvironment } from './environment-util';
import "isomorphic-fetch";

const API_URL = getApiUrl();
const POST = 'post';
const GET = 'get';
const PUT = 'put';

const httpRequest = (method = GET, request, IsReqArr = []) => {
    try {
        
        const headers ={}
         method == POST || method == PUT ? request.requiresAuth ?
           headers =   {
                "content-type": "application/json",
                "Authorization": "Bearer  " + request.data.tokenString                
            } : headers = {
                "content-type": "application/json"
            }: request.requiresAuth ? headers = Object.assign({},headers, {
                "Authorization": "Bearer  " + request.data.tokenString
                           }) : headers;
         
      
        let content = method == POST || method ==PUT ? {
            method,            
            body: JSON.stringify(request.data)
        } : {
            headers,
                method
                
            };
            if(IsReqArr.length){
                const promises =IsReqArr.map((empName) => {
                    return  fetch(API_URL + request.endpoint +empName,
                        content)
                         .then(response => {
                             if (!response.ok) {
                                 throw Error(response.statusText);
                             }
                             return response.json();
                         });
                })
        
                return Promise.all(promises)
            }
           return fetch(API_URL + request.endpoint,
           content)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            });
    } catch (err) {
        throw err;
    }
};

export const post = (endpoint, data, requiresAuth) =>
    httpRequest(POST, { endpoint, data, requiresAuth });

export const get = (endpoint, data, requiresAuth,IsReqArr) =>
    httpRequest(GET, { endpoint, data, requiresAuth },IsReqArr);

