const express = require("express");
const {config} = require("dotenv");
const connectDB = require("./src/config/db");
config();
const CORS = require("cors");
const Task = require("./src/models/TaskModel");


const app = express();
const PORT = process.env.PORT || 8090
const MONGO_URL = process.env.MONGO_DB
app.use(express.json());
app.use(CORS());

app.get('/', (req, res) => {
    res.send("This is home route", req.ip, req.method);
})

app.post('/create', async (req, res) => {
    const {title, desc, status} = req.body;
    console.log(title, desc, status);

    try{

        const task = await Task.create({
            title,
            desc,
            status
        })

        res.send({
            messasge : "Created task",
            task
        })
    
    }catch(err) {
        res.send({messasge : err});
    }
    
})

app.get('/read', async (req, res) => {
    try{
        const tasks = await Task.find();
        res.send({
            messasge : tasks
        })
    }catch(err) {
        res.send({
            messasge : err
        })
    }
})

app.delete('/tasks/:id', async (req, res) => {
    try{
        console.log(req.params.id);
        const task = await Task.findByIdAndDelete(req.params.id);
        res.send({
            message : "Deteled task", task
        })
        
    }catch(err) {
        res.send({
            message : err
        })
    }
})

app.patch('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            message : "Update task", task
        })
    }catch(err) {
        res.send({
            message : err
        })
    }
})

app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    connectDB(MONGO_URL);
})