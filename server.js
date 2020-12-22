//import the mongoose module 
const mongoose = require("mongoose");

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false, otherwise get a deprecation warning
//at top of terminal code 
mongoose.set("useFindAndModify", false);

//this is setting vars for Item and List --pulls in the files from my other .js files 
const List = require("./models/ToDo.js");
const Item = require("./models/ToDoItem.js");
//body parser
const bodyParser = require("body-parser");

//this loads in the express module 
const express = require("express");
//this lets us register the routes and use it in the application 
//const router = express.Router(); 
//this loads in the path module (works w/ file/directory methods/paths to make things easier)
const path = require("path");

//this creates a new express application 
const app = express();

//declare the port we want to connect to 
const port = 3000;

//import the mongodb string (so can access my personal db)
const mongoDB = "mongodb+srv://crystallmccorkle:^JgHbL24895@m@todolist.3bg8d.mongodb.net/todolistdb?retryWrites=t"; 

//use mongoose library to connectoto mongo db 
//if worked, prints connected to db, if not gives an error 
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if(err) return console.error(err);
    console.log("Connected to database"); 
}); 


//allows us to acces the embedded js 
app.set("view engine", "ejs");

//connect to connect object, use the "on" method, if there is an error, gives you an error message 
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


//use says: use the following middleware, which is express.static
//express.static: is middleware for delivering static files like html, css, js, img, etc.
//static defaults to delivering index.html as the default root 
//path.join: takes care of relative paths 
app.use(express.static(path.join(__dirname, "public")));

//more middleware to handle the request processing
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//opening up our server to listen on a specific ip address and port
//ip addresses are also known as hostnames 
app.listen(port, function(){
    console.log("The server is running at port " + port);
});



//API LIVES HERE!! AKA REST API! YAYYYYYY!
//gets full list  
app.get("/items", function(request, response){
    /*get data*/ 
    Item.find(function(err, items){
            if (err) return console.error(err);
            response.send(items); 
    });    
}); 



//POST--creates data 
app.post("/items", function(request, response){
    let newData = new Item(request.body); 
    newData.save(function(error,item){
        if(error) { console.log(error); 
            response.sendStatus(500);     
        }
        console.log("Success, item added!"); 
        response.sendStatus(200); 
    }); 

});

//DELETE --deletes data 
app.delete("/items", function(request, response){
    /*delete data*/ 
    Item.deleteOne(request.body, function(err){
            if (err) {console.log(err); return; }
            response.sendStatus(204); 
    });    
}); 


//EDIT items
app.put("/items", function(request, response){
    /*update data*/ 
    Item.findOneAndUpdate(request.body, function(err){
            if (err) {console.log(err); return; }
            response.sendStatus(200); 
    });    
}); 























// app
//     //.route("/edit/:id")
//     .get("/items",function(req, res) {
//     const id = req.params.id;
//     Item.find({}, (err, tasks) => {
//     res.render("edit.html", { itemName: name });
//     });
//     })
//     .post((req, res) => {
//     const id = req.params.id;
//     Item.findByIdAndUpdate(id, { content: req.body.content }, err => {
//     if (err) return res.send(500, err);
//     res.redirect("/");
//     });
// });









// GET METHOD-gets items 
// app.get("/items", (req, res) => {
//     Item.find({}, (err, tasks) => {
//     res.render("index.html", { itemName: item });
//     });
// });



//POST 
// app.post("/items",async (req, res) => {
//     const item = new Item({
//     content: req.body.content
//     });
//     try {
//     await item.save();
//     res.redirect("/");
//     } catch (err) {
//     res.redirect("/");
//     }
//     });


//receive messages at 127.0.0.1:3000/items   post=creates data 
// app.post("/items", function(request,response){
//     let item = new Item(request.body.content); 
//     item.save(function(error, item){
//         if(error){ 
//             response.sendStatus(500); 
//             return console.error(error); 
//         };  
//         //response.sendStatus(200).send(item);
//         response.sendStatus(200);
//     })
// }); 


//PUT--update data 
// app.put("/items", function(request,response){
//     let item = new Item(request.body.content); 
//     item.save(function(error, item){
//         if(error){ 
//             response.sendStatus(500); 
//             return console.error(error); 
//         };  
//         //response.sendStatus(200).send(item);
//         response.sendStatus(200);
//     })
// }); 


//trying
// app.route("/edit/:id")
//     .get((req, res) => {
//     const id = req.params.id;
//     Item.find({}, (err, tasks) => {
//     res.render("edit.html", { itemName: name });
//     });
// })
//     .post((req, res) => {
//     const id = req.params.id;
//     Item.findByIdAndUpdate(id, { content: req.body.content }, err => {
//     if (err) return res.send(500, err);
//     res.redirect("/");
//     });
// });

//create item--do i even need this??? it's the same as above! 
// app.post("/items", function (request, response){
//     let item = new Item(request.body.content);
//     item.save(function(error, item) {
//         if (error){
//             response.sendStatus(500);
//             return console.error(err);
//         };
//         response.sendStatus(200);
//     })
// });


//UPDATE 
// app
// .route("/edit/:id")
// .get((req, res) => {
// const id = req.params.id;
// Item.find({}, (err, items) => {
// res.render("todoEdit.ejs", { itemName: item });
// });
// })
// .post((req, res) => {
// const id = req.params.id;
// Item.findByIdAndUpdate(id, { content: req.body.content }, err => {
// if (err) return res.send(500, err);
// res.redirect("/");
// });
// });


