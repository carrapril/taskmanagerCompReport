var nonImportantClass = "far fa-star";
var ImportantClass = "fas fa-star";
var isImportant = false;
var hideShowForm = true;



function toggleImportant(){
    console.log("icon clicked!");
    if(isImportant){
        //non important
        isImportant = false;
        $("#iconImportant").removeClass(ImportantClass);
        $("#iconImportant").addClass(nonImportantClass);
       
    }
    else{
        //important
        $("#iconImportant").removeClass(nonImportantClass);
        $("#iconImportant").addClass(ImportantClass);
        isImportant = true;
    }   
}

function hideForm(){
    console.log("form button clicked");
    if(hideShowForm){
        hideShowForm = false;
        $("#form").hide();

    }
    else{
        hideShowForm = true;
        $("#form").show();
    }
}
function saveTask(){
    console.log("Information Stored");

    //get data

    let title = $("#txtTitle").val();
    let description = $("#txtDescription").val();
    let contact = $("#txtContact").val();
    let location = $("#txtLocation").val();
    let color = $("#selColor").val("#000000");
    let duedate = $("#selDate").val();

    //validate first 
    

    if(title.length < 5){

        alert("Title should be at least 5 chars long");
        return;
    
    }
    if(!duedate){
        alert("Due Date is required");
        return;
    }

        

    let task = new Task(title, description,isImportant, contact, location, color, duedate);
    let dataStr = JSON.stringify(task);
    console.log(task);
    console.log(dataStr);
    
    

    // save the task
    $.ajax({
        type: "POST",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        data: dataStr,
        contentType: "application/json",

        success: function(data){
            console.log("Saved results", data);
            let savedTask = JSON.parse(data);

            //display
            displayTask(saveTask);

        },
        error: function(error){
            console.log("save failed", error);
        }
    });

    //clear the form 
    clearForm();


}
function clearForm(){
    $("#txtTitle").val("");
    $("#txtDescription").val("");
    $("#txtContact").val("");
    $("#txtLocation").val("");
    $("#selColor").val("#000000");
    $("#selDate").val("");
}

function displayTask(task){
    // create the syntax
    let syntax =`<div id="${task._id}" class="task myList">

        <ul>
        <div id="myDiv" class="headerList"><h4>${task.title}</h4></div>
        <li>Description: ${task.description}</li>
        <li> Due Date: ${task.duedate}</li>
        <li> Location: <label>${task.location}</label></li>
        <li> Contact: <label>${task.contact}</label></li>
        <li><button onclick="deleteTask('${task._id}')" class="btn btn-sm btn-danger">Remove</button>
        </li> 
        </ul>   
    </div>`;

    //append the syntax to an element on the screen
    $("#tasks-list").append(syntax);
}

function deleteTask(id){
    console.log("deleting task", id);
    $("#" + id).remove();
}

// delete https://fsdiapi.azurewebsites.net/api/tasks/clear/<name>

//click event to call a function (clearTask)


//create function
function clearTasks(){
    $.ajax({
        type: "Delete",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/AprilC",
    success: () => {
        console.log("Data cleared");
        $("#task-list").html(""); // clear the contents of the div
        
    },
    error: (details) => {
        console.log("Clear failed", details);
    }
});

}

//send and ajax delete request to clear the data 



function retrieveTasks(){
    $.ajax({
        type: "get",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",

        success: (data) => {
            let list = JSON.parse(data); //from string to object/array 
            // for loop and print every task
            for (let i = 0; i < list.length; i++) {
                let task = list[i];

                //check if the task is yours
                //if so, 
                if (task.name === "AprilC") {
                    displayTask(task);
                  } 

              }

        },
        error: (error) => {
            console.log("retrieve failed", error);
        }
    });
    
}

function init() {

    //events
    $("#iconImportant").click(toggleImportant);{
        
    }
    $("#hideshow").click(hideForm);{

    }
    $("#savbtn").click(saveTask);{

    }

    $("#deleteAll").click(clearTasks);{

    }

    //load data
    retrieveTasks();

}

window.onload = init;