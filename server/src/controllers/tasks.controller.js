import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    console.log(error);
    if (res.status === 404)
      return res.status(404).json({ message: "Tasks not found" });
    return res.status(500).json({ message: error.message });
  }
};
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  } catch (error) {
    console.log(error);
    if (res.status === 404)
      return res.status(404).json({ message: "Task not found" });
    return res.status(500).json({ message: error.message });
  }
};
export const createTask = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const newTask = new Task({
      title,
      description,
      category,
      completed: false,
      user: req.user.id,
    });
    await newTask.save();

    res.json(newTask);
  } catch (error) {
    console.log("hubo un error en el post", error);
    if (res.status === 404) return res.status(404).json({ message: error });
    return res.status(500).json({ message: error.message });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    if (res.status === 404)
      return res.status(404).json({ message: "Task not found" });
    return res.status(500).json({ message: error.message });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, category },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json(updatedTask);
  } catch (error) {
    console.log(error, "el error entra desde el back papu");
    return res.status(500).json({ message: error.message });
  }
};


