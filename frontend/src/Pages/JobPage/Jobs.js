import React, { useEffect } from "react";
import "./Jobs.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs, fetchSkilledJobs } from "../../Redux/Slices/Job";
import JobCard from "../../Components/Jobs/JobCard";
import "../../Components/Jobs/AllJobs.css";
import { fetchUserData } from "../../Redux/Slices/User";
import Skeleton from "@mui/material/Skeleton";

const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.job);
  const { SkilledJobs, loading, allJobs } = jobs;
  const users = useSelector((state) => state.user);
  const { currentUser, UserAllDetails } = users;
  const { savedjob, applied } = UserAllDetails;
  const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  useEffect(() => {
    const fetchJob = async () => {
      if (!storedUserInfo || !currentUser) {
        await dispatch(
          fetchAllJobs({
            category: "",
            type: "",
            sort: "",
            experience: "",
            page: "",
            search: "",
          })
        );
        return;
      }
      await dispatch(fetchUserData());
      await dispatch(fetchSkilledJobs());
    };
    fetchJob();
    // eslint-disable-next-line
  }, [dispatch, currentUser._id]);

  return (
    <>
      <div className="job-page">
        <div className="top-job-page">
          <div>
            {!savedjob ? (
              <span>0</span>
            ) : savedjob?.length < 1 ? (
              <span>0</span>
            ) : (
              <span>{savedjob?.length}</span>
            )}
            <p>saved</p>
          </div>
          <div>
            {!applied ? (
              <span>0</span>
            ) : applied?.length < 1 ? (
              <span>0</span>
            ) : (
              <span>{applied?.length}</span>
            )}
            <p>Apllied</p>
          </div>
        </div>
        <div className="bottom-job-page">
          <h6>Jobs for you</h6>
          {storedUserInfo ? (
            <>
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <Skeleton variant="rounded" width={"100%"} height={120} />
                  <Skeleton variant="rounded" width={"100%"} height={120} />
                  <Skeleton variant="rounded" width={"100%"} height={120} />
                </div>
              ) : (
                <>
                  {SkilledJobs?.length < 1 ? (
                    <h4 style={{ marginTop: "10px" }}>
                      No Job found Matching to your skill
                    </h4>
                  ) : (
                    <>
                      {SkilledJobs?.map((item) => (
                        <JobCard key={item._id} item={item} />
                      ))}
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {loading ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <Skeleton variant="rounded" width={"100%"} height={120} />
                    <Skeleton variant="rounded" width={"100%"} height={120} />
                    <Skeleton variant="rounded" width={"100%"} height={120} />
                  </div>
                </>
              ) : (
                <>
                  {allJobs?.length < 1 ? (
                    <h4 style={{ marginTop: "10px" }}>No Job found</h4>
                  ) : (
                    <>
                      {allJobs?.map((item) => (
                        <JobCard key={item._id} item={item} />
                      ))}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Jobs;
