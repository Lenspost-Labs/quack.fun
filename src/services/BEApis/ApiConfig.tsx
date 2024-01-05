import axios from "axios";
// import { useAuth } from "src/context/AppContext";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const apiInstance = axios.create({
    baseURL: BACKEND_URL,
  });
  
  // Add a request interceptor
  apiInstance.interceptors.request.use(
    (config) => {
      const jwtToken = localStorage.getItem("jwt");
  
      // Exclude the login API from adding the default header
  
      // Add your default header here
      config.headers["Authorization"] = `Bearer ${jwtToken}`;
      config.headers["Content-Type"] = "application/json" || "multipart/form-data";
      config.headers["Access-Control-Allow-Origin"] = "*";
      config.headers["Access-Control-Allow-Methods"] = "*";
  
      // Modify Content-Type for specific routes
      // if (config.url && config.url in ['/fileToS3']) {
        const routesForMultipartType = [''];
  
      if (routesForMultipartType.includes(config.url || "")){
        config.headers['Content-Type'] = 'multipart/form-data';
      } else {
        config.headers['Content-Type'] = 'application/json';
      }
      
      console.log("config");
      console.log(config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  