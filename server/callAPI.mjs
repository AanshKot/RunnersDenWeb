
import { S3Client,GetObjectCommand } from "@aws-sdk/client-s3";

import dotenv from 'dotenv';

dotenv.config()




const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;



function base64ToBlob(base64String, contentType = 'image/jpeg') {
    const byteCharacters = atob(base64String.split(',')[1]);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }


const getObjectFromS3 = async (imageUrl) => {
    // Parse the bucket name and key from the S3 URL
    const s3UrlRegex = new RegExp(`^https://${bucketName}.s3.amazonaws.com/(.+)$`);

    // need the key and the bucketname to get the Object from the S3bucket
    const [, key] = imageUrl.match(s3UrlRegex);
  
    // Create an instance of the S3 client
    const s3 = new S3Client({
      credentials: {
        accessKeyId: accessKey,

        secretAccessKey: secretAccessKey,
      },
      region: bucketRegion,
    });
  
    // Prepare the GetObjectCommand
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    const command = new GetObjectCommand(params);
  
    try {
      // Fetch the object from S3
      const response = await s3.send(command);
        

      console.log(response);
    //   The response contains the image data in the `Body` property
    const chunks = [];

      response.Body.on("data", (chunk) => {
          chunks.push(chunk);
      });
      
      response.Body.on("end", () => {
          const imageBuffer = Buffer.concat(chunks);
          const base64Image = imageBuffer.toString("base64");
          const imageSrc = `data:image/jpeg;base64,${base64Image}`;
          const adjustedImageSrc = imageSrc.replace('dataimage/jpegbase64', '');
          console.log("Image source:", adjustedImageSrc);
          
      });
    
  
    } catch (error) {
      console.error("Error fetching image from S3:", error);
    }
  };


getObjectFromS3("https://universoleimagesbucket.s3.amazonaws.com/999999999-L.jpg");

