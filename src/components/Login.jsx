import React from "react";

import { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoMailOpen } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import myGif from "../assets/output-onlinegiftools2.gif";

// import BGimg from "../assets/scrumboard2.gif";
import BGimg from "../assets/picture3.png";
import img from "../assets/dynamo (2).png";
// import BGimg2 from "../assets/Vector_2658.jpg";

import { Link, useNavigate } from "react-router-dom";
import { api } from "../variable";

export default function Login() {
  sessionStorage.clear();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password1, setPassword1] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(null);
  const [transition, setTransition] = useState(false);
  const shiftForm = () => {
    setTransition(!transition); // Toggle transition state
  };
  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${api}user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // credentials: "include",
      body: JSON.stringify({
        username: name,
        password: password,
      }),
    });

    //console.log(admin[0].status)
    if (response.status === 200) {
      const responseData = await response.json();
      sessionStorage.setItem("role", responseData.role)
      sessionStorage.setItem("id", responseData.user.id)
      sessionStorage.setItem("email", responseData.user.email)
      localStorage.setItem("id", responseData.user.id)
      if (responseData.role === "admin") {
        sessionStorage.setItem("access", responseData.access_token)
        navigate("/admin/home")


      }
      else if (responseData.role === "sales") {
        sessionStorage.setItem("access", responseData.access_token)
        navigate("/sales/home")

      }
      else if (responseData.role === "cto") {
        sessionStorage.setItem("access", responseData.access_token)
        navigate("/cto/home")

      }
      else if (responseData.role === "team lead") {
        console.log("team lead")
        setError("main team lead par agaya");
        sessionStorage.setItem("access", responseData.access_token)
        navigate("/lead/home")

      }
      else if (responseData.role === "developer") {
        sessionStorage.setItem("access", responseData.access_token)
        navigate(`/user/kanban/${localStorage.getItem("id")}`)
      }

    }
    else if (response.status === 400) {
      setError("Invalid credentials");
    }

  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (


    <div className="flex flex-col  p-10 bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] items-center justify-between h-screen ">


      <div className="shadow-custom-xl bg-black-dark grid grid-cols-2 items-center justify-between gap-20 p-5 rounded-2xl  h-screen ">


        {/* <div className=" ml-14 " style={{
          width: '480px',
          height: '480px',
          backgroundSize: `cover`,
          backgroundImage: `url(${BGimg})`,
        
        }}>
        </div> */}

        <div class="bg-cover bg-center h-48 w-48 md:h-64 md:w-64 lg:h-80 lg:w-80 xl:h-96 xl:w-96 rounded-lg overflow-hidden" style={{
          backgroundImage: `url(${BGimg})`
        }}
        >
        </div>

        <div className="max-w h-auto grid gap-3 justify-center ">
          {/* <img src={img} alt="Description of image" className="w-[15%]" /> */}

          <h1 className="text-5xl font-bold text-white flex items-center">
            Welcome
            <span className="ml-4">
              <img src={myGif} alt="Animated GIF" className="h-22 w-20 rotate-35" />
            </span>
          </h1>


          <p></p>

          <form onSubmit={submit} className=" text-white flex flex-col gap-4">
            <div className="flex flex-col">

              <label className="block text-white  font-medium mb-2" htmlFor="email">
                Username
              </label>

              <div className="relative text-white">

                <div className="absolute top-1 left-1 bg-white-medium rounded-full  p-3 flex items-center justify-center text-white">
                  <span className="absolute items-center flex ">
                    <IoMailOpen className="text-white" />
                  </span>
                </div>

                <input type="text" id="email" placeholder="Email Address"
                  name="email"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="w-full text-white bg-white-light py-2 px-5 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-[#0fc7e3] focus:drop-shadow-lg" />
              </div>
            </div>

            <div className="flex flex-col">

              <label className="block text-white  font-medium mb-2" htmlFor="email">
                Password
              </label>

              <div className="relative">
                <input
                  className="w-full text-white bg-white-light py-2 px-5 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-[#0fc7e3] focus:drop-shadow-lg"
                  type={showPassword ? "text" : "password"}
                  id="password" name="password" placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <div className="absolute top-1 left-1 bg-white-medium rounded-full  p-3 flex items-center justify-center text-white"></div>

                <div className=" bg-white-medium rounded-full">

                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <FaLock className="text-white" />
                  </span>
          

                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer sm:pr-2 md:pr-1 lg:pr-3 xl:pr-3 "
                    onClick={togglePasswordVisibility}
                  >
                  {showPassword ? (
                      <FiEyeOff className="text-white" />
                    ) : (
                      <FiEye className="text-white" />
                    )}
                  </span>

                </div>
              </div>
            </div>

            <div className="text-white text-right">
              <Link to="/forgetpassword" className="text-sm">
                Forget Password?
              </Link>
            </div>

            <p className="text-red-500 text-center my-2">{error}</p>

            <button type="submit" className="bg-[#0fc7e3] w-full font-semibold rounded-full py-2">Sign in</button>
          </form>
          {/* <div className="text-dull-white border-t border-white-light pt-4 space-y-4 text-sm">
            <p>Don't have an account? <a className="text-neon-blue font-semibold cursor-pointer">Sign up</a></p>
            <p>Forgot password? <a className="text-neon-blue font-semibold cursor-pointer">Reset password</a></p>
            <p>Don't have a password yet? <a className="text-neon-blue font-semibold cursor-pointer">Set password</a></p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
