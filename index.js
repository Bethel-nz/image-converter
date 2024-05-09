const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5379;
const storage = multer.diskStorage({

	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
});
const upload = multer({ storage: storage });

const outputDir = 'compressed';
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}
const baseURL = process.env.BASE_URL || 'http://localhost:5379'


app.post('/api/v1/compress', upload.single('image'), async (req, res) => {
	if (!req.file) {
		return res.status(400).send('No image uploaded.');
	}
	const filename = req.file.originalname.split('.')[0]

	try {
		const compressedAndConvertedBuffer = await compressAndConvertImage(req.file.path);
		const outputPath = path.join(outputDir, `compressed_${filename}.png`);
		fs.writeFileSync(outputPath, compressedAndConvertedBuffer);
		res.send({ message: 'Image processed and saved.', url: `${baseURL}/compressed/${path.basename(outputPath)}` });
	} catch (error) {
		console.log(error)
		res.status(500).send('Failed to process the image.');
	}
});

app.get('/api/v1/compressed', async (req, res) => {
	try {
		const files = fs.readdirSync(outputDir);
		const fileData = files.map(file => {
			return {
				name: file,
				url: `${baseURL}/compressed/${file}`
			};
		});
		res.json(fileData);
	} catch (error) {
		console.log(error);
		res.status(500).send('Failed to list files.');
	}
});


app.get('/api/v1/compressed/:filename', async (req, res) => {
	const filename = req.params.filename;
	const filePath = path.join(outputDir, filename);
	console.log(filePath, 'hello')

	try {
		res.download(filePath);
	} catch (error) {
		console.log(error);
		res.status(500).send('Failed to serve the image.');
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

async function compressAndConvertImage(filePath) {
	const fileData = fs.readFileSync(filePath);
	return sharp(fileData)
		.png({ quality: 80 })
		.toBuffer();
}