import React, { useEffect } from "react";
import "./Category.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobCategory } from "../../Redux/Slices/Job";
import Loading from "../Loading/Loading";
import { Card } from "@mui/material";
import { NavLink } from "react-router-dom";

const Category = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.job);
  const { allJobsCategory, loading } = jobs;
  useEffect(() => {
    dispatch(fetchAllJobCategory());
  }, [dispatch]);
  return (
    <>
      <div className="job-categorys">
        <div className="heading">
          <span></span>
          <h2>Job category</h2>
          <span></span>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="job-category-container">
            {allJobsCategory &&
              allJobsCategory?.map((job) => (
                <Card className="job-category-card" key={job._id}>
                  <img
                    src={job?.image}
                    alt={job?.name}
                    className="category-card-img"
                  />
                  <NavLink to={`/singlecategory/${job._id}`}>
                    <span>{job?.name}</span>
                  </NavLink>
                </Card>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Category;
