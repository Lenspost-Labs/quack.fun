
import { apiInstance } from "../ApiConfig";


export const apiGetPosts = async () => {
    try {
        const response = await apiInstance.get("/posts/");
        return response;
    } catch (error) {
        console.log("IN API - ERROR")
        console.log(error);
    }

}