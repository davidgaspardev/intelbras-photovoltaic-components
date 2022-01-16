
export function stringToBase64(str: string) {
    const buffer = Buffer.from(str, "utf-8");
    return buffer.toString("base64");
}

export function base64ToString(base64: string) {
    const buffer = Buffer.from(base64, "base64");
    return buffer.toString("utf-8");
}