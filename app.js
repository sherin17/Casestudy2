// Task1: initiate app and run server at 3000


const express = require('express')
const mongoose = require('mongoose')
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/employee',(req,res)=>{
    res.send(data);
})


const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 

const EmployeeData = require('./model/employee')
mongoose.connect('mongodb+srv://Sherin17:Reenijiji1@cluster0.quvjjgb.mongodb.net/casestudy?retryWrites=true&w=majority')
.then(()=>{
    console.log("My mongodb is connected successfully");
})
.catch(error=>{
    console.log('Connection error'+error);
})


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',(req,res)=>{
    EmployeeData.find().then(function(data){
        res.send(data);
    })
})
    


//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id',(req,res)=>{
    try{
        EmployeeData.findById({"_id":req.params.id}).then(function(data){
            res.send(data);
            })
    }
   
    catch(error){
        console.log(error);
    } 
})




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}


app.post('/api/employeelist',async(req,res)=>{
    try{
    
        let item = req.body;
        console.log(item);
        const user = new EmployeeData(item)
        const savedUser = await user.save();
        console.log('saved data :',savedUser);
        res.send();
    }
    catch(error){
        console.log(error);
    }   
  })


//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',(req,res)=>{
    try{
        EmployeeData.remove({"_id":req.params.id}).then(function(data){
            res.send(data);
        })
    }
    
        catch(error){
            console.log(error);
        }   
    
})



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist',async(req,res)=>{

    try{

        console.log(req.body);
        await EmployeeData.findByIdAndUpdate(req.body._id, {$set:req.body})
         .then(function(data){
              res.send(data);
      })  
    }
    catch(error){
        console.log(error);
    } 
 
}) 

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000,()=>{
    console.log('server is connected')
})

