import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import { useEffect, useState } from "react";
import SubCategory from "./Components/Category/SubCategory";
import DetailJobPage from "./Components/DetailsJobPage/DetailJobPage";
import Login from "./Components/Login/Login";
import UserProfile from "./Components/UserProfile/UserProfile";
import AllEmployers from "./Components/AllUsers/AllEmployers";
import SingleUser from "./Components/SingleUser/SingleUser";
import Register from "./Components/Register/Register";
import CreateJob from "./Components/CreateJob/CreateJob";
import EditJob from "./Components/EditJob/EditJob";
import Jobs from "./Pages/JobPage/Jobs";

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Navbar scrollPosition={scrollPosition} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singlecategory/:catID" element={<SubCategory />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobdetail/:jobId" element={<DetailJobPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/employer" element={<AllEmployers />} />
        <Route path="/user/:userId" element={<SingleUser />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createjob" element={<CreateJob />} />
        <Route path="/edit/:jobId" element={<EditJob />} />
        <Route path="/job" element={<Jobs />} />
      </Routes>
    </>
  );
}

export default App;
