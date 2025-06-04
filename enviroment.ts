//@ts-ignore
import CryptoJS from "crypto-js";

class TokenManager {
  public static getAccessToken() {
    const encryptedItem = localStorage.getItem("accessToken");

    if (!encryptedItem) return null;

    try {
      const decryptedItem = CryptoJS.AES.decrypt(
        encryptedItem,
        "accessToken"
      ).toString(CryptoJS.enc.Utf8);
      console.log(decryptedItem);
      return decryptedItem ? JSON.parse(decryptedItem) : null;
    } catch (error) {
      console.error("Error decrypting access token:", error);
      return null;
    }
  }
}

// Ejecutamos y exportamos el resultado
export const environment = {
  openBaas: process.env.OPENBAAS,
  accessToken: TokenManager.getAccessToken,
};
