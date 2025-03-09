const Product = require("../models/product")

const createProduct = async (req, res) => {
    const {title, desc} = req.body
    try{
        const product = Product.create()
    }catch(err) {
        res.send({
            message : err
        })
    }
}

const readProduct = async (req, res) => {
    try{
        
    }catch(err) {
        res.send({
            message : err
        })
    }
}

const updateProduct = async (req, res) => {
    try{

    }catch(err) {
        res.send({
            message : err
        })
    }
}

const deleteProduct = async (req, res) => {
    try{

    }catch(err) {
        res.send({
            message : err
        })
    }
}

module.exports = {createProduct, readProduct, updateProduct, deleteProduct};