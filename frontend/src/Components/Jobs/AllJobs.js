import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import "./AllJobs.css";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobCategory, fetchAllJobs } from "../../Redux/Slices/Job";
import Loading from "../Loading/Loading";
import Pagination from "../Function/Pagination/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchUserData } from "../../Redux/Slices/User";

const AllJobs = ({ search }) => {
  const [employmentType, setEmploymentType] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.job);
  const { allJobs, loading, totalPage, totalProduct, allJobsCategory } = jobs;
  const users = useSelector((state) => state.user);
  const { UserAllDetails } = users;
  const [experience, setExperience] = useState("");
  useEffect(() => {
    const fetchInfo = async () => {
      await dispatch(fetchUserData());
      await dispatch(fetchAllJobCategory());
    };
    fetchInfo();
  }, [dispatch]);
  useEffect(() => {
    const fetchJobs = async () => {
      await dispatch(
        fetchAllJobs({
          category,
          type: employmentType,
          sort,
          experience,
          page: currentPage,
          search,
        })
      );
    };
    fetchJobs();
  }, [
    dispatch,
    category,
    employmentType,
    sort,
    experience,
    currentPage,
    search,
  ]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleCategoryChange = (categoryId) => {
    setCategory(categoryId);
  };
  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };
  const handleEmploymentTypeChange = (event) => {
    setEmploymentType(event.target.value);
  };
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="all-jobs-container">
      <div className="filters">
        <Card className="filter-card">
          <p className="heading">Categories</p>
          <div className="type-of-emp">
            {loading ? (
              <div
                style={{ marginTop: "10px", position: "relative", left: "30%" }}
              >
                <CircularProgress />
              </div>
            ) : (
              allJobsCategory?.map((cat) => (
                <label className="radio-label" key={cat._id}>
                  <input
                    type="radio"
                    value={cat._id}
                    checked={category === cat._id}
                    onChange={() => handleCategoryChange(cat._id)}
                  />
                  {cat.name}
                </label>
              ))
            )}
          </div>
        </Card>
        <Card className="filter-card">
          <p className="heading">Type of employeement</p>
          <div className="type-of-emp">
            <label className="radio-label">
              {" "}
              <input
                type="radio"
                value="internship"
                checked={employmentType === "internship"}
                onChange={handleEmploymentTypeChange}
              />
              Internship
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="contractual"
                checked={employmentType === "contractual"}
                onChange={handleEmploymentTypeChange}
              />
              Contractual
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="full-time"
                checked={employmentType === "full-time"}
                onChange={handleEmploymentTypeChange}
              />
              Full-time
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="part-time"
                checked={employmentType === "part-time"}
                onChange={handleEmploymentTypeChange}
              />
              Part-time
            </label>
          </div>
        </Card>
        <Card className="filter-card">
          <p className="heading">Sort</p>
          <div className="type-of-emp">
            <label className="radio-label">
              {" "}
              <input
                type="radio"
                value="oldest"
                checked={sort === "oldest"}
                onChange={handleSortChange}
              />
              Oldest jobs
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="latest"
                checked={sort === "latest"}
                onChange={handleSortChange}
              />
              Latest Jobs
            </label>
          </div>
        </Card>
        <Card className="filter-card">
          <p className="heading">Work Experience</p>
          <div className="type-of-emp">
            {[0, 1, 2, 3, 4, 5].map((year) => (
              <label key={year} className="radio-label">
                <input
                  type="radio"
                  name="experience"
                  value={year}
                  checked={experience === String(year)}
                  onChange={handleExperienceChange}
                />
                {year} Year
              </label>
            ))}
          </div>
        </Card>
      </div>
      <div className="right-side-job">
        {loading ? (
          <Loading />
        ) : (
          <>
            {allJobs?.length < 1 ? (
              <h4 style={{ marginTop: "10px" }}>No Job found</h4>
            ) : (
              <>
                <h3>{totalProduct} Jobs</h3>
                {allJobs.map((item) => (
                  <JobCard
                    key={item._id}
                    item={item}
                    UserAllDetails={UserAllDetails}
                  />
                ))}
              </>
            )}
          </>
        )}
        {!totalPage < 1 && (
          <div className="pagination">
            <Pagination
              totalPage={totalPage}
              onClick={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
