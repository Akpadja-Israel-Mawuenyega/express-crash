const output = document.querySelector("#output");
const button = document.querySelector("#get-posts-btn");
const form = document.querySelector("#add-post-form");

// Update post
async function updatePost(postId) {
  const newTitle = prompt("Enter new title for the post:");
  if (!newTitle) return; // Exit if the user cancels

  try {
    const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    });

    if (!res.ok) {
      throw new Error("Failed to update post.");
    }

    showPosts(); // Refresh the list of posts
  } catch (error) {
    console.log("Error updating post.");
  }
}

// Delete post
async function deletePost(postId) {
  if (!confirm("Are you sure you want to delete this post?")) return; // Confirmation

  try {
    const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete post.");
    }

    showPosts(); // Refresh the list of posts
  } catch (error) {
    console.log("Error deleting post.");
  }
}

// Get and show posts
async function showPosts() {
  try {
    const res = await fetch("http://localhost:5000/api/posts");
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await res.json();
    output.innerHTML = "";

    posts.forEach((post) => {
      const element = document.createElement("div");
      const delBtn = document.createElement("button");
      const editBtn = document.createElement("button");
      element.textContent = post.title;

      // Create edit button
      editBtn.textContent = "Edit";
      editBtn.onclick = () => updatePost(post.id);

      // Create delete button
      delBtn.textContent = "Delete";
      delBtn.onclick = () => deletePost(post.id);

      // Append children
      output.appendChild(element);
      output.appendChild(editBtn);
      output.appendChild(delBtn);
    });
  } catch (error) {
    console.log("Error fetching posts.");
  }
}

// Submit/add new post
async function addPost(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const title = formData.get("title");

  try {
    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      throw new Error("Failed to add post.");
    }

    const newPost = await res.json();

    const element = document.createElement("div");
    const delBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    element.textContent = post.title;

    // Create edit button
    editBtn.textContent = "Edit";
    editBtn.onclick = () => updatePost(post.id);

    // Create delete button
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deletePost(post.id);

    // Append children 
    output.appendChild(element);
    output.appendChild(editBtn);
    output.appendChild(delBtn);
    output.appendChild(element);
    showPosts();
  } catch (error) {
    console.log("Error adding post.");
  }
}

// Event handlers
button.addEventListener("click", showPosts);
form.addEventListener("submit", addPost);
