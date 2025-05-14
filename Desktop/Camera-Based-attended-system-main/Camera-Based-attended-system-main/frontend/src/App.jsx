import "./App.css";
import Footer from "./components/footer";
import Navbar from "./components/header";
import Sidebar from "./components/sidebar";
import "bootstrap/dist/css/bootstrap.css";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="content">
          {/* <Navbar /> */}
          <Outlet />
          {/* <Footer /> */}
          
        </div>
      </div>
    </>
  );
}

export default App;