//HOMEWORK!! figure out how to retrieve a specific item from the list 
//google how to get data into the request 
//try returning some html (after line 46 above)
// app.get("/item1", function(request, response) {  ///hmmmmm this isn't working though
//     //Item is the model, findById is the method 
//     Item.findById(item1._id, function(err, item) {
//         console.log(item1);
//     });
// });

// //another find ex--this works! 
// app.get("/high", function (request, response) {
//     Item.find({
//         itemPriority: "High" //traverse through list and find an item by priority 
//     },
//     //after you found what looking for, do this
//     function (err, items) {
//         if (err) return console.error(err);
//         response.send(items);
//     });
// });

/* Jeff */ 
///127.0.0.1:3000/medium 
// app.get('/medium', function (request, response) {
//     let myVal = Item.find({
//         itemPriority: "Medium" // traverse through list and find an item by priority
//     },
    
//     function (error, anArrayOfMediumPriorityItems) {
//         if (error) return console.error(error);
//         response.send(anArrayOfMediumPriorityItems);
//     });

// });

/*ryan */ 
//http://127.0.0.1:3000/tasks/5fc90ebc5a6168f0f3f89458
// app.get('/tasks/:id', (request, response) => {
//     let myQuery = Item.findOne({ _id: request.params.id }); 

//     //do other stuff 
//     myQuery.exec((err, item) => {
//         if (err) return console.error(err);
//         response.send(item);
//     });

// });


//create an item--app.post --this is not working atm 
// app.post("/item", function(request, response) {
//     //use the request data to create a new item
//     //and add it to my database 
//     let item1 = new Item({
//         itemName: "Do Dishes",
//         itemPriority: "High",
//         assignee: "Crystal",
//         completed: false,
//     });
// });





//says to connect to the db once, then close the connection when done 
//prints we're connnected when connected 
//commenting this out now per Willie
//db.once('open', function(){
    //console.log("We're connected");
    
    

    //create a new item instance using the Item model 
    // let item1 = new Item({
    //     itemName: "Do Dishes",
    //     itemPriority: "High",
    //     assignee: "Crystal",
    //     completed: false,
    // });

    // //saved the item using a callback function 
    // item1.save(function(err, item){
    //     if (err) return console.error(err);
    //     console.log(item);
    // }); 
    // //create a list called "Crystal's List" and add the item1 
    // var myList = new List ({
    //     name: "Crystal's List",
    //     items: [
    //         {
    //         item: item1._id
    //         }
    //         ],
    // });

    // //save the new list and add callback function to error check 
    // myList.save(function(err, list){
    //     if (err) return console.error(err);
    //     console.log(list);
    // });  

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
//     let newItem = new Item ({
//         itemName: "Rake leaves",
//         itemPriority: "Low",
//         assignee: "Crystal",
//         completed: false,
//     })
//     //save the item that was just created 
//     newItem.save ()
//         .then(doc => {
//         console.log(doc)
//         })
//         //if there is an error, prints err 
//         .catch(err => {
//         console.error(err)
//     })

//     //create new list w/ our item 
//     //but don't really need this list schema 
//     var myList = new List ({
//         name: "Crystal's List",
//         items: [
//             {
//             item: item1._id
//             },
//             {
//             item: newItem._id
//             }
//             ],
//     });

//     //READ (FIND)
//     //testing to see if the below works: 
//     //fetch a record that was just created (READ)
//     //uses the search term Do Dishes--then prints to the terminal (using promise) or gives 
//     //an error message if there is an error 
//     Item.find ({
//             itemName: "Do Dishes"
//         })
//         .then(doc => {
//             console.log(doc)
//         })
//         .catch(err => {
//             console.error.error(err)
//         })

//     //findbyid (find an item in the item schema)
//     //returns item1 by its id
//     Item.findById(item1._id, function(err, item) {
//         console.log(item1);
//     });

//     //finding an item from a list
//     List.find({item: item1._id}, function(err, items) {
//         console.log(items); //what will be inside this object? answer: it will print this--- [{item: ItemId("0werituqwieuew09u09")}]
//     });

//     //UPDATE 
//     //this finds the given item and then UPDATEs it    
//     Item.findOneAndUpdate (
//             //search query
//             {itemName: "Do Dishes"
//             },
//             //this is the field (name) and the value to update to: Scrub-a-dub those dishes!! 
//             {itemName: "Scrub-a-dub those dishes!!"
//             },
//             //returns updated doc
//             { new : true,
//                 //validates before update
//               runValidators: true
//             })
//             //updates the record and prints 
//             .then(doc => {
//                 console.log(doc)
//             })
//             //if there is an error, returns this 
//             .catch(err => {
//                 console.error(err)
//             });


//         //DELETE---NOTE, SHOULD USE findOneAndDelete per the docs!! 
//         //.findOneAndRemove removes the record name: "Scrub-a-dub those dishes!"
//         //and returns the original document that was removed--name goes back to "Do Dishes"
//         Item.findOneAndRemove ({
//                 itemName: "Scrub-a-dub those dishes!!"
//             })
//             //prints the response 
//             .then(response => {
//                 console.log(response)
//             })
//             //if an error, print the error message
//             .catch(err => {
//                 console.error(err)
//             })

//     //findOneAndDelete
//     Item.findOneAndDelete({itemId: item1._id}, function(err, item) {
//         console.log("deleted: ");
//         console.log(item);
//     });

//    //CREATEs a new item name called Dance Party, if there is an error, do the 
//    //callback function instead
//    Item.create({ itemName: "Dance Party" }, function (err, new_name) {
//        if (err) return handleError(err);
//    });

//    //creates a new item name called CODE!, if there is an error, do 
//    //the callback function instead
//    Item.create({ itemName: "CODE!" }, function (err, new_name) {
//     if (err) return handleError(err);
//    });















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
    })*/ 




