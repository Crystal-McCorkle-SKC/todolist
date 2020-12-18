//this is the old clickButton function 
// function clickButton(){
//     getToDoList().then(function(body) {
//         for (let i = 0; i < body.length; i++) {
//             append <a href ="edit.html?" +body[i]._id>
//             console.log(body[i].itemName);
//         }
//         //turns body object into a string so can read it
//         let myObjs = JSON.stringify(body);
//         document.body.append(myObjs);
//         console.log(body);
//     }).catch(function(err) {
//         console.log(err);
//     });
// }

function clickButton() {
      //get all the messages 
      getToDoList().then(function(items){
        //to TROUBLESHOOT-- console.log(messages); --it prints to the server the messages 
        //[{name: "", message: ""}]
        //message list is the div the messages go in
        let itemsList = document.getElementById("newItems");
       
        
        items.forEach(function(item){
            //create the html elements 
            let div = document.createElement("div");
            //need to figure out how to get spaces in between each thing (I modified in mongodb and added spaces there)
            div.innerHTML = item.itemName + item.itemPriority + item.assignee + item.completed;
            itemsList.appendChild(div);
            //itemsList.innerHTML += `<a class="edit"> href ="edit.html?" +body[i]._id>`; //not working properly
        //})
    // }).catch(function(error){
    //         console.log(error);
        })
    //send the message
    postItem().then(function(retVal){
        console.log("We sent a message");
    }).catch(function(error){
        console.log(error);
    });
    // addItem().then(function(retVal){
    //     console.log("You've entered some data! YAYYY!");
    // }).catch(function(error){
    //     console.log(error);
    // })
});





async function getToDoList() {
    let requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    }

    //fetch calls the api 
    const response = await fetch("/items", requestOptions);
    //json traverses the response object and returns the body 
    const body = await response.json();
    //if the http status is good, return the body (the api)
    if (response.status != 200) {
       throw Error(body.item);
    }
       return body;
       //return Promise.body;
}





async function postItem() {
    let data = {
        itemName : document.getElementById("inputTask").value,
        itemPriority : document.getElementById("priorityStatus").value,
        assignee : document.getElementById("inputAssignee").value,
        completed : document.getElementById("completed").value,
    }

    let requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    }

    //fetch calls the api 
    
    const response = await fetch("/items", requestOptions);
    //const body = await response.JSON();
  
    //json traverses the response object and returns the body 
    // const body = await response.json();
    //if the http status is good, return the body (the api)
    if (response.status != 200) {
       //throw Error(body.item);
       throw Error("Error!");
    }
       return true;
    }
        
} 


//this isn't working yet to ADD AN ITEM TO THE TODO LIST! 
// async function addItem(){
//     let priorityStatus = document.getElementById("priorityStatus");
//     let completedStatus = document.getElementById("completed");
//     let item = {
//         itemName : document.getElementById("inputTask").value,
//         //itemPriority : priorityStatus.options[priorityStatus.selectedIndex].value,
//         //not sure hwo itemPriority should look since it has three different options
//         itemPriority : priorityStatus.options.value,
//         assignee : document.getElementById("inputAssignee").value,
//         //also not sure how completed status should look since it's boolean 
//         completed : completedStatus.options[completedStatus.selectedIndex].value
//         }

//     let requestOptions = {
//         method: "POST",
//         body: JSON.stringify(item),
//         headers: {"Content-Type": "application/json"}
//     }

//     const response = await fetch("/items", requestOptions);
//     if (response.status != 200){
//         throw Error("Item not saved!");
//     }
//     return true;
// }





