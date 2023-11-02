import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
const LoginPage = () => {
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (loginErrors) {
      console.log("errores", loginErrors);

      toast.error(loginErrors);
    }
  }, [loginErrors]);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);
  const onSubmit = handleSubmit(async (values) => {
    try {
      console.log(values);
      signin(values);
      reset();
    } catch (error) {
      console.log("ahora entro el error aca", error);
    }
  });

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form onSubmit={onSubmit}>
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
          login
        </button>
      </form>
      <p className="flex gap-x-2 justify-between">
        Don't have an account?{" "}
        <Link to="/register" className="text-sky-500">
          Sign up
        </Link>
      </p>
      {loginErrors && toast}
    </div>
  );
};

export default LoginPage;
