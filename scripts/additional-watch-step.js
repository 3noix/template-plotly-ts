const fs = require("fs");
const u = require("util");
const f = require("./functions");
const rmFile = u.promisify(fs.rm);
const dt = 2000;


// init
console.log("XXX");
f.modifyMain();
f.deleteUnwantedFiles();


// watch
fs.watchFile(f.mainFilePath, {interval: dt}, watchAndModify);
function watchAndModify() {
	fs.unwatchFile(f.mainFilePath);
	f.modifyMain();
	fs.watchFile(f.mainFilePath, {interval: dt}, watchAndModify);
}


f.filesToDelete.forEach(file => {
	setInterval(() => {
		try {fs.rmSync(file)}
		catch (e) {}
	}, dt);
});


