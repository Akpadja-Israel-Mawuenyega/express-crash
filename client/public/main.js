const output = document.querySelector("#output");
const button = document.querySelector("#get-tasks-btn");
const inputBox = document.querySelector("#add-task-field");
const form = document.querySelector("#form");

// Update task
async function updateTask(taskId) {
  const newTitle = prompt("Enter new title for the task:");
  if (!newTitle) return; // Exit if the user cancels

  try {
    const res = await fetch(
      `https://express-crash-82yx.onrender.com/api/tasks/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      }
    );

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
    const res = await fetch(
      `https://express-crash-82yx.onrender.com/api/tasks/${taskId}`,
      {
        method: "DELETE",
      }
    );

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
    const res = await fetch(
      "https://express-crash-82yx.onrender.com/api/tasks"
    );
    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const tasks = await res.json();
    output.innerHTML = "";
    console.log(tasks);

    if (tasks.length === 0) {
      alert("You have no tasks added. Start adding now. 👇");
    }

    tasks.forEach((task) => {
      const element = document.createElement("div");
      const delBtn = document.createElement("button");
      const editBtn = document.createElement("button");
      const checkBox = document.createElement("input");
      const taskContent = document.createElement("div");
      const taskActions = document.createElement("div");
      const taskBox = document.createElement("div");
      const dateElement = document.createElement("p");
      dateElement.className = "date";
      taskBox.classList.add("task-box");
      taskActions.classList.add("task-actions");
      taskContent.classList.add("task-content");
      checkBox.classList.add("checkbox");
      checkBox.type = "checkbox";
      checkBox.checked = task.completed;
      const date = new Date(task.date).toLocaleDateString();
      dateElement.textContent = date;
      element.textContent = task.title;
      const taskId = task._id;

      // check if task is completed
      if (task.completed) {
        element.classList.add("completed"); // Add the completed class
      } else {
        element.classList.add("task-item");
      }

      // Create edit button
      editBtn.textContent = "";
      editBtn.classList.add("edit-btn");
      editBtn.onclick = () => updateTask(taskId);

      // Create delete button
      delBtn.textContent = "";
      delBtn.classList.add("del-btn");
      delBtn.onclick = () => deleteTask(taskId);

      // Checkbox functionality
      checkBox.onchange = async (e) => {
        const currentStatus = e.target.checked;
        const newStatus = !currentStatus;

        e.target.checked = newStatus;
        await toggleTaskCompletion(taskId, newStatus);
      };

      // Append children
      output.appendChild(taskBox);
      taskBox.appendChild(taskContent);
      taskContent.appendChild(element);
      taskContent.appendChild(dateElement);
      taskContent.appendChild(taskActions);
      taskActions.appendChild(editBtn);
      taskActions.appendChild(delBtn);
      taskBox.appendChild(checkBox);
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
      const res = await fetch(
        "https://express-crash-82yx.onrender.com/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, completed }),
        }
      );

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

async function toggleTaskCompletion(taskId, status) {
  // Toggle the completed status
  const newStatus = !status;

  try {
    const res = await fetch(
      `https://express-crash-82yx.onrender.com/api/tasks/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: newStatus }),
      }
    );

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
