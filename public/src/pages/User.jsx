import React, { useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Cards() {
  console.log("HELLOFROMUSER");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  useEffect(() => {
    const verifyUser = async () => {
      const jwtCookie = cookies.jwt;
      console.log("jwtuser", jwtCookie);
      if (!jwtCookie) {
        navigate("/signup");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (data.status === "valid") {
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
        } else {
          navigate("/signup");
        }
      }
    };
    verifyUser();
  }, [cookies, navigate]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowInput(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    // const response = await axios.post(
    //   "http://localhost:4000/save-data", // Replace with your save data endpoint
    //   {
    //     option: selectedOption,
    //     value: inputValue,
    //   }
    // );
    console.log("Response from MongoDB:");

    setSelectedOption(null);
    setInputValue("");
    setShowInput(false);
  };
  return (
     <>
      <h1 className="mb-20s">HELLOWORD</h1>
      <div className="flex-row justify-around mt-20">
        <div
          className={`bg-gray-100 items-center justify-center border-7 rounded-md cursor-pointer ${
            selectedOption === "Developer" ? "selected" : ""
          }`}
          onClick={() => handleOptionSelect("Developer")}
        >
          Developer
        </div>
        <div
          className={`bg-gray-100 items-center justify-center border-7 rounded-md cursor-pointer ${
            selectedOption === "Organization" ? "selected" : ""
          }`}
          onClick={() => handleOptionSelect("Organization")}
        >
          Organization
        </div>
        <div
          className={`bg-gray-100 items-center justify-center border-7 rounded-md cursor-pointer${
            selectedOption === "Company" ? "selected" : ""
          }`}
          onClick={() => handleOptionSelect("Company")}
        >
          Company
        </div>
      </div>

      {showInput && (
        <div className="mt-1   flex justify-center items-center">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={`Enter ${selectedOption}`}
            className="border p-2"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      )}
      </>
  );
}
