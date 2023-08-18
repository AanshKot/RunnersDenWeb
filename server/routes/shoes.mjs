import express from "express";
import multer from "multer";

import { S3Client,GetObjectCommand } from "@aws-sdk/client-s3";

import dotenv from 'dotenv';
import { GoogleApis, google } from "googleapis";


dotenv.config()




const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;




  async function makePostRequest(url, data) {
    const headers = {
      'Content-Type': 'application/json',
    };
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    };
  
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error('Endpoint response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  }

  async function callAPI(data) {
    const url = 'http://15.156.88.77:5000/api';
    const response_data = await makePostRequest(url, data);
    if (response_data) {
        console.log('Response:', response_data);
    }
    return response_data;
}




const router = express.Router();

router.post("/",async (req,res) => {
    // 

    const userID = req.body.userID;
    const left_link = req.body.imageL;
    const right_link = req.body.imageR;
    const paper_size = req.body.paperSize;
    const input_size = req.body.input_size;
    const sex = req.body.sex;


    const userPref = req.body.preferences;



    const data = {
        userid: userID,
        left_link: left_link,
        right_link: right_link,
        paper_size: paper_size,
        input_size: input_size,
        sex: sex,
        resize: 0.4,
        debug: 'True',
      };
    

    console.log(data);
    

    try {
        const shoes = await callAPI(data);

        const shoeModelRecs = shoes["Shoe Model Recommendations"];

        console.log(shoeModelRecs);

        const left_error = shoes["left_error"];
        const right_error = shoes["right_error"];

        // if(left_error || right_error){
        //   return res.status(400).json({ error: "Foot scan images are not valid. Please redo your foot scan." });
        // }

        

       
        const auth = new google.auth.GoogleAuth({
          keyFile: "credentials.json",
          
          scopes: "https://www.googleapis.com/auth/spreadsheets",

        });

        //Create Client instance for auth
        const client = await auth.getClient();


        //Instance of Google Sheets API

        const googleSheets = google.sheets({ version: "v4",auth: client });


        const spreadsheetId = "1KLkj7OZ7qNSSErn905PrLOmRl96XkQ4X9WYocmRIzpc";


        const getRows = await googleSheets.spreadsheets.values.get({
          auth,

          spreadsheetId,

          range: "Sheet1!A:D",
          
          
        })

        console.log(getRows);
      
    
        const shoesData = getRows.data.values;

        const sendClientRecs = [];



        for(const modelName in shoeModelRecs){

          for(let i = 0; i < shoesData.length; i++){
            if(shoesData[i].length != 0 && shoesData[i][1] === modelName){
              const rec_size = shoeModelRecs[modelName]
              sendClientRecs.push([shoesData[i],rec_size]);
            }
          }

        }

        console.log("Client Recommendations: ",sendClientRecs);

        res.status(200).json({ sendClientRecs });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);

    }
})

export default router;