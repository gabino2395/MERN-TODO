import React from "react";
import { useTasks } from "../../context/TaskContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks();
  const deletedOneTask = () => {
    toast.success("Task deleted");
    deleteTask(task._id);
  };
  return (
    <div className="border-solid bg-red-300">
      <div>
        <button onClick={() => deletedOneTask()}>delete</button>
        <Link to={`/tasks/${task._id}`}>edit</Link>
      </div>
      <p>{task.title}</p>
      <p>{task.description}</p>
      <p>{task.completed ? "completed" : "not completed"}</p>
      <p>{task.category}</p>
    </div>
  );
};

export default TaskCard;
