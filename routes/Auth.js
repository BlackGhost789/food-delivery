
import {getUsers , InserUser , FindEmail , FindPassword , getIdByEmail} from "../database.js";

import express from "express";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";


const router = express.Router();

router.post("/register" , async (req , res) => {
    
    const nom = req.body.nom;
    const email = req.body.email;
    const password = req.body.password;

    //use some validation here to the user input before send it to the db    
    const cheakEmail = await FindEmail(email);

    //hacking the password
    const salt = await bcrypt.genSalt(10);
    const hackPassword = await bcrypt.hash(password , salt);
    
    try{
        await InserUser(nom , email , hackPassword);
        res.send({nom , email , password});
    }catch(err){
        res.status(400).send(err);
    }
});

router.post("/login" , async (req , res)=>{

    const email = req.body.email;
    const password = req.body.password;

    //validation des donees 
    const cheakEmail = await FindEmail(req.body.email);
    if(!cheakEmail){return res.status(400).send("Email or dont exsist");}

    //password from the db
    const passwordDb = await FindPassword(email);

    //check if the password is valid 
    const validPass = await bcrypt.compare(password , passwordDb);
    if(!validPass){return res.status(400).send("Password is not correct");}

    //create and give a token 
    const token = jwt.sign({_id: getIdByEmail(email)} , "randomPasswordToken");

    res.header('auth-token', token).send(token);

});




export{router};