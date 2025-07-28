import axios from "axios";
import { fileData } from "components/file-thumbnail";

export default function dataURLtoFile(dataurl, filename) {
    const [header, base64] = dataurl.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(base64);
    const array = Uint8Array.from(binary, char => char.charCodeAt(0));
    return new File([array], filename, { type: mime });
}



export async function imageToFile(path = '') {
    if (!path) return null;
    try {
        const response = await axios({ url: path, method: 'get', responseType: 'blob', headers: { 'Cache-Control': "no-cache" } });
        const blob = await response?.data;
        const { name, } = fileData(path);
        const createdFile = new File([blob], name, { type: blob.type });
        return createdFile
    } catch (error) {
        console.error("Error converting image to Base64:");
        throw error
    }
}