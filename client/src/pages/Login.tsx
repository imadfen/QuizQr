import React, { useState } from "react";
import { useForm } from "react-hook-form";
import loginUser from "../utils/loginUser";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const [errorLogin, setErrorLogin] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    setErrorLogin("")
    const result = await loginUser(data.username, data.password);
    if (result === true) {
      navigate("/creators");
    } else {
      setErrorLogin(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label htmlFor="username" className="block font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username", { required: "Username is required" })}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
              placeholder="Enter your username"
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <span className="text-red-500 text-sm">{errorLogin}</span>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
