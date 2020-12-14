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
       throw Error(body.message);
    }
    //if(response.status === 200) {
        //we could also append it to html by doing this on line 12: document.body.append(response);  
        //return response;
       // document.body.append(response);
       // console.log("We made it!");
       return body;
}


function clickButton(){
    getToDoList().then(function(body) {
        for (let i = 0; i < body.length; i++) {
            console.log(body[i].itemName);
        }
        //turns body object into a string so can read it
        let myObjs = JSON.stringify(body);
        document.body.append(myObjs);
        console.log(body);
    }).catch(function(err) {
        console.log(err);
    });
}


