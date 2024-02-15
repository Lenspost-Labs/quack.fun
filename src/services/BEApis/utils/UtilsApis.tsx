import { apiInstance } from "../ApiConfig";

export const apiGetOgs = async (data: any) => {
    try {
        const response = await apiInstance.get(`/helper/fetch-og?url=${data}`);
        return response;
    } catch (error) {
        console.log("IN API - ERROR");
        console.log(error);
    }
}

export const apiSearchUsers = async (data: any) => {
    try {
        const response = await apiInstance.get(`/helper/search-username?q=${data}`);
        return response;
    } catch (error) {
        console.log("IN API - ERROR");
        console.log(error);
    }
}