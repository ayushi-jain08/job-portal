import React, { useEffect, useState } from "react";
import {
  FetchEditJob,
  FetchSingleJobDetails,
  fetchAllJobCategory,
} from "../../Redux/Slices/Job";
import { useDispatch, useSelector } from "react-redux";
import log1 from "../../Images/create.png";
import TitleIcon from "@mui/icons-material/Title";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import "./EditJob.css";
import Loading from "../Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditJob = () => {
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobsInfo = useSelector((state) => state.job);
  const { allJobsCategory, loading, singleJobDetail } = jobsInfo;
  const {
    title,
    company,
    experience,
    location,
    salary,
    createdAt,
    applications,
    desc,
    type,
    requirements,
    postedBy,
    category,
  } = singleJobDetail;
  const [types, setTypes] = useState("");
  const { jobId } = useParams();
  const [jobData, setJobData] = useState({
    title: "",
    desc: "",
    location: "",
    company: "",
    salary: "",
    requirement: "",
    experience: "",
    category: "",
  });
  useEffect(() => {
    // Set initial state when singleJobDetail is available
    if (singleJobDetail !== "") {
      setJobData({
        title: title || "",
        desc: desc || "",
        location: location || "",
        company: company || "",
        salary: salary || "",
        requirement: requirements || "",
        experience: experience || "",
        category: category || "",
      });
      setTypes(type || "");
    }
  }, [singleJobDetail]);
  useEffect(() => {
    dispatch(fetchAllJobCategory());
  }, [dispatch]);
  console.log("kkk", jobData);
  useEffect(() => {
    dispatch(FetchSingleJobDetails(jobId));
  }, [dispatch, jobId]);
  console.log(";sss", singleJobDetail);
  const handleJobDataChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setJobData({ ...jobData, [name]: value });
  };
  const handleEmploymentTypeChange = async (event) => {
    setTypes(event.target.value);
  };
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      desc,
      location,
      company,
      salary,
      requirement,
      experience,
      category,
    } = jobData;
    if (!title || !desc || !type || !location || !company || !category) {
      toast.warning("Please filled all required field");
    }
    await dispatch(
      FetchEditJob({
        jobId,
        title,
        desc,
        location,
        company,
        salary,
        requirement,
        type: types,
        image,
        experience,
        category,
      })
    );
    toast.success("Your job Updated successfully");
    navigate(-1);
  };
  console.log("yu", types);
  return (
    <>
      <div className="create-job">
        {loading ? (
          <Loading />
        ) : (
          <div className="create-job-container">
            <div className="create-job-content">
              <div className="img">
                <h2>Edit Job</h2>
                <img src={log1} alt="" />
              </div>

              <div>
                <form className="create-job-details" onSubmit={handleJobSubmit}>
                  <div className="form-group">
                    <span>
                      <TitleIcon />
                    </span>
                    <input
                      type="text"
                      placeholder="job title"
                      name="title"
                      value={jobData.title}
                      required
                      onChange={handleJobDataChange}
                    />
                  </div>
                  <div className="form-group">
                    <span>
                      <BorderColorIcon />
                    </span>
                    <input
                      type="text"
                      placeholder="job description"
                      name="desc"
                      value={jobData.desc}
                      required
                      onChange={handleJobDataChange}
                    />
                  </div>
                  <div className="form-group">
                    <span>
                      <AddLocationIcon />
                    </span>
                    <input
                      type="text"
                      placeholder="job location"
                      name="location"
                      value={jobData.location}
                      required
                      onChange={handleJobDataChange}
                    />
                  </div>
                  <div className="form-group">
                    <span>
                      <ApartmentIcon />
                    </span>
                    <input
                      type="text"
                      placeholder="job company"
                      name="company"
                      value={jobData.company}
                      required
                      onChange={handleJobDataChange}
                    />
                  </div>
                  <div className="form-group">
                    <span>
                      <CurrencyRupeeIcon />
                    </span>
                    <input
                      type="number"
                      placeholder="job salary"
                      name="salary"
                      value={jobData.salary}
                      onChange={handleJobDataChange}
                    />
                  </div>
                  <div className="textarea-group">
                    <textarea
                      name="requirement"
                      placeholder="additional requirement"
                      value={jobData.requirement}
                      onChange={handleJobDataChange}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <AccountBoxIcon />
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                  <div className="label-group">
                    <label className="radio-label">
                      {" "}
                      <input
                        type="radio"
                        value="internship"
                        checked={types === "internship"}
                        onChange={handleEmploymentTypeChange}
                      />
                      Internship
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        value="contractual"
                        checked={types === "contractual"}
                        onChange={handleEmploymentTypeChange}
                      />
                      Contractual
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        value="full-time"
                        checked={types === "full-time"}
                        onChange={handleEmploymentTypeChange}
                      />
                      Full-time
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        value="part-time"
                        checked={types === "part-time"}
                        onChange={handleEmploymentTypeChange}
                      />
                      Part-time
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="userType">Choose job category : </label>

                    <select
                      id="userType"
                      name="category"
                      required
                      value={jobData.category}
                      onChange={handleJobDataChange}
                    >
                      {allJobsCategory?.map((cat, i) => (
                        <option value={cat?._id} key={i}>
                          {cat?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="userType">Choose user type : </label>
                    <select
                      id="userType"
                      name="experience"
                      required
                      onChange={handleJobDataChange}
                    >
                      {[0, 1, 2, 3, 4, 5].map((year, i) => (
                        <option value={year} key={i}>
                          {year} year of experience
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="submit-btn">Update</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditJob;
