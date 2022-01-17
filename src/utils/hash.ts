import crypto from "crypto";

export function textToMd5(text: string) {
    return crypto.createHash('md5').update(text).digest('hex');
}

const hex = "0123456789abcdef";

export function isTextMd5(text: string)  {
    if(text.length !== 32) return false;

    for(const letter of text) {
        if(!hex.includes(letter)) return false;
    }

    return true;
}