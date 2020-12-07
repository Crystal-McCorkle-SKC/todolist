//create an interface to the mongoose module 
const mongoose = require('mongoose');

//put the mongoose.Schema class into a variable for easier reading 
const Schema = mongoose.Schema;

//create an item Schema
const itemSchema = new Schema({
    itemName : String,
    itemPriority : {type: String, enum: ["High", "Medium", "Low"]},
    assignee : String,
    completed : Boolean,
    },
    {
    timestamps : true  //use options to update time stamps 
    }
);

//adding this module to our exports method--allows us to import to other files 
module.exports = mongoose.model("Item", itemSchema);