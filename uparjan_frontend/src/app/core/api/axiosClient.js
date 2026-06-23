// this file is used to create an instance of axios with a base URL for making API requests. 
//The base URL is set to "https://localhost:5001/api", which means that all requests made using this 
// axios instance will be prefixed with this URL. This allows for easier management of API endpoints and 
// ensures that all requests are directed to the correct server.

import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:5001/api",
});

export default axiosClient;