const Joi = require("joi")

function Register(body){
    this.name = body.name
    this.email = body.email
    this.username = body.username
    this.password = body.password
    this.repeatpassword = body.repeatpassword
    this.hp = body.hp
}

Register.prototype.validateRegiser = function (register) {

    const scheme = {
        name: Joi.string().min(2).max(200).required(),
        email: Joi.string().min(2).max(200).required().email(),
        username: Joi.string().min(2).max(200).required(),
        password: Joi.string().min(2).max(1000).required(),
        repeatpassword: Joi.ref('password'),
        hp: Joi.string().min(2).max(200).required(),
    };

    return Joi.validate(register, scheme)
};

module.exports = Register