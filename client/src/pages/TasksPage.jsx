import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/tasks/TaskCard";

const TasksPage = () => {
  const { tasks, getTasks } = useTasks();
  useEffect(() => {
    getTasks();
  }, []);
  console.log("hay cambios en los tasks", tasks);
  return (
    <>
      {tasks.length === 0 && <p>No tasks</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </>
  );
};

export default TasksPage;
