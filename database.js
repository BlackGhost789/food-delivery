import mysql from "mysql2";

const pool = mysql.createPool({
    host : "127.0.0.1",
    user : "root",
    password: "",
    database : "food"
}).promise();

async function getUsers(){
    const [rows] = await pool.query("Select * from users");
    console.log(rows);
    return rows;
}

async function InserUser(nom , email , password){
   
    const [result]  = await pool.query(`Insert into users (name , email, password) values (?, ? , ?)`,[nom , email , password]);
    console.log("data inserted :)");
}

async function FindEmail(email){
    const [result] = await pool.query("Select * from users where email = ?" , [email]);
    if(result.length == 0){
        return false;
    }
    return true;
}

async function FindPassword(email){
    const [result] = await pool.query("Select * from users where email = ?" , [email]);
    if(result.length == 0){
        return "";
    }else{
        return result[0].password;
    }
}

async function getIdByEmail(email){
    const [result] = await pool.query("Select * from users where email = ?" , [email]);
    if(result.length == 0){
        return 0;
    }else{
        return result[0].id;
    }
}

///menu 

async function getAllPlat(){
    try{
        const [rows] = await pool.query("select * from menu");
        console.log(rows);
        return rows;
    }catch(err){
        console.log(err);
    }
}

async function getPlatById(id){
    try{
        const [rows] = await pool.query("select * from menu where itemId = ?", [id]);
        return rows;
    }catch(err){
        console.log(err);
    }
}

async function addPlat(itemId , titre , description , prix){
    try{
        const [rows] = await pool.query(`Insert into menu (itemId , titre, description , prix) values (?, ? , ? , ?)` , [itemId , titre , description , prix]);
        return rows;
    }catch(err){
        console.log(err);
    }
}





export {getUsers , InserUser , FindEmail , FindPassword , getIdByEmail , getAllPlat , getPlatById , addPlat};