const {Schema, model} = require("mongoose");

const productSchema = new Schema({
    title : {type : String, required : true},
    desc : {type : String}
}, {
    timestamps : true
})

const Product = model("user", productSchema);

module.exports = Product;