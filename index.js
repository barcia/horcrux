import { parse, load } from "./deps.js";
import { create, restore, version } from "./src/commands/_index.js";
import config from "./config.js";
import * as help from "./src/utils/help.js";

await load({export: true})

const args = parse(Deno.args, {
	boolean: ["help"],
	string: ["output", "input"],
	default: { parts: config.DEFAULT_PARTS, threshold: config.DEFAULT_THRESHOLD },
	alias: { parts: "p", threshold: "t", help: "h", output: "o", input: "i" },
});

const commands = {
	create,
	restore,
	version,
};

if (!args._[0]) {
	help.main();
	Deno.exit(0);
}

if (args._[0] in commands) {
	await commands[args._[0]](args);
	Deno.exit(0);
} else {
	console.log(`Command not found`);
	help.main();	
	Deno.exit(1);
}
