
export function stringToBase64(str: string) {
    const buffer = Buffer.from(str, "utf-8");
    return buffer.toString("base64");
}

export function base64ToString(base64: string) {
    const buffer = Buffer.from(base64, "base64");
    return buffer.toString("utf-8");
}

export function mapToQuery(map: { [key: string]: any }) {
    let result = '';

    Object.keys(map).forEach(key => {
        if(map[key] == null) {
            delete map[key];
        }
    });

    const keys = Object.keys(map);
    for(let i = 0; i < keys.length; i++) {
        result += `${keys[i]}=${map[keys[i]]}`;
        if(i !== (keys.length - 1)) {
            result += "&";
        }
    }

    return result;
}