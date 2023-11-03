const express = require("express");

const fs = require("fs")

// const winston = require('winston');

const app = express();

const PORT = 8008

// const logwrite = ()=>{
//     const logwinston = winston.createLogger({
//         level: 'info',
//         format: winston.format.json(),
//         defaultMeta: { service: 'user-service' },
//         transports: [
//           new winston.transports.File({ filename: 'error.log', level: 'error' }),
//           new winston.transports.File({ filename: 'combined.log' }),
//         ],
//       });
//       logwinston.log("error")
// }

app.use(express.json());

app.get("/api/users", (req,res) =>{
    console.log("All Users Method")
    res.status(200).json({message:"Success"});
});

app.post("/api/users", (req,res) =>{
    console.log("Create New User");
    const newUser = { id: uuidv4(), ...req.body};

    const { users } = JSON.parse(
        fs.readFileSync("users.json", {encoding: "uft-8"})
    );
    users.push(newUser);

    fs.readFileSync("users.json", JSON.stringify({users}),{
        encoding: "uft-8",
    });
    res.status(200).json({message:"success"})
});

app.put("/api/users/:id", (req,res) =>{
    console.log("Update User By ID");
    res.status(200).json({message:"success"});
});

app.delete("/api/users/:id", (req,res) =>{
    console.log("Delete Users By ID");
    res.status(200).json({message:"success"});
});

app.listen(8008, ()=>console.log("server is listening at 8008 port"));

