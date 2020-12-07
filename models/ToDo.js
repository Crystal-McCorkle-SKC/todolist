//create an interface to the mongoose module 
//defining a mongoose const and using the require function--saying include this module (a node version of a js library) called mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*Schema*/
const listSchema = new Schema({
    name : String,
    //we are referencing the exported item that is in ToDoItem.js 
    items : [
        {//use the reference "Item" from ToDoItem model "Item"
        item: {type: Schema.Types.ObjectId, ref: "Item"},
        } 
    ],
});

//adding this module to our exports method--allows us to import to other files 
module.exports = mongoose.model("List", listSchema);


