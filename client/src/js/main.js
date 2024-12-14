const output = document.querySelector("#output");
const button = document.querySelector("#get-tasks-btn");
const inputBox = document.querySelector("#add-task-field");
const form = document.querySelector("#form");

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
    console.log(error.message);
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
      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.checked = task.completed;
      element.textContent = task.title;
      const taskId = task._id;

      // Create edit button
      editBtn.textContent = "Edit";
      editBtn.onclick = () => updateTask(taskId);

      // Create delete button
      delBtn.textContent = "Delete";
      delBtn.onclick = () => deleteTask(taskId);

      // Checkbox functionality
      checkBox.onchange = async (e) => {
        const currentStatus = e.target.checked;
        await toggleTaskCompletion(taskId, currentStatus);
      };

      // Append children
      output.appendChild(element);
      element.appendChild(checkBox);
      element.appendChild(editBtn);
      element.appendChild(delBtn);
    });
  } catch (error) {
    console.log(error.message);
  }
}

// Submit/add new task
async function addTask(e) {
  e.preventDefault();
  const title = inputBox.value;
  const completed = false;

  try {
    if (!title) {
      alert("You must add a title!");
      return;
    } else {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, completed }),
      });

      if (!res.ok) {
        throw new Error("Failed to add task.");
      }

      const newTask = await res.json();
      showTasks();
    }

    inputBox.value = "";
  } catch (error) {
    console.log(error);
  }
}

async function toggleTaskCompletion(taskId, currentStatus) {
  // Toggle the completed status
  const newStatus = !currentStatus;

  try {
    const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: newStatus }),
    });

    console.log(newStatus);

    if (!res.ok) {
      const errorMessage = await res.text(); // Get the error message from the response
      throw new Error(`Failed to update task: ${errorMessage}`);
    }

    showTasks(); // Refresh the list of tasks
  } catch (error) {
    console.error("Error updating task completion:", error);
  }
}

// Event handlers
button.addEventListener("click", showTasks);
form.addEventListener("submit", addTask);
