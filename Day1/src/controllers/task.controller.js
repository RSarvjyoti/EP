const Task = require("../models/TaskModel");

const createTask = async (req, res) => {
    const {title, desc, status} = req.body;
    console.log(title, desc, status);
    try{
        const task = await Task.create({
            title,
            desc,
            status
        })
        res.status(201).send({
            messasge : "Created task",
            task
        })
    }catch(err) {
        res.status(500).send({messasge : err});
    }
}

const getTask = async (req, res) => {
    try{
        const tasks = await Task.find();
        res.status(200).send({
            messasge : tasks
        })
    }catch(err) {
        res.status(500).send({
            messasge : err
        })
    }
}

const deleteTask = async (req, res) => {
    try{
        console.log(req.params.id);
        const task = await Task.findByIdAndDelete(req.params.id);
        res.status(200).send({
            message : "Deteled task", task
        })
        
    }catch(err) {
        res.status(500).send({
            message : err
        })
    }
}

const updateTask = async (req, res) => {
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({
            message : "Update task", task
        })
    }catch(err) {
        res.status(500).send({
            message : err
        })
    }
}

module.exports = {createTask, getTask, updateTask, deleteTask};