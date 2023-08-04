import express from "express";
import multer from "multer";

import { S3Client,PutObjectCommand } from "@aws-sdk/client-s3";

import dotenv from 'dotenv';

dotenv.config()


const storage = multer.memoryStorage();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials : {
        accessKeyId: accessKey,

        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
});

const router = express.Router();

router.post("/",async(req,res) => {
    // check if the user is logged in, if they are send the images to the S3 bucket/ perform modifications if necssary

    const imageBase64 = req.body.image;
    const userID = req.body.userID;

    const imageBuffer = Buffer.from(imageBase64,'base64');

    

    const params = {
        Bucket: bucketName,
        Key: `${userID}-L.jpg`,
        Body: imageBuffer,
        ContentType: 'image/jpeg',
    }
    

    const command = new PutObjectCommand(params);

    
  try {
    await s3.send(command);
    console.log('Image uploaded successfully!');

    // Construct the S3 object URL using the bucket name and key
    const s3ObjectURL = `https://${bucketName}.s3.amazonaws.com/${userID}-L.jpg`;
    console.log(s3ObjectURL);
    // Send the S3 object URL back to the client
    res.status(200).json({ s3ObjectURL }); // You can send additional data if needed
  } catch (error) {
    console.error('Error uploading image:', error);
    res.sendStatus(500); // Send an error response to the client
  }

})

export default router;