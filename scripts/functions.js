const fs = require("fs");
const u = require("util");
const rmFile = u.promisify(fs.rm);


const mainFilePath = "public/main.js";
const filesToDelete = ["public/types.js", "public/dataBidon.js"];


function modifyMain()
{
	if (fs.existsSync(mainFilePath)) {
		// read
		let str = fs.readFileSync(mainFilePath, {encoding: "utf8"});
		
		// replace
		str = str.replace(/"use strict";\s*/g,"");
		str = str.replace(/Object\.defineProperty\(exports, "__esModule", \{ value: true \}\);?\s*/g,"");
		str = str.replace(/const Plotly = require\("plotly\.js-dist-min"\);?\s*/g,"");
		str = str.replace(/const dataBidon_1 = require\("\.\/dataBidon"\);?\s*/g,"");
		str = str.replace(/dataBidon_1\./g,"");
		
		// write
		fs.writeFileSync(mainFilePath, str, {encoding: "utf8"});
	}
}

function deleteUnwantedFiles()
{
	// for (const file of process.argv.slice(2)) {
	for (const file of filesToDelete) {
		// console.log(`deleting ${file}: ${fs.existsSync(file)}`);
		try {fs.rmSync(file);}
		catch (e) {}
	}
}


module.exports = {
	modifyMain,
	deleteUnwantedFiles,
	mainFilePath,
	filesToDelete
};

