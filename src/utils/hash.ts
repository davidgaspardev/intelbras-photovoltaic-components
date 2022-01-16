import crypto from "crypto";

export function textToMd5(text: string) {
    return crypto.createHash('md5').update(text).digest('hex');
}