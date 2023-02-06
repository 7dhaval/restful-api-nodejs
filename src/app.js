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
app.post("/students", (req, res) => {

    console.log(req.body);
    const user = new Student(req.body); //this will create post request to console
    //this store data in user varible and save it to the database using try and catch
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });

    // res.send("Hello From Other Side.");
});

app.listen(port, () => {
    console.log(`Server Started at ${port}`);
});