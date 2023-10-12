import config from "../../config.js";

const version = () => {
    console.log(`
Horcrux v${config.VERSION}

Iván Barcia
MIT License
    `)
};

export default version;