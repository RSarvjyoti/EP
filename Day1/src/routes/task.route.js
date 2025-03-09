const {Router} = require("express");
const { getTask, createTask, updateTask, deleteTask } = require("../controllers/task.controller");

const taskRoute = Router();

taskRoute.get('/', getTask);
taskRoute.post('/', createTask);
taskRoute.patch('/:id', updateTask);
taskRoute.delete('/:id', deleteTask);

module.exports = taskRoute;