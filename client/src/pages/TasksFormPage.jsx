import React, { useEffect } from "react";
import { get, useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const TasksFormPage = () => {
  const navigate = useNavigate();
  const idParams = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const { createTask, getOneTask, updateTask } = useTasks();
  useEffect(() => {
    async function loadTask() {
      if (idParams.id) {
        const task = await getOneTask(idParams.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("category", task.category);
      }
    }
    loadTask();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (idParams.id) {
        await updateTask(idParams.id, data);
        toast.success("Task updated successfully");
        console.log("acabas de editar el task", idParams.id);
      } else {
        toast.success("Task created successfully ");
        createTask(data);
      }
      navigate("/tasks");
    } catch (error) {
      console.log("algo paso aqui", error);
      window.location.href = "/tasks";
    }
  };
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          type="text"
          name="title"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        <input
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          type="text"
          {...register("description")}
        />
        <select
          name="category"
          id="category"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          {...register("category")}
        >
          <option value="">Select a category</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Technology">Technology</option>
          <option value="Sports">Sports</option>
          <option value="Music">Music</option>
          <option value="Fashion">Fashion</option>
        </select>

        <button className="text-white" type="submit">
          {" "}
          Add{" "}
        </button>
      </form>
    </div>
  );
};

export default TasksFormPage;
