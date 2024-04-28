import React, { useState, useRef, useEffect } from "react";
import loginBanner from "../data/1.png";
import { IoIosHeart } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { hasCookie } from "cookies-next";

function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [errors, setErrors] = useState({
    status: false,
    message: "",
  });
  const navigate = useNavigate();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  useEffect(() => {
    if (hasCookie("isLogin")) {
      navigate("/");
    }
  }, []);
  const signupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (
      email.current &&
      confirmPassword.current &&
      password.current &&
      name.current &&
      // regex.test(email.current.value) &&
      confirmPassword.current.value === password.current.value
    ) {
      const formData = {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        let response = await axios.post(
          "http://localhost:3001/users/register",
          formData
        );
        console.log(response);
        if (response.status === 201) {
          navigate("/login");
        }
      } catch (error: any) {
        // setalreadyExist(true);
      }
    } else if (password.current?.value !== confirmPassword.current?.value) {
      console.log("test");
      setErrors({
        ...errors,
        status: true,
        message: "Password doesnt match confirm password",
      });
      return;
    } else {
      if (email.current)
        console.error("Invalid email address:", email.current.value);
    }
  };

  return (
    <div className="auth-bg py-8 h-screen flex items-center justify-center   *:">
      <div className="container mx-auto px-0">
        <div className="md:flex">
          <div className="col-span-1 md:w-1/4 lg:col-span-1 xl:col-span-1">
            <div className="p-4 pb-0 lg:p-5 lg:pb-0 auth-logo-section">
              <div className="text-white">
                <h3 className="flex text-4xl font-thin">
                  ChatSphere
                  <IoIosHeart className="text-red-600 h-6 w-6 mr-2" />
                </h3>
              </div>
              <div className="mt-auto loginbanner">
                <img src={loginBanner} alt="login" className="login-img" />
              </div>
            </div>
          </div>
          <div className="col-span-1 m-2 rounded-md md:w-3/4 lg:col-span-1 xl:col-span-1 h-100 bg-white">
            <div className="m-3">
              <div className="flex flex-col h-full px-4 pt-4 bg-light rounded text-center">
                <div className="my-auto">
                  <div className="text-center mb-3">
                    <h3 className="text-slate-500 text-center text-4xl font-light">
                      Welcome Back!
                    </h3>

                    <p className="text-slate-500 font-thin mt-3 text-2xl text-slate text-center">
                      Signup in to continue to ChatSphere.
                    </p>
                    {errors.status && (
                      <p className="text-red-400 mt-3 font-semibold">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <form className="max-w-sm mx-auto" onSubmit={signupSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-lg text-start font-light text-gray-900 dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 text-md border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        placeholder="Enter your name"
                        required
                        ref={name}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-lg text-start font-light text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 text-md border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        placeholder="name@gmail.com"
                        required
                        ref={email}
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-lg text-start font-light text-gray-900 dark:text-white"
                      >
                        Your password
                      </label>
                      <div className="relative">
                        <input
                          type={isPasswordVisible ? "text" : "password"}
                          placeholder="Password"
                          ref={password}
                          className="w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        />
                        <button
                          className="absolute inset-y-3 right-0 flex items-center px-4 text-gray-600"
                          onClick={togglePasswordVisibility}
                        >
                          {!isPasswordVisible ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-lg text-start font-light text-gray-900 dark:text-white"
                      >
                        Confirm password
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Password"
                          ref={confirmPassword}
                          className="w-full px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Submit
                    </button>
                  </form>

                  <div className="mt-5 text-center text-muted">
                    <button
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Already have an account try login.!{" "}
                      <a className="font-medium underline text-blue-500">
                        Login
                      </a>
                    </button>
                  </div>
                </div>
                <div className="font-light w-100 text-1xl text-slate-500 p-4">
                  <p className="mb-0 flex justify-center ">
                    © 2024 ChatSphere. Crafted with{"  "}
                    <IoIosHeart style={{ color: "red" }} /> {"  "} by Manoj
                    Bachhal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
