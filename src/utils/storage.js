import { decrypt, encrypt } from "./crypto";
import { SessionStorage } from "./enums";

const insertData = (data, key, type = SessionStorage, encrypted = true) => {

    let Storage = type === SessionStorage ? sessionStorage : localStorage

    let data_to_store = data

    if (encrypted) {
        data_to_store = encrypt(data)
    }

    if (data_to_store) Storage.setItem(key, data_to_store)

};

const extractData = (key, type = SessionStorage, encrypted = true) => {

    let Storage = type === SessionStorage ? sessionStorage : localStorage

    let data = Storage.getItem(key);

    if (!data) return null

    if (encrypted) {
        data = decrypt(data)
    }

    return data;

};

const resetData = () => {
    sessionStorage.clear()
    localStorage.clear()
};

export {
    extractData,
    insertData,
    resetData
};

