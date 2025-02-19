const {Schema, Model, model} = require("mongoose");

const taskSchema = new Schema({
    title : {type : String, required : true},
    desc : {type :  String},
    status : {type: Boolean, default : false}
}, {timestamps : true})

const Task = model("task", taskSchema);

module.exports = Task;