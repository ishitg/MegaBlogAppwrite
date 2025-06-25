import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Logo, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate;
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    console.log(data);

    setError("");
    try {
      const session = await authService.login(data);
      console.log("session", session);
      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) dispatch(authLogin(userData));
        navigate("/");
        // if we use Link we'll have to manually click but if we use navigate it'll programatically redirect it to root
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-900 rounded-xl p-10 border border-black/10 text-white">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100px" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-shadow-violet-50">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          {
            /* form jab bhi submit hoga whaa handleSubmit hi use hoga
            its a method wherein we provide our method saying this is how I wanna handle the form */
            // handle submit is actually an event we use so that whatever inputs we have in the form, we use the register
            // so whatever values we have in the input, we don't have to manage their state manually, react-hook-form will do it for us
            //  i.e. register will take care of it
            // // handleSubmit will take care of the event and then we can pass our method to it
          }

          {/* // register is a function from useForm that connects the input to the form state
            // `"email"`: The name/key for this field in the form data.
            //The object: Validation rules.
            //     - `required: true`: Field must be filled.
            //     - `validate.matchPattern`: Custom validation function for email format. If it fails, it returns the error message.

            // - **What `...register(...)` does:**
            //   It spreads the necessary props (`onChange`, `onBlur`, `ref`, etc.)
            //  into your input so react-hook-form can track its value and validation.

            // `register` connects your input to react-hook-form and applies validation.
            // - `...register(...)` spreads the necessary props into your input.
            // - `handleSubmit` validates the form and calls your handler with the data. */}
          <Input
            label={"Email: "}
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />
          {/* this 'Sign In' is the children that we saw in the button component */}
          <Button
            type="submit"
            className="w-full py-1 mt-2 hover:bg-blue-500 cursor-pointer"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
