import { secrets }  from "../../deps.js";

const split = (secret, parts, threshold = parts) => {
    const secretHex = secrets.default.str2hex(secret);
    const shares = secrets.default.share(secretHex, parts, threshold);
    return shares;
}

const combine = (shares) => {
    const secretHex = secrets.default.combine(shares);
    const secret = secrets.default.hex2str(secretHex);
    return secret;
}

export { split, combine };