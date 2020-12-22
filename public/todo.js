document.getElementById("addItem").addEventListener("click", function(event){
    addItem();
});




function deleteItem(id){
    deleteItemRequest(id).then(function(success){
        alert("DELETED!");
    }).catch(function(error){
        console.log(error);
    });
}


async function deleteItemRequest(id) {
   
    let data = {
        _id: id
    }

    let requestOptions = {
        method: "DELETE",
        //this body is the body of the request, has to take an object/data
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    }

    //fetch calls the api 
    const response = await fetch("/items", requestOptions);

    return false;
}

function addItem() {
    postItem().then(function(result){
    }).catch(function(error){
        console.log(error);
    })
}

//sending/creating data
async function postItem() {
   
    let dropdown = document.getElementById("itemPriority");
    let selection = dropdown.options[dropdown.selectedIndex].value;


    let data = {
        itemName : document.getElementById("itemName").value,
        itemPriority : selection,
        assignee : document.getElementById("assignee").value,
        completed : false,
    //might want to put in the timestamp here too?? 
    }

    let requestOptions = {
        method: "POST",
        //this body is the body of the request, has to take an object/data
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    }

    //fetch calls the api 
    const response = await fetch("/items", requestOptions);

    return false;
}


async function getToDoList() {
    let requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    }

    //fetch calls the api 
    const response = await fetch("/items", requestOptions);
    //json traverses the response object and returns the body 
    //body is the data that was returned (the list of items)
    const body = await response.json();
    //if the http status is good, return the body (the api)
    if (response.status != 200) {
       throw Error(body.message);
    }
       return body;
}


//this is the clickButton function 
function clickButton(){
    getToDoList().then(function(body) {
        let list = document.getElementById("list");
        let myHtml = "<ul>";
        for (let i = 0; i < body.length; i++) {
            //above loops over items, and then can do stuff to items here
            //PUT CARDS OR SOME KIND OF TABLE HERE TO FORMAT EVERYTHING SO IT LOOKS PRETTY! <p> tags/h1 tags, etc 
            //can also add class on all of them and then put that in css file to stylize this text!
            //probably could add in my font awesome icons here too!  
            //try this instead of button w/ a class name instead of id <a id=""><i>fontaesomestuffhere</i></a>
            myHtml += `
                    <li class="listItems"> ${body[i].itemName}    ${body[i].assignee}    ${body[i].itemPriority}    ${body[i].completed} </li>
                    <button data-id=${body[i]._id} class="delete button">Delete</button>   
                    <a href="edit.html?${body[i]._id}"><button id="edit" class="button">Edit</button></a>
                    
                    
            `;
        }
        myHtml += "</ul>";
        list.innerHTML = myHtml;

        //get all elements and then loop over them all to add event listener
        let deleteButtons = document.getElementsByClassName("delete");
        for (let i = 0; i < deleteButtons.length; i++){
            deleteButtons[i].addEventListener("click", function(event){
            deleteItem(event.target.dataset.id);
            });
        }

        //edit--just trying 
        // let editButton = document.getElementById("edit");
        // for (let i = 0; i < editButton.length; i++){
        //     editButton[i].addEventListener("click", function(event){
        //     editItem(event.target.dataset.id);
        //     });
        // }
        
    }).catch(function(err) {
        console.log(err);
    });
}




// async function postItem() {
//     let data = {
//         itemName : document.getElementById("inputTask").value,
//         itemPriority : document.getElementById("priorityStatus").value,
//         assignee : document.getElementById("inputAssignee").value,
//         completed : document.getElementById("completed").value,
//     }

//     let requestOptions = {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {"Content-Type": "application/json"}
//     }

    //fetch calls the api 
    
    // const response = await fetch("/items", requestOptions);
    //const body = await response.JSON();
  
    //json traverses the response object and returns the body 
    // const body = await response.json();
    //if the http status is good, return the body (the api)
    // if (response.status != 200) {
       //throw Error(body.item);
//        throw Error("Error!");
//     }
//        return true;
//     }
        
// } 


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














//this is in my edit.js file, putting here to see if it works here 
           