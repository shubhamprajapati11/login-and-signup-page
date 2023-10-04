const express = require("express")
const app = express()
const hbs = require("hbs")
const path = require("path")

const port = process.env.PORT || 3000
require("./db/mydb")
const Register = require("./db/registers")
const { escape } = require("querystring")



app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set("view engine","hbs")

app.get("/",(req,res)=>{
    res.render("home")
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/register",async (req,res)=>{
    try{
        const putregisters = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password
        })
        const registered = await putregisters.save()
        
        res.status(201).send('<script>alert("Account Created Successfully"); window.location.href = "login"; </script>')
        // res.send('<script>alert("hello")</script>')

    }catch(e){
        res.status(400).send('<script>alert("Please fill account details"); window.location.href = "register"; </script>')
    }
})

app.post("/login",async (req,res)=>{
    try{
        const username = req.body.username
        const password = req.body.password

        const useremail = await Register.findOne({username:username})
        if(useremail.password === password){
            res.status(201).render("home")
        }else{
            res.send("Invalid Credentials")
            
        }

    }catch(e){
        res.status(400).send('<script>alert("Invalid Credentials"); window.location.href = "login"; </script>')
        // res.render("login")
    }
})

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})