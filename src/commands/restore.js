import config from "../../config.js";
import { path, decodeBase64 } from "../../deps.js";
import Horcurx from "../classes/Horcrux.js";
import { combine } from "../utils/secrets.js";
import * as help from "../utils/help.js";


const restore = async (args) => {
	if (args.help) {
		help.restore()
		Deno.exit(0)
	}

    const horcruxesGroups = groupHorcruxesByUuid(await getAllHorcruxesInDir(args.input));

    if (horcruxesGroups.length === 0) {
        console.log(`No horcruxes found in ${args.input || './'}`);
        Deno.exit(1);
    }

    for (const horcruxParts of horcruxesGroups) {
        const length = horcruxParts.length;
        const metadata = horcruxParts[0].metadata;

         if (length < metadata.parts.threshold) {
             console.log(`Not enough horcruxes to restore some secret...`);
             continue;
         }

         console.log(`Restoring ${metadata.fileData.name}${metadata.fileData.ext}...`);

         const parts = horcruxParts.map(horcrux => horcrux.data)
         const fileBase64 = combine(parts);
         const file = decodeBase64(fileBase64);

         const outputFilename = `${metadata.fileData.name}-rebuild${metadata.fileData.ext}`;
         const outputFilePath = path.join(args.output || args.input || './', outputFilename);
         await Deno.writeFile(outputFilePath, file)
    }
}


async function getAllHorcruxesInDir(inputPath = "./") {
	const horcruxes = [];
    const dirEntries = Deno.readDir(path.join(Deno.cwd(), inputPath));
	for await (const dirEntry of dirEntries) {
		if (dirEntry.isFile) {
			const fileData = path.parse(path.join(Deno.cwd(), inputPath, dirEntry.name));

			if ( fileData.ext.toLowerCase() === `.${config.EXTENSION}`) {
				horcruxes.push((await getHorcrux(path.join(fileData.dir, fileData.base))));
			}
		}
	}
	return horcruxes;
}

function groupHorcruxesByUuid(horcruxes) {
    const horcruxesObject = {};

    horcruxes.forEach(horcrux => {
        const uuid = horcrux.metadata.uuid;
        if (!horcruxesObject[uuid]) horcruxesObject[uuid] = []
        horcruxesObject[uuid].push(horcrux);
    });

    const horcruxesArray = Object.values(horcruxesObject);
    return horcruxesArray
}

const getHorcrux = async (filename) => {
	const horcrux = await Horcurx.readOut(filename);
	return horcrux;
}

export default restore