import React, { useEffect, useState } from "react";
import "./CreateJob.css";
import log1 from "../../Images/create.png";
import TitleIcon from "@mui/icons-material/Title";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FetchCreateJob, fetchAllJobCategory } from "../../Redux/Slices/Job";
import Loading from "../Loading/Loading";

const CreateJob = () => {
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const jobsInfo = useSelector((state) => state.job);
  const { allJobsCategory, loading } = jobsInfo;
  const [type, setType] = useState("");
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
    dispatch(fetchAllJobCategory());
  }, [dispatch]);
  const handleJobDataChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setJobData({ ...jobData, [name]: value });
  };
  const handleEmploymentTypeChange = async (event) => {
    setType(event.target.value);
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
      FetchCreateJob({
        title,
        desc,
        location,
        company,
        salary,
        requirement,
        type,
        image,
        experience,
        category,
      })
    );
    setJobData({
      title: "",
      desc: "",
      location: "",
      company: "",
      salary: "",
      requirement: "",
      experience: "",
      category: "",
    });
    setType("");
    setImage("");
    toast.success("Your job Created successfully");
  };

  return (
    <>
      <div className="create-job">
        {loading ? (
          <Loading />
        ) : (
          <div className="create-job-container">
            <div className="create-job-content">
              <div className="img">
                <h2>Create Job</h2>
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
                        checked={type === "internship"}
                        onChange={handleEmploymentTypeChange}
                      />
                      Internship
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        value="contractual"
                        checked={type === "contractual"}
                        onChange={handleEmploymentTypeChange}
                      />
                      Contractual
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        value="full-time"
                        checked={type === "full-time"}
                        onChange={handleEmploymentTypeChange}
                      />
                      Full-time
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        value="part-time"
                        checked={type === "part-time"}
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
                  <button className="submit-btn">Create</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateJob;
