const express = require('express');
const mongoose = require("mongoose");//de tuong tac voi MongoDB
const bodyparser = require("body-parser");//de parse body của cac request den server
const app = express();
const PORT = 3000;

app.use(bodyparser.json());// tra ve mot function va khi function do duoc dung lam doi so cho app.use 
app.use(bodyparser.urlencoded({ extended: true }));

//conectdb
mongoose.connect('mongodb://localhost:27017/vdf')
const UserModel = mongoose.model("user", {
    Email: String,
    Password: String
});

// create new user 
app.post("/user", async (request, response) => {
    try {
        var user = new UserModel(request.body);
        var result = await user.save();   // viec tao user ton tg nen can su dung co che xu ly bat dong bo
        Message = 'Create success'  ;       
        response.send(Message);  //tra ke qua ve cho client
    } catch (error) {
        response.status(500).send(error);
    }
});


//get list user 
app.get("/user", async (request, response) => {
    try {
        var result = await UserModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

//get an user
app.get("/user/:id", async (request, response) => {
    try {
        var user = await UserModel.findById(request.params.id).exec();
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

//edit user 
app.put("/user/:id", async (request, response) => {
    try {
        var user = await UserModel.findById(request.params.id).exec();
        user.set(request.body);
        var result = await user.save();
       
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

// delete an user
app.delete("/user/:id", async (request, response) => {
    try {
        var result = await UserModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

// Define REST API  
app.post("/user", async (request, response) => {});     // creae new user
app.get("/user", async (request, response) => {});      // get list user
app.get("/user/:id", async (request, response) => {});  //get info an user
app.put("/user/:id", async (request, response) => {});  //update info an user
app.delete("/user/:id", async (request, response) => {});// delete an user


app.listen(PORT,() => {console.log("Server started on http://localhost:"+PORT)})

module.exports = app;