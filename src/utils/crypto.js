import { crypto } from "../../deps.js";
import * as mod from "https://deno.land/std@0.203.0/encoding/hex.ts";

const privateKeyHex = "ea28519adc8a4735af3fb1f23204cc6f";
const privateKey = mod.decodeHex(privateKeyHex);

const ivHex = "762b4d64bac09b672015dfef0ae424a9";
const iv = mod.decodeHex(ivHex);

const key = await crypto.subtle.importKey(
    "raw",
    privateKey,
    { name: "AES-CBC", length: 128 },
    true,
    ["encrypt", "decrypt"],
  );

const encryptString = async (string) => {
    const encoded = new TextEncoder().encode(string);

    const encrypted = await crypto.subtle.encrypt(
        {name: "AES-CBC", iv},
        key,
        encoded,
    );

    const encryptedBytes=new Uint8Array(encrypted);
        const hex = mod.encodeHex(encryptedBytes);
    return hex;
}

const decryptString = async (string) => {

    const encryptedBytes = mod.decodeHex(string);

    const decrypted = await crypto.subtle.decrypt(
        {name: "AES-CBC", iv},
        key,
        encryptedBytes,
    );

    const decryptedBytes = new Uint8Array(decrypted);
    const decoded = new TextDecoder().decode(decryptedBytes);

    return decoded;
}

export { encryptString, decryptString };