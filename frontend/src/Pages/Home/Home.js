import React, { useState } from "react";
import "./Home.css";
import SearchIcon from "@mui/icons-material/Search";

import AllJobs from "../../Components/Jobs/AllJobs";
import Category from "../../Components/Category/Category";

const Home = () => {
  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <div className="home">
        <div className="content">
          <span>Search Now & </span>
          <p>Get Your Dream Job</p>
          <form action="">
            <div className="form-group">
              <span className="search-icon">
                <SearchIcon />
              </span>
              <input
                type="text"
                name="search"
                value={search}
                placeholder="Search here..."
                onChange={handleChange}
              />
              <button className="search-submit" onClick={handleSubmit}>
                Search
              </button>
            </div>
          </form>

          <div className="bubble bubble--1"></div>
          <div className="bubble bubble--2"></div>
          <div className="bubble bubble--3"></div>
          <div className="bubble bubble--4"></div>
          <div className="bubble bubble--5"></div>
          <div className="bubble bubble--6"></div>
          <div className="bubble bubble--7"></div>
          <div className="bubble bubble--8"></div>
          <div className="bubble bubble--9"></div>
          <div className="bubble bubble--10"></div>
          <div className="bubble bubble--11"></div>
          <div className="bubble bubble--12"></div>
        </div>
      </div>
      <div className="home-center">
        <AllJobs search={search} />
      </div>
      <div className="home-category">
        <Category />
      </div>
    </>
  );
};

export default Home;
