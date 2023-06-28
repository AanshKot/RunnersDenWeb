import express from "express";
import cors from "cors";

import guestSignIn from "./routes/signinGuest.mjs"
import signUp from "./routes/signUp.mjs"
import login from "./routes/login.mjs"
import "./loadEnvironment.mjs";


const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());


app.use("/login",login);

app.use("/signup",signUp);

app.use("/guestsignin",guestSignIn);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  

  });