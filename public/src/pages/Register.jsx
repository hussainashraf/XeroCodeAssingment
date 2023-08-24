import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
  });
  // alert(toast.success("hello"))
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        {
          name: name,
          password: password,
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      if (data && data.errors) {
        for (const key in data.errors) {
          if (key === "email" && data.errors[key] === "Email is Already Registered"&&key==="") {
            generateError("Email is already registered.");
            
          }  else if (key === "password" && data.errors[key] === "Path `password` is required.") {
            generateError("Please enter a password.", "password");
          } else if (key === "password" && data.errors[key] === "Invalid password.") {
            generateError("Invalid password. Please try again.", "password");
          } else {
            generateError(data.errors[key]);
          }
        }
      } else if (data && data.created) {
        toast.success("Registration successful!");
        // Redirect to login page or wherever you need
        navigate("/signin")
      }
    } catch (err) {
      console.log(err);
    }
  };


  const generateError = (error, field) => {
    if (error) {
      if (field === "password") {
        toast.error("Invalid password. Please try again.", {
          position: "bottom-right",
        });
      } else if (field === "email") {
        toast.error("Please enter a valid email.", {
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
  };
  const test = () => {
    // window.location.href = "http://localhost:4000/auth/google";
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
              Create Your account
            </h1>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium  dark:text-black"
                >
                  Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="bg-white border border-grey text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-900 dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-400 dark:focus:border-gray-400"
                  placeholder="Full Name"
                  required=""
                  onChange={(e) => setName(e.target.value)}
                  value={name}
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
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>

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
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={(e) => test(e)}
                >
                  SIGN UP
                </button>
              </div>

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
                  Sign in with Google
                </button>
                <button
                  type="button"
                  class=" text-black bg-[#ffff] hover:bg-[#F5F5F5]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                  onClick={(e) => clickedtest(e)}
                >
                  <GrGithub style={{ fontSize: "29px", padding: "5px" }} />
                  Sign in with Github
                </button>
              </div>
              <div className="flex ">
                <p
                  className="text-sm font-light text-gray-500 dark:text-gray-400"
                  style={{ marginLeft: "75px" }}
                >
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
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
