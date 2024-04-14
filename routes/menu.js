import express from "express";
const AuthRouter = express.Router();

import{auth} from "./privateRoute.js";

//database 
import {getAllPlat , getPlatById , addPlat} from '../database.js';


AuthRouter.get("/" , auth , async (req , res) => {
    const rows = await getAllPlat();
    await res.send(rows);
});

AuthRouter.get('/:id', auth ,async(req , res) => {
    try{
        const id = req.params.id;
        const rows = await getPlatById(id);
        await res.send(rows);
    }catch(err){
        console.log(err);
    }
});

AuthRouter.post('/' , auth , async (req , res ) =>{
    try{
        const itemId = req.body.itemId;
        const titre = req.body.titre;
        const description = req.body.description;
        const prix = req.body.prix;
        const rows = await addPlat(itemId , titre , description , prix);
        await res.send(rows);
    }catch(err){
        console.log(err);
    }
});

//here we can add to update and modifie an exsisting plat

export{AuthRouter};