let todos = [];
let currentFilter = "All";

function Add() {

    // Get input values
    const errorEl = document.getElementById("error");
    const taskText = document.getElementById("Task").value;
    const date = document.getElementById("Date").value;
    const status = document.getElementById("Status").value;

    // Validation Input
    if (taskText === "" || date === "") {
        errorEl.textContent = "Please fill all the input fields.";
        errorEl.style.display = "block";
        return;
    }

    // Create todo object
    const todo = {
        task: taskText,
        date: date,
        status: status
    };

    // Store todo in array
    todos.push(todo);

    // Clear input fields
    document.getElementById("Task").value = "";
    document.getElementById("Date").value = "";
    document.getElementById("Status").value = "Open";
    errorEl.style.display = "none";

    // Display updated task list
    DisplayTask(currentFilter);
}

function DisplayTask(filter = "All") {

    // Clear table body
    const listContainer = document.getElementById("tbody");
    listContainer.innerHTML = "";
    
    // Loop through todos
    todos.forEach((todo, index) => {

        // Skip tasks that don't match the filter
        if (filter !== "All" && todo.status !== filter) return;

        // Create table row
        const tr = document.createElement("tr");

        // Create table cells
        const taskTd = document.createElement("td");
        const dateTd = document.createElement("td");
        const statusTd = document.createElement("td");
        const btnTd = document.createElement("td");

        // Create delete button
        const deleteBtn = document.createElement("button");

        // Add text to cells
        taskTd.textContent = todo.task;
        dateTd.textContent = todo.date;
        statusTd.textContent = todo.status;

        // Delete button
        deleteBtn.textContent = "DELETE";
        deleteBtn.addEventListener("click", function () {
            todos.splice(index, 1); // Remove task from array
            DisplayTask(currentFilter); // Refresh table
        });

        // Append button to cell
        btnTd.appendChild(deleteBtn);

        // Append cells to row
        tr.appendChild(taskTd);
        tr.appendChild(dateTd);
        tr.appendChild(statusTd);
        tr.appendChild(btnTd);

        // Append row to table body
        listContainer.appendChild(tr);
    });
    
    // If no rows were rendered
if (listContainer.children.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");

    td.colSpan = 4;
    td.textContent = "No tasks found";

    tr.appendChild(td);
    listContainer.appendChild(tr);
}


   
}

function FilterStatus() {

    // Get selected filter value
    currentFilter = document.getElementById("filterBtn").value;

    // Display tasks based on filter
    DisplayTask(currentFilter);
}

DisplayTask(currentFilter);

