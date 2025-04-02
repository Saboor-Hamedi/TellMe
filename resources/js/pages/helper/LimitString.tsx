
export function LimitString(str: string, limit: number, ellipsis = '') {
    if (str.length > limit) {
        return str.substring(0, limit) + ellipsis;
    }
    return str;
}

