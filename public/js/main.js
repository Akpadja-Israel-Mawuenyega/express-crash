const output = document.querySelector("#output");
const button = document.querySelector("#get-posts-btn");

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
      element.textContent = post.title;
      output.appendChild(element);
    });
  } catch (error) {
    console.log("Error fetching posts.");   
  }
}

// Event handlers
button.addEventListener("click", showPosts);
