import { path, encodeBase64 } from "../../deps.js";
import Horcurx from "../classes/Horcrux.js";
import { split } from "../utils/secrets.js";
import { thresholdEqualOrLessThanParts, existsOneInput } from "../utils/validations.js";
import * as help from "../utils/help.js";

const create = async (args) => {
	if (args.help) {
		help.create();
		Deno.exit(0)
	}

	if (!validateArgs(args)) {
		help.create();
		Deno.exit(1)
	}

	const fileData = path.parse(args._[1]);
	const file = await Deno.readFile(path.join(fileData.dir, fileData.base));
	const fileBase64 = encodeBase64(file);

	const parts = split(fileBase64, args.parts, args.threshold);

	const metadata = Horcurx.createMetadata(fileData, undefined, args.parts, args.threshold);

	 for (let index = 0; index < args.parts; index++) {
		const horcrux = new Horcurx(metadata, parts[index], index);
		await horcrux.writeOut(args.output);
	 }
}

const validateArgs = (args) => {
	const existsOneInputValue = existsOneInput(args._[1]);
	const thresholdEqualOrLessThanPartsValue = thresholdEqualOrLessThanParts(args.parts, args.threshold);
	return (
		existsOneInputValue &&
		thresholdEqualOrLessThanPartsValue
	)
}

export default create;