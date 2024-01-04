document.addEventListener("DOMContentLoaded", function () {
    // Load tasks from local storage on page load
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        // Create a new task
        const newTask = document.createElement("li");
        newTask.innerHTML = `<span>${taskInput.value}</span>
                             <button onclick="editTask(this)">Edit</button>
                             <button onclick="deleteTask(this)">Delete</button>
                             <button onclick="toggleCompleted(this)">Mark</button>`;

        // Append the new task to the task list
        taskList.appendChild(newTask);

        // Save tasks to local storage
        saveTasks();

        // Clear the input field
        taskInput.value = "";
    }
}

function editTask(button) {
    const taskText = button.parentNode.querySelector("span");
    const newText = prompt("Edit task:", taskText.textContent);

    if (newText !== null) {
        taskText.textContent = newText;
        // Save tasks to local storage after editing
        saveTasks();
    }
}

function deleteTask(button) {
    const taskList = document.getElementById("taskList");
    const taskItem = button.parentNode;

    // Remove the task from the task list
    taskList.removeChild(taskItem);

    // Save tasks to local storage after deletion
    saveTasks();
}

function toggleCompleted(button) {
    const taskText = button.parentNode.querySelector("span");
    taskText.classList.toggle("completed");

    // Save tasks to local storage after marking as completed/uncompleted
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById("taskList").innerHTML;
    localStorage.setItem("tasks", taskList);
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        taskList.innerHTML = savedTasks;
    }
}