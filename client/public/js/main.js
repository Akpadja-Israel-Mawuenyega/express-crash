// constants
const output = document.querySelector("#output");
const button = document.querySelector("#get-tasks-btn");
const deleteAllButton = document.querySelector("#delete-tasks-btn");
const inputBox = document.querySelector("#add-task-field");
const reminderBox = document.querySelector("#add-reminder-field");
const form = document.querySelector("#form");
const loading = document.querySelector("#loading");
const nothingHere = document.querySelector("#nothing-here");
const bell = document.querySelector("#request-notifications-btn");

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

async function deleteAllTasks() {
  if (!confirm("Are you sure you want to delete all your tasks?")) return;
  output.innerHTML = "";
  try {
    const res = await fetch(
      `https://express-crash-82yx.onrender.com/api/tasks`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch tasks.");
    }

    const tasks = await res.json();

    for (const task of tasks) {
      const deleteRes = await fetch(
        `https://express-crash-82yx.onrender.com/api/tasks/${task._id}`,
        {
          method: "DELETE",
        }
      );

      if (!deleteRes.ok) {
        console.error(`Failed to delete task with id of ${task._id}`);
      }
    }
    alert("All tasks have been successfully deleted.");
    nothingHere.style.display = "block";
    bell.style.display = "none";
  } catch (error) {
    console.log(error.message);
  }
}

// Get and show tasks
async function showTasks() {
  try {
    loading.style.display = "block";
    output.innerHTML = "";

    const res = await fetch(
      "https://express-crash-82yx.onrender.com/api/tasks"
    );
    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const tasks = await res.json();

    loading.style.display = "none";

    if (tasks.length === 0) {
      alert("You have no tasks added. Start adding now. 👇");
      button.style.display = "none";
      deleteAllButton.style.display = "none";
      output.style.font = "italic 20px arial,helvetica,serif";
      output.innerHTML = "You have no tasks to show.";
      nothingHere.style.display = "block";
      bell.style.display = "none";
    }

    tasks.forEach((task) => {
      const element = document.createElement("div");
      const delBtn = document.createElement("button");
      const editBtn = document.createElement("button");
      const checkBox = document.createElement("input");
      const taskContent = document.createElement("div");
      const taskActions = document.createElement("div");
      const taskBox = document.createElement("div");
      taskBox.draggable = true;
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
      delBtn.onclick = () => {
        if (!confirm("Are you sure you want to delete this task?")) return;
        deleteTask(taskId);
      };

      // tooltip
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      const reminder = new Date(task.reminder);
      const reminderDate = reminder.toLocaleDateString();
      tooltip.textContent =
        task.title + " " + "(Reminder:" + " " + reminderDate + ")";
      tooltip.style.display = "none";
      taskBox.appendChild(tooltip);

      // Mouseover to see full task name (tooltip) since there is truncated text
      taskBox.onmouseover = () => {
        tooltip.style.display = "block";
      };

      // Hide tooltip on mouseout
      taskBox.onmouseout = () => {
        tooltip.style.display = "none";
      };

      // Checkbox functionality
      checkBox.onchange = async (e) => {
        const currentStatus = e.target.checked;
        const newStatus = !currentStatus;

        e.target.checked = newStatus;
        await toggleTaskCompletion(taskId, newStatus);
      };

      // set output font
      output.style.font = "medium arial,helvetica,serif";

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
    button.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
  } catch (error) {
    console.log(error.message);
    loading.style.display = "none";
  }
}

// Submit/add new task
async function addTask(e) {
  e.preventDefault();
  const title = inputBox.value;
  const reminder = reminderBox.value;
  const reminderDate = new Date(reminder);
  const currentDate = new Date();
  const completed = false;

  try {
    if (!title) {
      alert("You must add a title!");
      return;
    } else if (!reminder) {
      alert("You must add a reminder!");
      return;
    } else if (reminderDate <= currentDate) {
      alert("Reminders must be in the future.");
      return;
    } else {
      const res = await fetch(
        "https://express-crash-82yx.onrender.com/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, completed, reminder }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add task.");
      }

      const newTask = await res.json();
      showTasks();
    }

    inputBox.value = "";
    reminderBox.value = "";
    button.style.display = "block";
    deleteAllButton.style.display = "block";
    nothingHere.style.display = "none";
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
deleteAllButton.addEventListener("click", deleteAllTasks);
form.addEventListener("submit", addTask);

// check permissions for Notification and  PushManager APIs and service worker
const checkPermission = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No support for service worker!");
  }

  if (!("Notification" in window)) {
    throw new Error("No support for notification API.");
  }

  if (!("PushManager" in window)) {
    throw new Error("No support for Push API.");
  }
};

// register the service worker
const registerSW = async () => {
  const registration = await navigator.serviceWorker.register("/js/sw.js");
  return registration;
};

// request Notification permission
const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Notification permission not granted.");
  }
};

// main service worker, pushManager and notification function
const main = async () => {
  checkPermission();
  await requestNotificationPermission();
  await registerSW();
};
