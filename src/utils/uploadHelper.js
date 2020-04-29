const { v4: uuidv4 } = require("uuid");
const path = require("path");

const uploadFile = (file) => {
	const storageDir = "/assets/";
	const destinationDir = path.resolve(__dirname, "../public/assets");
	const generatedFileName = generateRandomFilename(file.name);
	const destinationPath = path.join(destinationDir, generatedFileName);
	const returnedPath = path.join(storageDir, generatedFileName);
	try {
		file.mv(destinationPath);
		//Normalize string for unix path
		return returnedPath.replace(/\\/g, "/");
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const generateRandomFilename = (filename) => {
	const extensionIndex = filename.lastIndexOf(".");
	return uuidv4() + filename.substring(extensionIndex);
};

module.exports = {
	uploadFile,
};
