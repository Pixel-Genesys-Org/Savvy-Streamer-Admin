import CryptoJS from "crypto-js";
import { CRYPTO_KEY } from "../configs/env";

const encrypt = (data) => {

  if (!data) return null

  let object_data = JSON.stringify(data)
  let encrypted_data = CryptoJS.AES.encrypt(object_data, CRYPTO_KEY).toString()
  return encrypted_data

};

const decrypt = (data) => {

  if (!data) return null

  let decrypted_data = CryptoJS.AES.decrypt(data, CRYPTO_KEY)
  let result = JSON.parse(decrypted_data.toString(CryptoJS.enc.Utf8));
  return result;

};

export {
  decrypt,
  encrypt
};

