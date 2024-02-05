import { jwtDecode } from "jwt-decode";

export const utilDecodeJWT = (token: string) => {
    const decoded = jwtDecode(token);
    return decoded
}