import React from 'react'
import{ useState } from 'react';
import logo from '../assets/logo.png';
import { FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
import BGimg from '../assets/Vector_2658.jpg';
import { Link } from 'react-router-dom';
export default function SignUp() {
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const [password1,setPassword1]=useState('');
  const[error,setError]=useState('')
  const [email,setEmail]=useState('');
  const [showPassword, setShowPassword] = useState(false);

  const submit=async(e)=>{
    e.preventDefault();
    if(email!=='' && password!=='' && name!==''){
      if(password===password1){
        await fetch("http://127.0.0.1:8000/api/register",{
       method:'POST',
       headers:{'Content-Type':'application/json'},
       body:JSON.stringify(
         {username:name,
         email:email,
         password:password
         })
       })
  
       setEmail('');
       setName("");
       setPassword("");
       window.alert("Account created")
      }
      else{
        window.alert("Password Doesn't match")
  
  
      }

    }
    else{
      setError("Fields can't be empty")
    }
   
    
   
   }
   
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div
        className="bg-cover bg-center h-64 md:h-auto md:w-1/2"
        style={{ backgroundImage: `url(${BGimg})` }}
      ></div>
      <div className="bg-white p-8 rounded shadow-md md:w-1/2 flex flex-col justify-center items-center">
        <img src={logo} alt="" className="w-[20vh] h-auto my-3 mx-auto" />

        <h2 className="text-2xl font-bold mb-4 text-center">Join <span className='text-[#304c8c]'>Trade Foresight</span></h2>
        <form onSubmit={submit} >
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name"> {/* New name field */}
              Name
            </label>
            <input
              className="w-full border rounded px-10 py-2 outline-none focus:border-blue-500"
              type="text"
              id="name"
              name="name"
              onChange={e=>{setName(e.target.value)}}
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            {/* Rest of the code remains the same */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FiMail className="text-gray-400" />
              </span>
              <input
                className="w-full border rounded px-10 py-2 outline-none focus:border-blue-500"
                type="email"
                id="email"
                name="email"
                onChange={e=>{setEmail(e.target.value)}}
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            {/* Rest of the code remains the same */}
            <div className="relative">
              <input
                className="w-full border rounded px-10 py-2 outline-none focus:border-blue-500"
                type={showPassword ? 'text' : 'password'}
                onChange={e=>{setPassword(e.target.value)}}
                id="password"
                name="password"
                placeholder="Enter your password"
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
              </span>
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
              Re-enter Password
            </label>
            {/* Rest of the code remains the same */}
            <div className="relative">
              <input
                className="w-full border rounded px-10 py-2 outline-none focus:border-blue-500"
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                onChange={(e)=>setPassword1(e.target.value)}
                placeholder="Enter your password"
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
              </span>
            </div>
          </div>

          <button
            className="my-2 w-full bg-[#253044] text-white rounded py-2 hover:bg-blue-600 transition duration-300"
            type="submit"
          >
            Sign Up {/* Changed button text to Sign Up */}
          </button>
        </form>
        <div className='text-red-500 text-center my-2'>{error}</div>

        <div href="/" className='text-gray-500 text-sm text-right'>
          Already have an account? 
            <Link to="/" className='text-[#304c8c] font-bold'> LogIn</Link>
           </div>
      </div>
    </div>
  )
}
