import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleJobCategory } from "../../Redux/Slices/Job";
import { useParams } from "react-router-dom";
import JobCard from "../Jobs/JobCard";
import "./Category.css";
import { Card } from "@mui/material";
import Pagination from "../Function/Pagination/Pagination";
import Loading from "../Loading/Loading";

const SubCategory = () => {
  const [employmentType, setEmploymentType] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [experience, setExperience] = useState("");
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.job);
  const { SelectedCategoryJob, loading, totalJobs, totalJobPage } = jobs;
  const { catID } = useParams();
  useEffect(() => {
    dispatch(
      fetchSingleJobCategory({
        catID,
        type: employmentType,
        sort,
        experience,
        page: currentPage,
      })
    );
  }, [dispatch, employmentType, sort, experience, currentPage, catID]);
  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };
  const handleEmploymentTypeChange = (event) => {
    setEmploymentType(event.target.value);
  };
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className="subcategory-job-container">
      <div className="left-side-jobs">
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
          <div
            style={{
              position: "relative",
              left: "50%",
              marginTop: "50px",
            }}
          >
            <Loading />
          </div>
        ) : (
          <>
            {SelectedCategoryJob?.length < 1 ? (
              <h4 style={{ marginTop: "10px" }}>No Job found</h4>
            ) : (
              <>
                <h3>{totalJobs} Jobs</h3>
                {SelectedCategoryJob.map((item) => (
                  <JobCard key={item._id} item={item} />
                ))}
              </>
            )}
          </>
        )}
        <div className="pagination">
          <Pagination
            totalPage={totalJobPage}
            onClick={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default SubCategory;
