
import { apiInstance } from "../ApiConfig";


export const apiGetComments = async () => {
    try {
        const response = await apiInstance.get("/comments/");
        return response;
    } catch (error) {
        console.log("IN API - ERROR")
        console.log(error);
    }

}