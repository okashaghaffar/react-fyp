import React, { useState } from 'react'
import { FaRegFileWord } from "react-icons/fa6";
import Sidebar from '../Sidebar';
import { api } from '../../variable';
function SrsGeneration() {
  const [wordFile, setWordFile] = useState(null);
  const [loadingWord, setLoadingWord] = useState(false);

  const handleWordFileChange = (e) => {
    const file = e.target.files[0];
    setWordFile(file);
  };
  const handleWordSubmit = async () => {
    try {
      setLoadingWord(true);
      const formData = new FormData();
      formData.append('wordFile', wordFile);
      formData.append("id",sessionStorage.getItem("id"))

      const response = await fetch(`${api}chat`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process the document');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'SRS.docx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }finally {
      setLoadingWord(false); 
    }
  };

  return (
    <>
    <Sidebar></Sidebar>
      <div className=" sm:ml-64 bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] ">
        <div className="min-h-screen flex flex-col justify-center items-center  text-black">
          {/* Header */}
          <header className="py-6 text-center">
            <h1 className="text-4xl uppercase font-semibold">Welcome to SRS Generator</h1>
          </header>

          {/* Content */}
          <div
            className="bg-[#2d2f3b] text-white p-8 rounded shadow-md mb-8 mx-4"
            style={{ flexBasis: "45%" }}
          >
            <h1 className="text-3xl font-semibold mb-6">
              Generate SRS Document from Word File
            </h1>

            

            <div className="mt-6 flex flex-row  justify-between">
            <div className="">
              <label htmlFor="audioFile" className="block text-white">
                Upload word File:
              </label>
              <input
                type="file"
                id="audioFile"
                accept=".doc, .docx"
            onChange={handleWordFileChange}
           
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
                onClick={handleWordSubmit}
                type="submit"
                className=" bg-white text-[#14c8e3]  px-4  rounded hover:bg-gray-700 flex items-center justify-center font-bold"
              >
                <FaRegFileWord className="mr-2" />
                Upload Word
              </button>
            </div>

            {loadingWord && (
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
      </div></>
  )
}

export default SrsGeneration