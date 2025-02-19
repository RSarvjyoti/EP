const inputTask = document.getElementById("inputTask");
const showList = document.getElementById("showList");
const createBtn = document.getElementById("create");


let tasks = [];

function addTask() {
    const taskValue = inputTask.value.trim();
    if(taskValue === "") {
        alert("Enter a task!");
        return;
    }
    const task = {
        id : Date.now(),
        title : taskValue,
        status : "pending"
    }
    tasks.push(task);
    inputTask.value = "";
    renderTasks();
}

function renderTasks() {
    showList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.title;

        // created edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTask(task.id);

        // created delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        showList.appendChild(li);
    })
}

function editTask(id){
    const newTask = prompt()
}

function deleteTask(id) {

}

function editTask(id) {
    const newTask = prompt("Edit your task:");
    if (newTask) {
        const taskIndex = tasks.findIndex(task => task.id === id);
        tasks[taskIndex].title = newTask;
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

createBtn.addEventListener("click", addTask);