
import { apiInstance } from "../BEApis/ApiConfig";


export const apiGetPosts = async () => {
    try {
        const response = await apiInstance.get("/posts/");
        return response?.data;
    } catch (error) {
        console.log("IN API - ERROR")
        console.log(error);
    }

}