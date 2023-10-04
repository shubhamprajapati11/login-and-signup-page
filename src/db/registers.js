const mongoose = require("mongoose")
const myschema = new mongoose.Schema({
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
    },
    username: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    }
})

const Register = new mongoose.model("Register",myschema)
module.exports = Register