import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function Hosting() {
  console.log("HOSTING")
  const navigate = useNavigate();
  const [cookies] = useCookies([]);

  useEffect(() => {
    const verifyUser = async () => {
      const jwtCookie = cookies.jwt;
      console.log("jwtuser", jwtCookie);
      if (!jwtCookie) {
        navigate("/signup");
      } else {
        try {
          const { data } = await axios.post(
            "http://localhost:4000/hosting", // Corrected URL
            {}, // You can pass data here if needed
            {
              withCredentials: true,
            }
          );
          if (data.status === "valid") {
            toast(`Hi ${data.user} 🦄`, {
              theme: "dark",
            });
            navigate("/hosting")
          } else {
            navigate("/signup");
          }
        } catch (error) {
          console.error("Error:", error);
          navigate("/signup"); // Handle error by redirecting to signup
        }
      }
    };

    verifyUser();
  }, [cookies, navigate]);

  return (
    <>
      <h1>hello</h1>
      <ToastContainer />
    </>
  );
}
