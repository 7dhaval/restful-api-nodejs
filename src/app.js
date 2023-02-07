const express = require("express");
require("./db/conn");
const Student = require("./models/students");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());//this wil help to get the data using expree.json

// app.get("/", (req, res) => {
//     res.send("Hello From Other Side.");
// });

//create a New Students
// app.post("/students", (req, res) => {

//     console.log(req.body);
//     const user = new Student(req.body); //this will create post request to console
//     //this store data in user varible and save it to the database using try and catch
//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((err) => {
//         res.status(400).send(err);
//     });

//     // res.send("Hello From Other Side.");
// });

//using Async Function same code we are created above without using async
app.post("/students", async(req, res) =>{

    try { 
        const user = new Student(req.body);
        const createUser =  await user.save();
        res.status(201).send(createUser);    
    }
    catch(err){ res.status(400).send(err);} 
});



//read the data of regirstered students
app.get("/students", async(req, res) =>{
     try{
        const StudentsData = await Student.find();
        res.send(StudentsData);
     }catch(err){
        res.status(400).send(err);
     }
});

//GET individual student data
app.get("/students/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        console.log(studentData);
        if(!studentData){
            return res.status(404).send();
        }else{
            return res.send(studentData);
        }
        res.send(studentData);
    }catch(err){
        res.status(500).send(err);
    }
});



app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});
