const output = document.querySelector("#output");
const button = document.querySelector("#get-tasks-btn");
const form = document.querySelector("#add-task-form");

// Update task
async function updateTask(taskId) {
  const newTitle = prompt("Enter new title for the task:");
  if (!newTitle) return; // Exit if the user cancels

  try {
    const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    });

    if (!res.ok) {
      throw new Error("Failed to update task.");
    }

    showTasks(); // Refresh the list of tasks
  } catch (error) {
    console.log("Error updating task.");
  }
}

// Delete task
async function deleteTask(taskId) {
  if (!confirm("Are you sure you want to delete this task?")) return; // Confirmation

  try {
    const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete task.");
    }

    showTasks(); // Refresh the list of tasks
  } catch (error) {
    console.log("Error deleting task.");
  }
}

// Get and show tasks
async function showTasks() {
  try {
    const res = await fetch("http://localhost:5000/api/tasks");
    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const tasks = await res.json();
    output.innerHTML = "";

    tasks.forEach((task) => {
      const element = document.createElement("div");
      const delBtn = document.createElement("button");
      const editBtn = document.createElement("button");
      element.textContent = task.title;

      // Create edit button
      editBtn.textContent = "Edit";
      editBtn.onclick = () => updateTask(task.id);

      // Create delete button
      delBtn.textContent = "Delete";
      delBtn.onclick = () => deleteTask(task.id);

      // Append children
      output.appendChild(element);
      output.appendChild(editBtn);
      output.appendChild(delBtn);
    });
  } catch (error) {
    console.log("Error fetching tasks.");
  }
}

// Submit/add new task
async function addTask(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const title = formData.get("title");

  try {
    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      throw new Error("Failed to add task.");
    }

    const newTask = await res.json();
    console.log(newTask);

    const element = document.createElement("div");
    const delBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    element.textContent = task.title;

    // Create edit button
    editBtn.textContent = "Edit";
    editBtn.onclick = () => updateTask(task.id);

    // Create delete button
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteTask(task.id);

    // Append children
    output.appendChild(element);
    output.appendChild(editBtn);
    output.appendChild(delBtn);
    output.appendChild(element);
    showTasks();
  } catch (error) {
    console.log("Error adding task.");
  }
}

// Event handlers
button.addEventListener("click", showTasks);
form.addEventListener("submit", addTask);
