import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlay, FaStop } from "react-icons/fa";
import { RotatingLines } from 'react-loader-spinner'; // Import loader
import "./home.css";

function Attendance() {
  const [recognitionResult, setRecognitionResult] = useState({});
  const [loading, setLoading] = useState(false); // Loader state
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const sendRoll = (roll) => {
    if (roll._label !== "no date" && roll._label !== "unknown" && roll !== null) {
      console.log("Sending recognition result to server");
      axios.get(`http://localhost:3000/attendance/roll/${roll}`)
        .then((response) => {
          console.log("Recognition result:", response.data.msg);
          toast.success(response.data.msg);
        })
        .catch((error) => {
          console.error("Error sending recognition result to server:", error);
          toast.error("Error marking attendance!");
        })
        .finally(() => {
          setLoading(false); // Stop loader when response is received
        });
    } else {
      setLoading(false); // Stop loader if invalid recognition
    }
  };

  const capture = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });
  };

  const captureImage = () => {
    setLoading(true); // Start loader when button is clicked

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg");

    axios.post("http://localhost:3000/faces/check-face", { image: dataUrl })
      .then((response) => {
        console.log("Recognition result:", response.data.msg);
        setRecognitionResult(response.data.msg);
      })
      .catch((error) => {
        console.error("Error sending image to server:", error);
        setLoading(false); // Stop loader on error
      });
  };

  useEffect(() => {
    capture();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (Object.keys(recognitionResult).length !== 0) {
      sendRoll(recognitionResult._label);
    }
  }, [recognitionResult]);

  const stopCapture = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='box'>
        <h1>Attendance</h1>
        <video className='vedio' id="video" width="640" height="480" autoPlay ref={videoRef}></video>
        <h1 id="roll">{recognitionResult._label}</h1>

        <div>
          {loading ? (
            <RotatingLines
              strokeColor="blue"
              strokeWidth="5"
              animationDuration="0.75"
              width="50"
              visible={true}
            />
          ) : (
            <button className='btn btn-success pb-2' onClick={captureImage}>
              <FaPlay />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Attendance;