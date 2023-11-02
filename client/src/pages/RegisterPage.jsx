import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const RegisterPage = () => {
  const { signup, errors: regitersErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [regitersErrors2, setRegitersErrors2] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (regitersErrors) {
      toast.error(regitersErrors); // Mostrar el toast con el mensaje de error
    }
  }, [regitersErrors]);
  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);
  const onSubmit = handleSubmit(async (values) => {
    try {
      signup(values);
      // reset();
    } catch (error) {
      console.log("error en el submit en front", error);
    }
  });

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          type="text"
          {...register("username", { required: true })}
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-red-500">Username is required</p>
        )}

        <input
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500">Email is required</p>}
        <input
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500">Password is required</p>
        )}
        <button className="text-white" type="submit">
          Register
        </button>
      </form>
      <p className="flex gap-x-2 justify-between">
        Already Have an Account?
        <Link className="text-sky-500" to="/login">
          Login
        </Link>
      </p>
      {regitersErrors && toast}
    </div>
  );
};

export default RegisterPage;
