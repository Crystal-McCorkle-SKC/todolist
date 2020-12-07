//import the mongoose module 
const mongoose = require('mongoose');
//import the mongodb string (so can access my personal db)
const mongoDB = 'mongodb+srv://crystallmccorkle:^JgHbL24895@m@todolist.3bg8d.mongodb.net/todolistdb?retryWrites=t'; 
//this is setting vars for Item and List --pulls in the files from my other .js files 
var List = require('./models/ToDo.js');
var Item = require('./models/ToDoItem.js');
//use mongoose library to connectoto mongo db 
//if worked, prints connected to db, if not gives an error 
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if(err) return console.error(err);
    console.log('Connected to database'); 
}); 

//connect to connect object, use the "on" method, if there is an error, gives you an error message 
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false, otherwise get a deprecation warning
//at top of terminal code 
mongoose.set('useFindAndModify', false);

//says to connect to the db once, then close the connection when done 
//prints we're connnected when connected 
db.once('open', function(){
    console.log("We're connected");
    
    

    //create a new item instance using the Item model 
    let item1 = new Item({
        itemName: "Do Dishes",
        itemPriority: "High",
        assignee: "Crystal",
        completed: false,
    });

    //saved the item using a callback function 
    item1.save(function(err, item){
        if (err) return console.error(err);
        console.log(item);
    }); 
    //create a list called "Crystal's List" and add the item1 
    var myList = new List ({
        name: "Crystal's List",
        items: [
            {
            item: item1._id
            }
            ],
    });

    //save the new list and add callback function to error check 
    myList.save(function(err, list){
        if (err) return console.error(err);
        console.log(list);
    });  

    //commenting this out b/c it doesn't work--rewrites the variable instead of creating new var per Willie's lecture 
    //how to add more items to the list
        //create a new item instance using the Item model 
        //add the new item 
        /*let item2 = new Item({
            itemName: "Do Laundry",
            itemPriority: "High",
            assignee: "Crystal",
            completed: false,
        });
    

         //saved the item using a callback function 
         item2.save(function(err, item){
            if (err) return console.error(err);
            console.log(item);
        }); 
        
        //add the new item to the List 
        var myList = new List ({
            name: "Crystal's List",
            items: [
                {
                item: item2._id,
                }
                ],
        });
    
        //add callback function to error check 
        myList.save(function(err, list){
            if (err) return console.error(err);
            console.log(list);
        });  */


    //START OF CRUD OPERATIONS: 
    //CREATE
    //how to add an item 
    let newItem = new Item ({
        itemName: "Rake leaves",
        itemPriority: "Low",
        assignee: "Crystal",
        completed: false,
    })
    //save the item that was just created 
    newItem.save ()
        .then(doc => {
        console.log(doc)
        })
        //if there is an error, prints err 
        .catch(err => {
        console.error(err)
    })

    //READ
    //testing to see if the below works: 
    //fetch a record that was just created (READ)
    //uses the search term Do Dishes--then prints to the terminal (using promise) or gives 
    //an error message if there is an error 
    Item.find ({
            itemName: "Do Dishes"
        })
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error.error(err)
        })

    //UPDATE 
    //this finds the given item and then UPDATEs it    
    Item.findOneAndUpdate (
            //search query
            {itemName: "Do Dishes"
            },
            //this is the field (name) and the value to update to: Scrub-a-dub those dishes!! 
            {name: "Scrub-a-dub those dishes!!"
            },
            //returns updated doc
            { new : true,
                //validates before update
              runValidators: true
            })
            //updates the record and prints 
            .then(doc => {
                console.log(doc)
            })
            //if there is an error, returns this 
            .catch(err => {
                console.error(err)
            })


        //DELETE
        //.findOneAndRemove removes the record name: "Scrub-a-dub those dishes!"
        //and returns the original document that was removed--name goes back to "Do Dishes"
        Item.findOneAndRemove ({
                name: "Scrub-a-dub those dishes!!"
            })
            //prints the response 
            .then(response => {
                console.log(response)
            })
            //if an error, print the error message
            .catch(err => {
                console.error(err)
            })


   //CREATEs a new item name called Dance Party, if there is an error, do the 
   //callback function instead
   Item.create({ itemName: "Dance Party" }, function (err, new_name) {
       if (err) return handleError(err);
   });

   //creates a new item name called CODE!, if there is an error, do 
   //the callback function instead
   Item.create({ itemName: "CODE!" }, function (err, new_name) {
    if (err) return handleError(err);
   });




});










/*
    //how to find an item
    Item.find(
        {itemName: "Do Dishes",   // search query
    })
    .then(item=> {
    console.log(item)
    })
    .catch(err => {
    console.error(err)
    })
  

    
    //how to update an item
    Item.findOneAndUpdate(
    {
        itemName :"Do Dishes",  // search query
    }, 
    {
        itemName : "Scrub-a-dub those dishes!",   // field:values to update or use 
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
    .then(item => {
        console.log(item)
    })
    .catch(err => {
        console.error(err)
    })
  


    //how to delete an item 
   Item
    .findOneAndRemove({
        itemName :"Rake Leaves",
    })
    .then(response => {
        console.log(response)
    })
    .catch(err => {
    console.error(err)
    })


//}); */

