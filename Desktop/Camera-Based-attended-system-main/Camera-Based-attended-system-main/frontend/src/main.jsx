import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
import { BrowserRouter, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Route, RouterProvider, Routes } from "react-router-dom";
import Dashboard from "./components/dashbord.jsx";
import Home from "./components/home.jsx";
import Attendence from "./components/attendence.jsx";
import Addstudent from "./components/Addstudent.jsx";
import All_student from "./components/All_student.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path="Home" element={<Home/>}></Route>
      <Route path="Dashboard" element={<Dashboard/>}></Route>
      <Route path="Attendence" element={<Attendence/>}></Route>
      <Route path="Addstudent" element={<Addstudent/>}></Route>
      <Route path="Allstudent" element={<All_student/>}></Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
