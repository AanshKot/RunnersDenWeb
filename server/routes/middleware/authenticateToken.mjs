import express from "express";
import jwt from 'jsonwebtoken';

function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization']
    // our token is either going to be undefined or the actual token
    const token = authHeader && auth.Header.split(' ')[1]

    if(token == null){
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
      })
    

}

