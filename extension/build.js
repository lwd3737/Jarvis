const { exec } = require("child_process");
const fs = require("fs");
const { JSDOM } = require("jsdom");

function runCommand(command) {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				reject(error);
				return;
			}
			console.info(`${command}`);

			if (stderr) console.error(`${stderr}`);
			else console.info(stdout);

			resolve();
		});
	});
}

async function runCommands() {
	if (fs.existsSync("extension")) await runCommand("rm -r extension");
	await runCommand("mv out extension");
	// manifest.json, scripts 복사 및 컴파일
	await runCommand("cp manifest.json extension/manifest.json");
	await runCommand(
		"mkdir extension/styles && cp src/styles/*.css extension/styles/",
	);
	// rename: _next -> next
	await runCommand("mv extension/_next extension/next");
	// import:  _next -> next
	await runCommand("sed -i '' -e 's/\\/_next/\\.\\/next/g' extension/**.html");

	const htmlFiles = findHtmlFiles();
	htmlFiles.forEach((file) => extractInlineScripts(file));
}

function findHtmlFiles() {
	const dirPath = "./extension";
	const files = fs.readdirSync(dirPath);
	return files
		.map((file) => `${dirPath}/${file}`)
		.filter((filePath) => filePath.endsWith(".html"));
}

async function extractInlineScripts(file) {
	const html = fs.readFileSync(file);
	const [dom, document] = parseJSDOM(html);

	const scripts = Array.from(document.getElementsByTagName("script"));
	const scriptsWithoutSrc = scripts.filter(
		(script) => !script.getAttribute("src"),
	);
	const code = scriptsWithoutSrc.reduce(
		(code, script) => (code += script.textContent + ";"),
		"",
	);
	scriptsWithoutSrc.forEach((script) => {
		script.remove();
	});

	const scriptFile = file.replace(".html", ".js");
	fs.writeFileSync(scriptFile, code);

	const newScriptEl = document.createElement("script");
	const jsFileSrc = scriptFile.replace("extension", ".");

	newScriptEl.setAttribute("src", jsFileSrc);
	document.body.appendChild(newScriptEl);

	fs.writeFileSync(file, dom.serialize());
}

function parseJSDOM(html) {
	const jsdom = new JSDOM(html);
	return [jsdom, jsdom.window.document];
}

runCommands().catch(console.error);
