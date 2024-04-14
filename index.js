import expres from "express";
import bodyParser from "body-parser";

const app = expres();
const port = 8080;

//import route
import {router} from "./routes/Auth.js";
import {AuthRouter} from "./routes/menu.js";

app.use(bodyParser.json());
//route 
app.use("/api/user" , router);
app.use("/api/posts" , AuthRouter); 



app.get("/" , (req , res) => {
    res.send("Home page");
})





app.listen(port , () => {console.log("Open server at port 8080")});
