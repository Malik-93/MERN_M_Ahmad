import express from 'express';
import multer from 'multer';
import fs from "fs";
import path from "path";
// import multerS3 from 'multer-s3';
// import aws from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();

// Create a new instance of the S3 bucket object with the correct user credentials
// const s3 = new aws.S3({
// 	accessKeyId: process.env.S3_ACCESS_KEY_ID,
// 	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
// 	Bucket: 'kosellsbucket',
// });

// Setup the congifuration needed to use multer
const upload = multer({
	// Set the storage as the S3 bucker using the correct configuration
	// storage: multerS3({
	// 	s3,
	// 	acl: 'public-read', // public S3 object, that can be read
	// 	bucket: 'kosellsbucket', // bucket name
	// 	key: function (req, file, cb) {
	// 		// callback to name the file object in the S3 bucket
	// 		// The filename is prefixed with the current time, to avoid multiple files of same name being uploaded to the bucket
	// 		cb(null, `${new Date().getTime()}__${file.originalname}`);
	// 	},
	// }),
	storage: multer.diskStorage({
		destination: (req, file, next) => {
			fs.exists('uploads', (exist) => {
				if (exist) {
					next(null, 'uploads')
				} else {
					fs.mkdir('uploads', (err, folder) => {
						next(null, folder);
					})
				}
			})
		},
		filename: (req, file, next) => {
			var time = Math.random().toString(36).substring(7);
			next(null, file.fieldname + '-' + time + path.extname(file.originalname));
		}
	}),
	limits: {
		fileSize: 5000000, // maximum file size of 5 MB per file
	},
	// Configure the list of file types that are valid
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpeg|jpg|png|webp|svg)$/)) {
			return cb(new Error('Unsupported file format'));
		}
		cb(undefined, true);
	},
});

router.post('/', upload.single('image'), (req, res) => {
	// console.log('req.file....', req.file);
	// if (req.file) res.send(req.file.location);
	if (req.file) res.send(`${process.env.FRONTEND_BASE_URL}/${req.file.path}`);
	else {
		res.status(401);
		throw new Error('Invalid file type');
	}
});

export default router;
