

const callAPI = async () => {
    const endpoint = "http://35.183.77.17:5000/api"; 

    const parameters = {
        "userid": 141658153,
        "left_link": "https://809cd8fc26abdd8143d6399e79b15687.cdn.bubble.io/f1682705034358x749551136621391100/image%2Fjpeg",
        "right_link": "https://809cd8fc26abdd8143d6399e79b15687.cdn.bubble.io/f1682705057258x898183029341518700/image%2Fjpeg",
        "paper_size": "Letter",
        "sex": "Men's",
        "resize": 0.4,
        "debug": "False",
      };
    

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: parameters,
      };

      await fetch(endpoint,requestOptions).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      }).then((data) => {
        console.log(data);
      }).catch((error) => {
        console.error("Error calling the API:", error);
      });
    

}

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
      const imageBuffer = await new Promise((resolve, reject) => {
        const chunks = [];
        response.Body.on("data", (chunk) => chunks.push(chunk));
        response.Body.on("end", () => resolve(Buffer.concat(chunks)));
        response.Body.on("error", (error) => reject(error));
      });
  

      console.log("Image fetched successfully!");
  

      const base64Image = imageBuffer.toString("base64");

      const imageSrc = `data:image/jpeg;base64,${base64Image}`;
      



      const imgUrl = URL.createObjectURL(base64ToBlob(imageSrc));

      console.log("Image source:", imageSrc);
      console.log('Img URL',imgUrl);
    } catch (error) {
      console.error("Error fetching image from S3:", error);
    }
  };


// getObjectFromS3("https://universoleimagesbucket.s3.amazonaws.com/999999999-L.jpg");

