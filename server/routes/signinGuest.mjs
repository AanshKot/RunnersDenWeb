import express from "express";

const router = express.Router();
import jwt from 'jsonwebtoken';



router.post("/:guestsignin",async (req,res) => {

    // authenticate user as guest

    const user = {name:"guest"}

    // want to authenticate and serialize user using JWT
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
    res.json( { access_token: accessToken} )
})


export default router;