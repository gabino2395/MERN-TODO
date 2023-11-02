import { useState } from "react";
import { createContext, useContext } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/task";

const TaskContext = createContext();
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getOneTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      setTasks([...tasks, res.data]);
      console.log(res);
    } catch (error) {
      console.log("error en el catch del context", error);
    }
  };
  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task);
      console.log(id);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log('se intenta con este id :',id);

      console.log(error);
    }
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getOneTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
