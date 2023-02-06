const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/students-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex:true
}).then (() => {
    console.log("connection is successful with DB");
}).catch((err) => {
    console.log(("No Connection..."));
});