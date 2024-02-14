import { message } from "antd";

export const utilCopyToClip = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success(text + " Copied to clipboard");
}