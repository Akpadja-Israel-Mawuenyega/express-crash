let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
];

// @desc Get all posts
// @route GET api/posts
export const getPosts = (req, res, next) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.slice(0, limit));
  } else {
    res.status(200).json(posts);
  }
};

// @desc GET a single post
// @route GET api/posts/:id
export const getPost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`Post with id of ${id} not found.`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(post);
};

// @desc CREATE a post
// @route POST api/posts
export const createPost = (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    const error = new Error("Please include a title.");
    error.status = 400;
    return next(error);
  }

  posts.push(newPost);
  res.status(201).json(posts);
};

// @desc UPDATE a post
// @route PUT api/posts/:id
export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res
      .status(404)
      .json({ message: `The post with the id ${id} not found.` });
  }

  post.title = req.body.title;
  res.status(200).json(posts);
};

// @desc DELETE a post
// @route DELETE api/posts/:id
export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res
      .status(404)
      .json({ message: `The post with the id ${id} not found.` });
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
};
