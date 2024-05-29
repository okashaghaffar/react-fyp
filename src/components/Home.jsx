import { useState } from "react";
import React from 'react';
import { FaRegFileAudio } from "react-icons/fa6";
import { FaRegFileWord } from "react-icons/fa6";
import { BsFiletypeMp4 } from "react-icons/bs";


export default function Home() {
  const [audioFile, setAudioFile] = useState(null);
  const [wordFile, setWordFile] = useState(null);
  const [mp4File, setMp4File] = useState(null);
  const [wavFile1, setWavFile1] = useState(null);
  const [wavFile2, setWavFile2] = useState(null);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [loadingWord, setLoadingWord] = useState(false);
  const [loadingConvert, setLoadingConvert] = useState(false);
  const [loadingAppend, setLoadingAppend] = useState(false);

  const handleAudioFileChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
  };

  const handleWordFileChange = (e) => {
    const file = e.target.files[0];
    setWordFile(file);
  };

  const handleMp4FileChange = (e) => {
    const file = e.target.files[0];
    setMp4File(file);
  };

  const handleWavFile1Change = (e) => {
    const file = e.target.files[0];
    setWavFile1(file);
  };

  const handleWavFile2Change = (e) => {
    const file = e.target.files[0];
    setWavFile2(file);
  };

  const handleWordSubmit = async () => {
    try {
      setLoadingWord(true);
      const formData = new FormData();
      formData.append('wordFile', wordFile);

      const response = await fetch('http://127.0.0.1:8000/api/chat', {
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
      a.download = 'generated_document.docx';
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

  const handleFormSubmit = async () => {
    const apiUrl = 'https://59aa-34-28-24-151.ngrok-free.app/generatemom';

    const formData = new FormData();
    formData.append('file', audioFile);

    try {
      setLoadingAudio(true);
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload files');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'MOM.docx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      const responseData = await response.json();
      console.log('Server Response:', responseData);
    } catch (error) {
      console.error('Error uploading files:', error.message);
    }
    finally {
      setLoadingAudio(false); // Set loading state back to false after completion
    }
  };

  const handleConvertMp4ToWav = async () => {
    try {
      setLoadingConvert(true);
      if (!mp4File) {
        alert("Please select an MP4 file.");
        return;
      }

      const formData = new FormData();
      formData.append('file', mp4File);

      const response = await fetch('http://127.0.0.1:8000/convert-mp4-to-wav', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to convert MP4 to WAV');
      }

      // Assuming the backend returns the WAV file as an attachment
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'converted_audio.wav';
      document.body.appendChild(a);
      a.click();

      // Remove the temporary link element
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error converting MP4 to WAV:', error.message);
    }
    finally {
      setLoadingConvert(false); // Set loading state back to false after completion
    }
  };

  const handleAppendWavFiles = async () => {
    try {
      setLoadingAppend(true);
      if (!wavFile1 || !wavFile2) {
        alert("Please select two WAV files.");
        return;
      }

      const formData = new FormData();
      formData.append('file1', wavFile1);
      formData.append('file2', wavFile2);

      const response = await fetch('http://127.0.0.1:8000/append-wav-files', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to append WAV files');
      }

      // Assuming the backend returns the combined WAV file as an attachment
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'combined_audio.wav';
      document.body.appendChild(a);
      a.click();

      // Remove the temporary link element
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error appending WAV files:', error.message);
    }finally {
      setLoadingAppend(false); // Set loading state back to false after completion
    }
  };

  return (
    <>
      <div className="font-bold text-4xl "> <span className="font-bold text-6xl text-blue-900">D</span>YNAMO</div>
      <span className="mb-5 text-2xl italic">A tool that helps you create Software Requirements Specification from a meeting !</span>
    <div className="min-h-screen flex flex-wrap justify-center bg-gray-100 mt-5">
      <div className="bg-white p-8 rounded shadow-md mb-8 mx-4" style={{ flexBasis: "45%" }}>
        <div>
          <h1 className="text-3xl font-semibold mb-6 ">Generate MOM Document from Audio File</h1>

          <div className="mb-4">
            <label htmlFor="audioFile" className="block text-gray-600">
              Upload Audio File:
            </label>
            <input
              type="file"
              id="audioFile"
              accept=".wav"
              onChange={handleAudioFileChange}
              className="mt-1"
            />
          </div>

          <div className="mt-6">
            <button
              onClick={() => { handleFormSubmit(); }}
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              <div className=" flex flex-row items-center justify-center font-bold">
              <FaRegFileAudio />
              Upload Audio
              </div>
             
            </button>
            
          </div>
         
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

      <div className="bg-white p-8 rounded shadow-md mb-8 mx-4" style={{ flexBasis: "45%" }}>
        <div>
          <h1 className="text-3xl font-semibold mb-6 ">Generate SRS From a Word Document</h1>

          <div className="mb-4">
            <label htmlFor="wordFile" className="block text-gray-600">
              Upload Word File:
            </label>
            <input
              type="file"
              id="wordFile"
              accept=".doc, .docx"
              onChange={handleWordFileChange}
              className="mt-1"
            />
          </div>

          <div className="mt-6">
            <button
              onClick={() => { handleWordSubmit(); }}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
             <div className=" flex flex-row items-center justify-center font-bold">
              <FaRegFileWord />
              Upload Word
              </div>
            </button>
            
          </div>
          
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

      <div className="bg-white p-8 rounded shadow-md mb-8 mx-4" style={{ flexBasis: "45%" }}>
        <div>
          <h1 className="text-3xl font-semibold mb-6 ">Convert MP4 to WAV</h1>

          <div className="mb-4">
            <label htmlFor="mp4File" className="block text-gray-600">
              Upload MP4 File:
            </label>
            <input
              type="file"
              id="mp4File"
              accept=".mp4"
              onChange={handleMp4FileChange}
              className="mt-1"
            />
          </div>

          <div className="mt-24">
            <button
              onClick={() => { handleConvertMp4ToWav(); }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              <div className=" flex flex-row items-center justify-center font-bold gap-x-3">
              Convert <BsFiletypeMp4/> to <FaRegFileAudio></FaRegFileAudio>
              
              </div>
            </button>
          </div>
        </div>
        {loadingConvert && (
          <div className="my-3 flex flex-row gap-x-5">
              <div className="spinner-border" role="status">
              <span className="visually-hidden">Processing.</span>
            </div>
            <span>Getting your file Ready Please wait </span>
            </div>
            
            )}
      </div>

      <div className="bg-white p-8 rounded shadow-md mb-8 mx-4" style={{ flexBasis: "45%" }}>
        <div>
          <h1 className="text-3xl font-semibold mb-6 ">Append Two WAV Files</h1>

          <div className="mb-4">
            <label htmlFor="wavFile1" className="block text-gray-600">
              Upload WAV File 1:
            </label>
            <input
              type="file"
              id="wavFile1"
              accept=".wav"
              onChange={handleWavFile1Change}
              className="mt-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="wavFile2" className="block text-gray-600">
              Upload WAV File 2:
            </label>
            <input
              type="file"
              id="wavFile2"
              accept=".wav"
              onChange={handleWavFile2Change}
              className="mt-1"
            />
          </div>

          <div className="mt-6">
            <button
              onClick={() => { handleAppendWavFiles(); }}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
            >
              <div className=" flex flex-row items-center justify-center font-bold">
              <FaRegFileAudio/>
              Append Two Audios
              </div>
            </button>
          </div>
        </div>
        {loadingAppend && (
          <div className="my-3 flex flex-row gap-x-5">
              <div className="spinner-border" role="status">
              <span className="visually-hidden">Processing.</span>
            </div>
            <span>Getting your file Ready Please wait </span>
            </div>
            
            )}
      </div>
    </div>
    </>
  );
}
