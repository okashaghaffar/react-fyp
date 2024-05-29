import React, { useEffect, useState } from "react";
import { FaRegFileAudio } from "react-icons/fa";
import Sidebar from "../Sidebar";

export default function MomGeneration() {
  const [api, setApi] = useState("");

  useEffect(() => {}, []);
  

  const [audioFile, setAudioFile] = useState(null);

  const [loadingAudio, setLoadingAudio] = useState(false);

  const handleAudioFileChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
  };

  const handleFormSubmit = async () => {
    // await fetch(`${api}get/url`).then((res) => setApi(res.data));

    // const apiUrl = "https://59aa-34-28-24-151.ngrok-free.app/generatemom";
    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      setLoadingAudio(true);
      const response = await fetch(`${api}/generatemom`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload files");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "MOM.docx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      const responseData = await response.json();
      console.log("Server Response:", responseData);
    } catch (error) {
      console.error("Error uploading files:", error.message);
    } finally {
      setLoadingAudio(false); // Set loading state back to false after completion
    }
  };
  return (
    <>
      <Sidebar></Sidebar>
      <div className=" sm:ml-64 bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74]">
        <div className="min-h-screen flex flex-col justify-center items-center  text-black">
          {/* Header */}
          <header className="py-6 text-center">
            <h1 className="text-4xl uppercase font-semibold">
              Welcome to MOM Generator
            </h1>
          </header>

          {/* Content */}
          <div
            className="bg-[#2d2f3b] text-white p-8 rounded shadow-md mb-8 mx-4"
            style={{ flexBasis: "45%" }}
          >
            <h1 className="text-3xl font-semibold mb-6">
              Generate MOM Document from Audio File
            </h1>
            <div className="flex flex-col">
              <label
                className="block text-white  font-medium mb-2"
                htmlFor="email"
              >
                Enter your API Key
              </label>

              <div className="relative text-white">
                <div className="absolute top-1 left-1 bg-white-medium rounded-full  p-3 flex items-center justify-center text-white">
                  <span className="absolute items-center flex ">
                    
                  </span>
                </div>

                <input
                  type="text"
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  value={api}
                  onChange={(e) => {
                    setApi(e.target.value);
                  }}
                  className="w-full text-white bg-white-light py-2 px-5 rounded-full focus:bg-black-dark focus:outline-none focus:ring-1 focus:ring-[#0fc7e3] focus:drop-shadow-lg"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-row  justify-between">
              <div className="">
                <label htmlFor="audioFile" className="block text-white">
                  Upload Audio File:
                </label>
                <input
                  type="file"
                  id="audioFile"
                  accept=".wav"
                  onChange={handleAudioFileChange}
                  className="mt-1 block w-full text-sm text-white
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
                />
              </div>
              <button
                onClick={handleFormSubmit}
                type="submit"
                className="bg-white text-[#14c8e3] px-4 rounded hover:bg-indigo-500 hover:shadow-md flex items-center justify-center font-bold"
              >
                <FaRegFileAudio className="mr-2" />
                Upload Audio
              </button>
            </div>

            {loadingAudio && (
              <div className="my-3 flex flex-row gap-x-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Processing.</span>
                </div>
                <span>Getting your word Ready Please wait </span>
              </div>
            )}
          </div>

          {/* Demo Options */}
          <div className="flex justify-around mb-8">
            {/* Add demo options here */}
          </div>

          {/* Footer */}
          <footer className="py-4 text-center text-gray-400 text-sm">
            © 2024 MOM Generator. All rights reserved.
          </footer>
        </div>
      </div>
    </>
  );
}
