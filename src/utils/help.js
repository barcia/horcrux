const main = () => {
	console.log(`
Usage: horcrux [command] [options]

Commands:
	horcrux create <file> [options] - Create horcruxes from a file
	horcrux restore - Restore al horcruxes in the current directory
	horcrux version - Show the current version
	`)
};

const create = () => {
	console.log(`
Usage: horcrux create [options] <filename>

Options:
	-p, --parts=[parts]		Number of horcruxes to create (default: 3)
	-t, --threshold=[threshold]	Number of horcruxes required to restore (default: 3)
	-o, --output=[output]		Output directory (default: current directory)
	-h, --help			Show this help message
	`)
}

const restore = () => {
	console.log(`
Usage: horcrux restore [options]

Options:
	-i, --input=[input]		Input directory (default: current directory)
	-o, --output=[output]		Output directory (default: same as input directory)
	-h, --help			Show this help message
	`)
}

export { main, create, restore };