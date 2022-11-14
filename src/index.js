const bodyParser=require('body-parser')
const {default:mongoose}=require('mongoose')
const route=require("./route/route.js")
const express=require('express')
const app=express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://myproject:tIsWH51HYBM3G6nV@cluster0.vvyvqcg.mongodb.net/Blogging-Project',{
    useNewUrlparser:true
})

.then(()=>console.log("Hey Prahlad mongoose Is connected"))
.catch(err=>console.log(err))

app.use(route)

app.listen(3000,()=>{
    console.log("Server is connected At PORT no. 3000")
})
