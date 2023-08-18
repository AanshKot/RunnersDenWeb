import express from "express";
import cors from "cors";


import LeftFoot from "./routes/leftFoot.mjs";
import RightFoot from "./routes/rightFoot.mjs";
import Shoes from "./routes/shoes.mjs";

import "./loadEnvironment.mjs";




const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());




app.use("/leftfoot",LeftFoot);

app.use("/rightfoot",RightFoot);

app.use("/shoes",Shoes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  

  });