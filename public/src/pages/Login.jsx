import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
  });
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email before sending:", values.email);
    console.log("values:", values);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/signin",
        {
          password: password,
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      if (data && data.errors) {
        for (const key in data.errors) {
          if (key === "email") {
            if (data.errors[key] === "Email is Already Registered") {
              generateError("Email is already registered.");
            } else {
              generateError(data.errors[key]);
            }
          } else if (key === "password") {
            if (data.errors[key] === "Path `password` is required.") {
              generateError("Please enter a password.", "password");
            } else if (data.errors[key] === "Invalid password.") {
              generateError("Invalid password. Please try again.", "password");
            }
          } else {
            generateError(data.errors[key]);
          }
        }
      } else if (data && data.created) {
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const generateError = (error, field) => {
    if (error) {
      if (field === "password") {
        toast.error(error, {
          position: "bottom-right",
        });
      } else if (field === "email") {
        toast.error(error, {
          position: "bottom-right",
        });
      } else {
        toast.error(error, {
          position: "bottom-right",
        });
      }
    }
  };
  const clicked = () => {
    window.location.href = "http://localhost:4000/auth/google";
    // alert("NEED TO CHANGE IN LOGIN.JSX")
  };
  const clickedtest = () => {
    window.location.href = "http://localhost:4000/auth/github";
  };
  return (
    <section className="bg-gray-50 dark:bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
              Login Your Account
            </h1>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium  dark:text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="yourname@company.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium  dark:text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-400 dark:focus:border-gray-400"
                  required=""
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-center">
              <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  // onClick={(e) => test(e)}
                >
                  SIGN IN
                </button>
              </div>
              {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p> */}
              <div className="flex justify-center text-sm mb-1 dark:text-gray-500">
                OR
              </div>
              <div className="flex">
                <button
                  type="button"
                  class="text-black bg-[#ffff] hover:bg-[#F5F5F5]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                  onClick={(e) => clicked(e)}
                >
                  <FcGoogle style={{ fontSize: "29px", padding: "5px" }} />
                  Login with Google
                </button>
                <button
                  type="button"
                  class=" text-black bg-[#ffff] hover:bg-[#F5F5F5]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                  onClick={(e) => clickedtest(e)}
                >
                  <GrGithub style={{ fontSize: "29px", padding: "5px" }} />
                  Login with Github
                </button>
              </div>
              <div className="flex ">
                <p
                  className="text-sm font-light text-gray-500 dark:text-gray-400"
                  style={{ marginLeft: "75px" }}
                >
                  Don't have account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    SIGN UP
                  </Link>
                </p>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </section>
  );
}
