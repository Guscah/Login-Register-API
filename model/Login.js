const Joi = require("joi");
const jwt = require("jsonwebtoken");



function Login(body) {
    this.username = body.username;
    this.password = body.password;
}

Login.prototype.validateLogin = function(login) {
    const scheme = {
        username: Joi.string().min(2).max(200).require(),
        password: Joi.string().min(2).max(200).require(),
    };

    return Joi.validate(login, scheme)
};

Login.prototype.generateAuthToken = function(login){
    const token = jwt.sign({
        _id: login.id,
        _username: login.username
    }, "1234", 
    {
        expiresIn: "1h"
    }
  );
  return token;
};

module.exports = Login