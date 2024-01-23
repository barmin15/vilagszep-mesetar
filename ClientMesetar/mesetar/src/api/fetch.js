//using fetches with axios, for cleaner code 
import axios from "axios";
import {getAuthToken} from "../logic/localStorage";

//these are all the ordinary requests, it will handle the authentication and JWT token, so you don't need to do anything manually
export const request = (method, url, data) => {
    axios.defaults.baseURL = "";
    axios.defaults.headers.post["Content-Type"] = "application/json";
    
    let headers = {};

    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = { Authorization: `Bearer ${getAuthToken()}` };
    }

    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data,
    });
};

//only use this for the 'GET' requests
export const getRequest = (url) => {
    axios.defaults.baseURL = "";
    axios.defaults.headers.post["Content-Type"] = "application/json";
    let headers = {};

    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = { Authorization: `Bearer ${getAuthToken()}` };
    }

    return axios({
        method: "GET",
        headers: headers,
        url: url
    });
}
