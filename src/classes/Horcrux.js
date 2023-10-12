import config from "../../config.js";
import { path, nanoid } from "../../deps.js";
import { encryptString, decryptString } from "../utils/crypto.js";

class Horcurx {
    constructor(metadata, data, index) {
        this.metadata = metadata;
        this.data = data;

        this.setCurrent(index)
        console.log(`Created horcrux ${index + 1} of ${metadata.parts.total}`);
    }

    get(json = false) {
        if (json) {
            return JSON.stringify({
                metadata: this.metadata,
                data: this.data,
            });
        } 
        return {
            metadata: this.metadata,
            data: this.data,
        }
    }

    setCurrent(index) {
        this.metadata.parts.current = index + 1;
    }

    async writeOut(outputPath = this.metadata.fileData.dir) {
        const dataStringEncrypted = await encryptString(this.get(true));
        const outputFilename = `${this.metadata.fileData.name}-${nanoid.nanoid(6)}.${config.EXTENSION}`;
        await Deno.writeTextFile(path.join(outputPath, outputFilename), dataStringEncrypted);
    }

    static async readOut(filename) {
        const dataStringEncrypted = await Deno.readTextFile(filename)
        const dataString = await decryptString(dataStringEncrypted)
        const data = JSON.parse(dataString)
        return data
    }

    static createMetadata(fileData, current, total, threshold) {
        return {
            uuid: crypto.randomUUID(),
            fileData,
            parts: {
                current,
                total,
                threshold,
            },
            timestamp: Date.now(),
            version: config.VERSION,
        }
    }
}

export default Horcurx;