const express = require("express");
const Student = require("../models/students");
const router = new express.Router();

router.get("/dhaval", (req, res) => {
    res.send("Hello from Router");
});

//using Async Function same code we are created above without using async
router.post("/students", async(req, res) =>{

    try { 
        const user = new Student(req.body);
        const createUser =  await user.save();
        res.status(201).send(createUser);    
    }
    catch(err){ res.status(400).send(err);} 
});



//read the data of regirstered students
router.get("/students", async(req, res) =>{
     try{
        const StudentsData = await Student.find();
        res.send(StudentsData);
     }catch(err){
        res.status(400).send(err);
     }
});

//GET individual student data
router.get("/students/:id", async (req, res) => {
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

//update the student by its id
router.patch("/students/:id", async(req,res) => {
    try{
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id,req.body ,{
            new:true
        });
        res.send(updateStudents);
    }catch(err){
        res.status(400).send(e);

    }
})

//delete the student by it id
router.delete("/students/:id", async(req, res) => {
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteStudent);
    }catch(err){
        res.status(500).send(e);
    }
});

module.exports = router;