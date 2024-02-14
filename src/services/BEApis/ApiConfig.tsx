import axios from "axios";
import { ENV_BACKEND_URL_PROD } from "src/config/envConfig";

const BEURL = ENV_BACKEND_URL_PROD;
export const apiInstance = axios.create({
  baseURL: BEURL,
});

// Add a request interceptor
apiInstance.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("jwt");

    // Add your default header here
    config.headers["Authorization"] = `Bearer ${jwtToken}`;
    config.headers["Content-Type"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Methods"] = "*";

    // Modify Content-Type for specific routes - for multipart/form-data
    // Useful for Forms Data

    const routesForMultipartType = [""];

    if (routesForMultipartType.includes(config.url || "")) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    console.log("config");
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
