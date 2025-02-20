const express = require("express");
const {config} = require("dotenv");
const connectDB = require("./src/config/db");
config();
const CORS = require("cors");
const Task = require("./src/models/TaskModel");
const User = require("./src/models/user.model");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 8090
const MONGO_URL = process.env.MONGO_DB
const JWT_SECRET = process.env.JWT_SECRET

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
});

// ========== register route ===========
app.post('/register',async (req, res) => {
    const {username, email, password} = req.body;
    try{
        const users = User.findOne({email});
        if(users) {
            res.status(400).send({
                message : "User already register try to login"
            })
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password : hashpassword
        })

        res.status(200).send({
            message : "User Created",
            user
        })
    }catch(err) {
        res.status(500).send({
            message : err
        })
    }
})


// ======== Login route ========
app.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});

        if(!user) {
            res.status(400).send({
                message : "User not register, please register first"
            })
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match) {
            res.status(400).send({
                message : "Invailid cradencial"
            })
        }

        var token = jwt.sign({ userId: user._id, email: user.email  }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).send({ message: "Login successful", token });

    }catch(err) {
        res.status(500).send({
            message : err
        })
    }
})

app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    connectDB(MONGO_URL);
})