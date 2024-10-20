// need a way to store our data
let tasks = [
   
]
// DOMContentLoaded is an event that fires
// when the HTML is loaded completely
window.addEventListener("DOMContentLoaded", async function(){
   
    tasks = await loadData();

   
    // render all the tasks in the database
    renderTasks();

    // Creating Task Section
    // select the button
    document.querySelector("#createTask").addEventListener("click", function(){
        let taskName = document.querySelector("#taskName").value;
        let urgency = document.querySelector(".urgency:checked").value;

        // the addTask function is in data.js
        addTask(tasks, taskName, urgency);

        // re-render all the tasks
        renderTasks();

    });

    document.querySelector("#save-button").addEventListener("click", function(){

        saveData(tasks);
    })

})

// renderTasks is to update the ul#tasks with 
// all the tasks
function renderTasks() {

    let taskList = document.querySelector("#tasks");

    // empty the task list of all the <li> inside it
    taskList.innerHTML = ""; // remove all the children inside

    for (let t of tasks) {
        const {name, urgency} = t;
        let liElement = document.createElement("li");
        liElement.innerHTML = `
            ${name} (${urgency}) 
            <input type="checkbox" class="checkbox"/>
            <button class="edit">Edit</button> 
            <button class="delete">Delete</button>
        `

        // we can call querySelector on any DOM object. If we do so, then the querySelector
        // will only search children within the object
        let checkbox = liElement.querySelector(".checkbox");
        checkbox.checked = t.done;
        checkbox.addEventListener("click", function(){
            updateTaskDone(tasks, t.id);
            renderTasks();
        })

        // for edit
        let editButton = liElement.querySelector(".edit");
        // start the process of editing a task
        editButton.addEventListener("click", function(){
            let newTaskName = prompt("Enter the new task name: ", t.name);
            let newUrgency = prompt("Enter the new urgency: ", t.urgency);
            let newDone = prompt("Is the task done (y/n)");

            let isDone = newDone.toLowerCase() == 'y' ? true: false;
            

            updateTask(tasks, t.id, newTaskName, newUrgency, isDone);
            renderTasks(); // redraw all the tasks, along with any changes

        });

        // for delete 
        // search within the liElement's children to find the element with the class ".delete"
        let deleteButton = liElement.querySelector(".delete");
        deleteButton.addEventListener("click", function(){
            let reallyDelete = confirm("Are you sure you want to delete?");
            if (reallyDelete) {
                deleteTask(tasks, t.id);
                renderTasks();
            }
        })

        taskList.appendChild(liElement);
    }
}