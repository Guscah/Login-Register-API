const express = require("express");
const bcrypt = require('bcryptjs');
const router = express.Router();
var Register = require("../model/Register");
var Login = require("../model/Login");
const AppDatabaseManager = require("../manager/appDatabaseManager");
const appDatabaseManager = new AppDatabaseManager();

router.post("/register", async (req, res) => {
    try {
        var register = new Register(req.body)
        const { error } = register.validateRegiser(register);
    
        if(error) 
            return res.status(400).send({message: error.details[0].message});
    
        let userCheck = await appDatabaseManager.fetchUserByEmail(register.username);
    
        if(userCheck.length != 0) 
            return res.status(400).send({message:"User already registered"});
    
        const salt = await bcrypt.genSalt(1);
        register.password = await bcrypt.hash(register.password, salt);
        
        let user = await appDatabaseManager.doRegister(register);

        res.status(200).send("Register Success");
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        var login = new Login(req.body)
       // console.log(login);

        const userInfo = await appDatabaseManager.fetchUserByEmail(login.username);
        if(userInfo.length == 0) 
            return res.status(401).send({message: "Invalid username or password"});
        
        const validPassword = bcrypt.compareSync(login.password, userInfo[0].password);
        console.log(validPassword);
        if(!validPassword) 
            return res.status(402).send({message: "Invalid username or password"});
        
        res.status(200).send({ token: login.generateAuthToken(login) });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router; 