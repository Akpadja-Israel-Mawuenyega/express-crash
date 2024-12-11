import taskMessage from "../models/taskMessage.js";

// @desc Get all tasks
// @route GET api/tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await taskMessage.find();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ message: "No tasks found!" });
  }
};

// @desc GET a single task
// @route GET api/tasks/:id
export const getTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const task = await taskMessage.findById(id);

    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ message: `Task with id of ${id} not found!` });
  }
};

// @desc CREATE a task
// @route POST api/task
export const createTask = async (req, res) => {
  const task = req.body;
  const newTask = new taskMessage(task);

  try {
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: "Error while creating task." });
  }
};

// @desc UPDATE a task
// @route PUT api/tasks/:id
export const updateTask = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const id = parseInt(req.params.id);
    const task = await taskMessage.findByIdAndUpdate(id, req.body.title);

    res.status(204).json(task);
  } catch (error) {
    res.status(404).json({ message: `Task with id of ${id} not found` });
  }
};

// @desc DELETE a task
// @route DELETE api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await findByIdAndDelete(id);

    if (!task) {
      return res
        .status(404)
        .json({ message: `Task with id of ${id} not found.` });
    }

    res.status(200).json({ message: "Task succesfully deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
