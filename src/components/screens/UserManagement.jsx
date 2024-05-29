import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { FaRegUser } from "react-icons/fa";
import { FiMail, FiEye, FiEyeOff } from "react-icons/fi";
import { api } from "../../variable";
import picture from "../../assets/AddUser.gif";
import { TypeAnimation } from "react-type-animation";

export default function UserManagement() {
  const [name, setName] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [active, setActive] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [teams, setTeams] = useState();
  const [team, setTeam] = useState([]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    fetch(`${api}get/team`)
      .then((res) => res.json())
      .then((data) => {
        setTeam(data);
      });
  }, []);
  const signup = async () => {
    // e.preventDefault();


    if (email !== "" && password !== "" && name !== "") {
      if (password === password1) {
        await fetch(`${api}user/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: name,
            email: email,
            password: password,
            first_name: fname,
            last_name: lname,
            role: role,
            teams: teams,
          }),
        });
        //   if (role ==="team lead"){
        //     console.log("role",role)
        //   await fetch(`${api}create/team`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //      lead:name
        //     }),
        //   })
        // }

        setEmail("");
        setName("");
        setPassword("");
        setFname("");
        setLname("");
        setPassword("");
        setPassword1("");
        setActive(false);
        setIsStaff(false);
        setRole("");
        setTeams("");
        setError("");

        window.alert("Account created");
      } else {
        window.alert("Password Doesn't match");
      }
    } else {
      setError("Fields can't be empty");
    }
  };
  return (
    <div>
      <Sidebar></Sidebar>
      <div className="p-4 sm:ml-64 bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] min-h-screen">

        <div className="text-center flex flex-row items-center justify-center gap-x-3 text-3xl font-bold text-white mb-8">
          <FaRegUser />
          User Creation
        </div>

        <div className="h-3/4 flex flex-row justify-center">

          <div className="bg-white p-8 rounded shadow-custom-xl md:w-3/4 md:h-3/4 justify-center items-center my-6 border border-gray-300">

            <div className="grid grid-cols-2 gap-4 justify-between items-center pr-12">
              {/* form */}


              <div className=" w-full md:w-[80%]">

                <form className="flex flex-wrap justify-start ml-12">

                  <div className="mb-3 w-full">  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="name"
                  >
                    User Name
                  </label>
                    <input
                      className="border rounded-full px-3 py-2 focus:border-blue-500 bg-white-light focus:ring-[#faa54b] focus:outline-none focus:ring-1 w-full" type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="mb-3 w-full md:w-1/2">  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="fname"
                  >
                    First Name
                  </label>
                    <input
                      className="border rounded-full px-3 py-2 focus:border-blue-500 bg-white-light focus:ring-[#faa54b] focus:outline-none focus:ring-1 w-full" type="text"
                      id="fname"
                      name="fname"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      placeholder="Enter first name"
                    />
                  </div>

                  <div className="mb-3 w-full md:w-1/2 ">
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="lname"
                    >
                      Last Name
                    </label>
                    <input
                      className="border rounded-full px-3 py-2 focus:border-blue-500 bg-white-light focus:ring-[#faa54b] focus:outline-none focus:ring-1 w-full"
                      type="text"
                      value={lname}
                      id="lname"
                      name="lname"
                      onChange={(e) => setLname(e.target.value)}
                      placeholder="Enter last name"
                    />
                  </div>

                  <div className="mb-3 w-full">
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <div className="relative">
                      {/* <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
      <FiMail className="text-gray-400" />
    </span> */}
                      <input
                        className="border rounded-full px-3 py-2 focus:border-blue-500 bg-white-light focus:ring-[#faa54b] focus:outline-none focus:ring-1 w-full"
                        type="email"
                        value={email}
                        id="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="mb-3 w-full">
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        className="border rounded-full px-3 py-2 focus:border-blue-500 bg-white-light focus:ring-[#faa54b] focus:outline-none focus:ring-1 w-full"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                      />

                      <div className="bg-white-medium rounded-full absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer md:w-auto">
                        <span
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <FiEyeOff className="text-gray-400" />
                          ) : (
                            <FiEye className="text-gray-400" />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>


                  <div className="mb-3 w-full">
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="password1"
                    >
                      Re-enter Password
                    </label>
                    <div className="relative">
                      <input
                        className="border rounded-full px-3 py-2 focus:border-blue-500 bg-white-light focus:ring-[#faa54b] focus:outline-none focus:ring-1 w-full"
                        type={showPassword ? "text" : "password"}
                        id="password1"
                        name="password"
                        onChange={(e) => setPassword1(e.target.value)}
                        value={password1}
                        placeholder="Enter your password"
                      />
                      <span
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <FiEyeOff className="text-gray-400" />
                        ) : (
                          <FiEye className="text-gray-400" />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3 w-full">
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="role"
                    >
                      Role
                    </label>
                    <select
                      className="border rounded-full px-3 py-2 focus:border-blue-500 bg-white-light focus:ring-[#faa54b] focus:outline-none focus:ring-1 w-full"
                      id="role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select your role</option>
                      <option value="sales">Sales</option>
                      <option value="cto">CTO</option>
                      <option value="developer">Developer</option>
                      <option value="team lead">Team Lead</option>
                    </select>
                  </div>

                  <div className={role === "developer" ? "mb-3 w-full" : "hidden"}>
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="team"
                    >
                      Team
                    </label>
                    <select
                      className="border rounded-full px-3 py-2 focus:border-blue-500 bg-white-light focus:ring-[#faa54b] focus:outline-none focus:ring-1 w-full"
                      id="team"
                      name="team"
                      value={teams}
                      onChange={(e) => setTeams(e.target.value)}
                    >
                      <option value="">Select your team</option>
                      {team.map((t) => (
                        <option value={t.id}>{t.lead.username}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3 w-full flex flex-row gap-4 justify-between">
                    <div className="flex-1 flex flex-col items-center">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Active
                      </label>
                      <input
                        className="leading-tight"
                        type="checkbox"
                        checked={active}
                        onChange={() => setActive(!active)}
                      />
                    </div>

                    <div className="flex-1 flex flex-col items-center">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Is Staff
                      </label>
                      <input
                        className="leading-tight"
                        type="checkbox"
                        checked={isStaff}
                        onChange={() => setIsStaff(!isStaff)}
                      />
                    </div>
                  </div>

                </form>
              </div>

              <div className="-ml-6 flex flex-col items-center space-y-3 font-bold">
                <div className="w-full md:ml-14 text-center text-xl text-[#401F71]">
                  <TypeAnimation
                    sequence={[
                      // Same substring at the start will only be typed out once, initially
                      "Create your User",
                      1000, // wait 1s before replacing "Mice" with "Hamsters"
                      "Give rights to your User",
                      1000,
                    ]}
                    wrapper="p"
                    speed={50}
                    style={{ fontSize: "1.5em", display: "inline-block" }}
                    repeat={Infinity}
                  />
                </div>
                <div className="ml-14 md:w-full md:ml-0 flex justify-center items-center overflow-hidden">
                  <div
                    style={{
                      width: "400px",
                      height: "400px",
                      backgroundSize: `cover`,
                      backgroundImage: `url(${picture})`,
                    }}
                    className="w-full h-full object-cover rounded-full md:rounded-none"
                  ></div>
                </div>

                <button
                  onClick={() => signup()}
                  className="ml-14 my-2 w-full md:w-3/4 rounded py-2 transition duration-1000 bg-[#faa54b] text-white shadow-md hover:from-[#824D74] hover:to-[#401F71]"
                >
                  Create User
                </button>
              </div>


              <div className="text-red-500 text-center my-2">{error}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
