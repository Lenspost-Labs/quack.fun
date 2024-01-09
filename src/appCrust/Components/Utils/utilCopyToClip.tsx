import { message } from "antd";

export const utilCopyToClip = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success("Copied to clipboard");
}