import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddAboutUser,
  fetchAddUserEducation,
  fetchAddUserExperience,
  fetchAddUserSkill,
  fetchEditJobEducation,
  fetchEditJobExperience,
  fetchUserData,
} from "../../Redux/Slices/User";
import BadgeIcon from "@mui/icons-material/Badge";
import "./UserProfile.css";
import VerifiedIcon from "@mui/icons-material/Verified";
import userPic from "../../Images/avtar.png";
import {
  FetchEmployerCreatedJob,
  FetchUserAplliedJob,
  fetchSavedJob,
} from "../../Redux/Slices/Job";
import JobCard from "../Jobs/JobCard";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { Dialog } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import explogo from "../../Images/exp.png";
import SchoolIcon from "@mui/icons-material/School";
import InventoryIcon from "@mui/icons-material/Inventory";
import Skeleton from "@mui/material/Skeleton";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const UserProfile = ({ path = "login" }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [addUser, setAddUser] = useState(false);
  const [addExperience, setAddExperience] = useState(false);
  const [editExperience, setEditExperience] = useState(false);
  const [editExperienceData, setEditExperienceData] = useState({
    company: "",
    title: "",
    from: {
      year: "",
      month: "",
    },
    to: {
      toYear: "",
      toMonth: "",
    },
  });

  const [addEducation, setAddEducation] = useState(false);
  const [editEducation, setEditEducation] = useState(false);
  const [editEducationData, setEditEducationData] = useState({
    _id: "",
    university: "",
    degree: "",
    field: "",
    grade: "",
    startYear: "",
    endYear: "",
  });
  const [addSkills, setAddSkills] = useState(false);
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [from, setFrom] = useState({
    year: "",
    month: "",
  });

  const [to, setTo] = useState({
    toYear: "",
    toMonth: "",
  });
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [grade, setGrade] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [skill, setSkill] = useState("");
  const [work, setWork] = useState(false);
  const [aboutUser, setAboutUser] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("applied");
  const users = useSelector((state) => state.user);
  const { UserAllDetails, currentUser } = users;
  const jobs = useSelector((state) => state.job);
  const { employeerjob, userAppliedJob, loading, SavedJobs } = jobs;
  const { name, email, userType, about } = UserAllDetails;
  const years = [2000, 2001, 2002, 2003, 2004];
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  useEffect(() => {
    if (!storedUserInfo || !currentUser) {
      navigate(`/${path}`, {
        state: location.pathname,
      });
    }
    dispatch(fetchUserData());
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSavedJob());
    if (UserAllDetails && UserAllDetails?.userType) {
      if (UserAllDetails?.userType !== "jobSeeker") {
        dispatch(FetchEmployerCreatedJob());
      } else {
        dispatch(FetchUserAplliedJob());
      }
    }
  }, [dispatch, UserAllDetails]);
  const handleAboutUser = async () => {
    if (!aboutUser) {
      toast.warning("please fill something in about user");
      return;
    }
    await dispatch(fetchAddAboutUser(aboutUser));
    await dispatch(fetchUserData());
    toast.success("Your about is updated successfully");
  };
  useEffect(() => {
    if (about) {
      setAboutUser(about);
    }
    if (UserAllDetails?.skill) {
      setSkill(UserAllDetails?.skill);
    }
    // eslint-disable-next-line
  }, [UserAllDetails]);
  const handleFromChange = (event) => {
    const { name, value } = event.target;
    setFrom((prevFrom) => ({ ...prevFrom, [name]: value }));
  };

  const handleToChange = (event) => {
    const { name, value } = event.target;
    setTo((prevTo) => ({ ...prevTo, [name]: value }));
  };
  const handleExperienceUser = async () => {
    if (!company || !title) {
      toast.warning("please fill company & title in experience");
      return;
    }
    await dispatch(fetchAddUserExperience({ company, title, from, to }));
    await dispatch(fetchUserData());
    toast.success("Your experience is updated successfully");

    setCompany("");
    setTitle("");
    setFrom({
      year: "",
      month: "",
    });
    setTo({
      toYear: "",
      toMonth: "",
    });
    setAddExperience(false);
  };
  const handleUserEducation = async () => {
    if (!university || !degree || !field || !grade || !startYear || !endYear) {
      toast.warning("please fill all details");
      return;
    }
    await dispatch(
      fetchAddUserEducation({
        university,
        degree,
        field,
        grade,
        startYear,
        endYear,
      })
    );
    await dispatch(fetchUserData());
    toast.success("Your education is added successfully");
    setDegree("");
    setField("");
    setGrade("");
    setStartYear("");
    setEndYear("");
    setUniversity("");
    setAddEducation(false);
  };
  const handleUserSkill = async () => {
    if (!skill) {
      toast.warning("please fill your skills");
      return;
    }
    await dispatch(fetchAddUserSkill({ skill }));
    await dispatch(fetchUserData());
    toast.success("Your skills is added successfully");
    setAddSkills(false);
  };
  //===================EDIT EXPERIENCE==================//
  const handleEditExperience = async (experience) => {
    setEditExperienceData({
      _id: experience?._id || "",
      company: experience?.company || "",
      title: experience?.title || "",
      from: {
        year: experience?.from?.year || "",
        month: experience?.from?.month || "",
      },
      to: {
        toYear: experience?.to?.toYear || "",
        toMonth: experience?.to?.toMonth || "",
      },
      // ... populate other fields as needed
    });
    setEditExperience(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("from") || name.startsWith("to")) {
      // Handle nested properties like 'from.year', 'from.month', etc.
      const [nestedProperty, nestedKey] = name.split(".");
      setEditExperienceData((prevData) => ({
        ...prevData,
        [nestedProperty]: {
          ...prevData[nestedProperty],
          [nestedKey]: value,
        },
      }));
    } else {
      // Handle regular properties
      setEditExperienceData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUpdateUserExperience = async (expId) => {
    await dispatch(
      fetchEditJobExperience({
        expId,
        company: editExperienceData.company,
        title: editExperienceData.title,
        from: editExperienceData.from,
        to: editExperienceData.to,
      })
    );
    setEditExperience(false);
    await dispatch(fetchUserData());
    toast.success("Your Experience updated successfully");
  };
  const handleEditEducation = async (education) => {
    setEditEducationData({
      _id: education?._id || "",
      university: education?.university || "",
      degree: education?.degree || "",
      field: education?.field || "",
      grade: education?.grade || "",
      startYear: education?.startYear || "",
      endYear: education?.endYear || "",
    });
    setEditEducation(true);
  };
  const handleEducationEditChange = (e) => {
    const { name, value } = e.target;
    setEditEducationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmitEditEducation = async (eduId) => {
    const { university, degree, field, grade, startYear, endYear } =
      editEducationData;
    await dispatch(
      fetchEditJobEducation({
        eduId,
        university,
        degree,
        field,
        grade,
        startYear,
        endYear,
      })
    );
    setEditEducation(false);
    await dispatch(fetchUserData());
    toast.success("Your Education updated successfully");
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-page">
        <div className="user-display-info">
          <div className="user-all-info">
            <div className="user-top-info">
              {loading ? (
                <div>
                  <Skeleton variant="circular" width={60} height={60} />
                  <Skeleton
                    variant="rectangular"
                    width={80}
                    height={10}
                    style={{ marginTop: "8px" }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={150}
                    height={15}
                    style={{ marginTop: "5px" }}
                  />
                  <Skeleton
                    variant="rounded"
                    width={150}
                    height={15}
                    style={{ marginTop: "5px" }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
                  {userType !== "employer" ? (
                    <>
                      {UserAllDetails?.pic ? (
                        <div className="user-image">
                          <img src={UserAllDetails?.pic.url} alt="" />
                        </div>
                      ) : (
                        <div className="user-image">
                          {" "}
                          <img src={userPic} alt="userpic" />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {UserAllDetails?.pic ? (
                        <div className="user-image">
                          <img src={UserAllDetails?.pic.url} alt="" />

                          <VerifiedIcon />
                        </div>
                      ) : (
                        <div className="user-image">
                          {" "}
                          <img src={userPic} alt="userpic" />
                          <VerifiedIcon />
                        </div>
                      )}
                    </>
                  )}
                  <h3>{name}</h3>
                  <span>{email}</span>
                  {userType !== "jobSeeker" ? (
                    <span
                      style={{
                        textTransform: "capitalize",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      <BadgeIcon style={{ color: "rgb(100, 100, 100)" }} />
                      {userType}
                    </span>
                  ) : (
                    <span
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {userType}
                    </span>
                  )}
                </div>
              )}
              {userType === "employer" && (
                <NavLink to="/createjob">
                  <button className="create-btn">Create Job</button>
                </NavLink>
              )}
            </div>
            <div className="about-user">
              <p>About</p>
              {about ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {loading ? (
                    <Skeleton
                      variant="text"
                      width={250}
                      sx={{ fontSize: "1rem" }}
                      style={{ marginTop: "5px" }}
                    />
                  ) : (
                    <>
                      <span style={{ color: "rgb(137, 136, 136) !important" }}>
                        {about}
                      </span>
                      <button
                        style={{ color: "rgb(91, 90, 90)" }}
                        onClick={() => setAddUser(!addUser)}
                      >
                        <EditIcon />
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <button onClick={() => setAddUser(!addUser)}>
                    + Add summary
                  </button>
                </>
              )}
            </div>
            <Dialog
              open={addUser}
              fullScreen={fullScreen}
              PaperProps={{
                className: "fullScreenDialog",
              }}
            >
              <Paper className="DialogBox">
                <div className="top">
                  <h2 onClick={() => setAddUser(!addUser)}>
                    <KeyboardBackspaceIcon />
                    Edit About
                  </h2>
                  <button onClick={handleAboutUser}>save</button>
                </div>
                <textarea
                  name="about"
                  placeholder="Summary"
                  value={aboutUser}
                  onChange={(e) => setAboutUser(e.target.value)}
                />
              </Paper>
            </Dialog>
            <div className="add-experience">
              <p>Experience</p>
              {loading ? (
                <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton
                    variant="rectangular"
                    width={200}
                    height={50}
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              ) : (
                <>
                  {UserAllDetails?.experience ? (
                    <>
                      {UserAllDetails?.experience?.map((exp) => (
                        <div className="user-display-flex" key={exp?._id}>
                          <div className="user-experience-card">
                            <img
                              src={explogo}
                              alt="experience"
                              width={"50px"}
                              height={"50px"}
                            />
                            <div>
                              <h3>{exp?.title}</h3>
                              <p>{exp?.company}</p>
                              <span>
                                {exp?.from?.month}&nbsp;
                                {exp?.from?.year} - {exp?.to?.toMonth} &nbsp;
                                {exp?.to?.toYear}
                              </span>
                            </div>
                          </div>
                          <button
                            style={{ color: "rgb(91, 90, 90)" }}
                            onClick={() => handleEditExperience(exp)}
                          >
                            <EditIcon />
                          </button>
                        </div>
                      ))}
                      <button onClick={() => setAddExperience(!addExperience)}>
                        + Add experience
                      </button>
                    </>
                  ) : (
                    <button onClick={() => setAddExperience(!addExperience)}>
                      + Add experience
                    </button>
                  )}
                </>
              )}
            </div>
            <Dialog
              open={addExperience}
              fullScreen={fullScreen}
              PaperProps={{
                className: "fullScreenDialog",
              }}
            >
              <Paper className="DialogBox">
                <div className="top">
                  <h2 onClick={() => setAddExperience(!addExperience)}>
                    <KeyboardBackspaceIcon />
                    Add experience
                  </h2>
                  <button onClick={handleExperienceUser}>save</button>
                </div>
                <form className="form-group">
                  <TextField
                    id="outlined-basic"
                    label="Company"
                    variant="outlined"
                    size="small"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    size="small"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <div>
                    <div className="time-period">
                      <p>Time period</p>
                      <Checkbox
                        {...label}
                        checked={work}
                        color="success"
                        className="checkbox"
                        onClick={() => setWork(!work)}
                      />
                      <span>I currently work here</span>
                    </div>
                    <div className="from">
                      <p>From</p>
                      <div>
                        <select
                          value={from.year}
                          name="year"
                          placeholder="Year"
                          onChange={handleFromChange}
                        >
                          {years?.map((item, i) => (
                            <option value={item} key={i}>
                              {item}
                            </option>
                          ))}
                        </select>

                        <select
                          value={from.month}
                          name="month"
                          onChange={handleFromChange}
                        >
                          {months?.map((item, i) => (
                            <option value={item} key={i}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {!work && (
                      <div className="to">
                        <p>To</p>
                        <div>
                          <select
                            value={to.toYear}
                            name="toYear"
                            onChange={handleToChange}
                          >
                            {years?.map((item, i) => (
                              <option value={item} key={i}>
                                {item}
                              </option>
                            ))}
                          </select>

                          <select
                            value={to.toMonth}
                            name="toMonth"
                            onChange={handleToChange}
                          >
                            {months?.map((item, i) => (
                              <option value={item} key={i}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </Paper>
            </Dialog>
            {/* ===================EDIT EXP================= */}
            <Dialog
              open={editExperience}
              fullScreen={fullScreen}
              PaperProps={{
                className: "fullScreenDialog",
              }}
            >
              <Paper className="DialogBox">
                <div className="top">
                  <h2 onClick={() => setEditExperience(!editExperience)}>
                    <KeyboardBackspaceIcon />
                    Edit experience
                  </h2>
                  <button
                    onClick={() =>
                      handleUpdateUserExperience(editExperienceData._id)
                    }
                  >
                    Update
                  </button>
                </div>
                <form className="form-group">
                  {editExperienceData && (
                    <>
                      {" "}
                      <TextField
                        id="outlined-basic"
                        label="Company"
                        name="company"
                        variant="outlined"
                        size="small"
                        value={editExperienceData.company}
                        onChange={handleInputChange}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Title"
                        name="title"
                        variant="outlined"
                        size="small"
                        value={editExperienceData.title}
                        onChange={handleInputChange}
                      />
                      <div>
                        <div className="time-period">
                          <p>Time period</p>
                          <Checkbox
                            {...label}
                            checked={work}
                            color="success"
                            className="checkbox"
                            onClick={() => setWork(!work)}
                          />
                          <span>I currently work here</span>
                        </div>
                        <div className="from">
                          <p>From</p>
                          <div>
                            <select
                              value={editExperienceData?.from?.year}
                              name="from.year"
                              placeholder="Year"
                              onChange={handleInputChange}
                            >
                              {years?.map((item, i) => (
                                <option value={item} key={i}>
                                  {item}
                                </option>
                              ))}
                            </select>

                            <select
                              value={editExperience?.from?.month}
                              name="from.month"
                              onChange={handleInputChange}
                            >
                              {months?.map((item, i) => (
                                <option value={item} key={i}>
                                  {item}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {!work && (
                          <div className="to">
                            <p>To</p>
                            <div>
                              <select
                                value={editExperienceData?.to?.toYear}
                                name="to.toYear"
                                onChange={handleInputChange}
                              >
                                {years?.map((item, i) => (
                                  <option value={item} key={i}>
                                    {item}
                                  </option>
                                ))}
                              </select>

                              <select
                                value={editExperienceData?.to?.toMonth}
                                name="to.toMonth"
                                onChange={handleInputChange}
                              >
                                {months?.map((item, i) => (
                                  <option value={item} key={i}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </form>
              </Paper>
            </Dialog>
            <div className="add-education">
              <p>Education</p>
              {loading ? (
                <>
                  <div
                    style={{ display: "flex", gap: "8px", marginTop: "10px" }}
                  >
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton
                      variant="rectangular"
                      width={200}
                      height={50}
                      style={{ borderRadius: "8px" }}
                    />
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  {UserAllDetails?.education ? (
                    <>
                      {UserAllDetails?.education?.map((edu) => (
                        <div className="user-display-flex" key={edu?._id}>
                          <div className="user-education-card">
                            <span>
                              <SchoolIcon />
                            </span>
                            <div>
                              <h3>{edu?.university}</h3>
                              <p>
                                {edu?.degree}( {edu?.field})
                              </p>
                              <span>
                                {edu.startYear}-{edu?.endYear}
                              </span>
                            </div>
                          </div>
                          <button
                            style={{ color: "rgb(91, 90, 90)" }}
                            onClick={() => handleEditEducation(edu)}
                          >
                            <EditIcon />
                          </button>
                        </div>
                      ))}
                      <button onClick={() => setAddEducation(!addEducation)}>
                        + Add education
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setAddEducation(!addEducation)}>
                        + Add education
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
            <Dialog
              open={addEducation}
              fullScreen={fullScreen}
              PaperProps={{
                className: "fullScreenDialog",
              }}
            >
              <Paper className="DialogBox">
                <div className="top">
                  <h2 onClick={() => setAddEducation(!addEducation)}>
                    <KeyboardBackspaceIcon />
                    Add Education
                  </h2>
                  <button onClick={handleUserEducation}>save</button>
                </div>
                <form className="form-group">
                  <TextField
                    id="outlined-basic"
                    label="Institution/University"
                    variant="outlined"
                    size="small"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Degree"
                    variant="outlined"
                    size="small"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Field of study"
                    variant="outlined"
                    size="small"
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Grade"
                    variant="outlined"
                    size="small"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                  />
                  <div className="year">
                    <div>
                      <p>start year</p>
                      <select
                        value={startYear}
                        placeholder="Year"
                        onChange={(e) => setStartYear(e.target.value)}
                      >
                        {years?.map((item, i) => (
                          <option value={item} key={i}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <p>End year</p>
                      <select
                        value={endYear}
                        placeholder="Year"
                        onChange={(e) => setEndYear(e.target.value)}
                      >
                        {years?.map((item, i) => (
                          <option value={item} key={i}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>
              </Paper>
            </Dialog>
            {/* ============================EDIT EDUCATION======================= */}
            <Dialog
              open={editEducation}
              fullScreen={fullScreen}
              PaperProps={{
                className: "fullScreenDialog",
              }}
            >
              <Paper className="DialogBox">
                <div className="top">
                  <h2 onClick={() => setEditEducation(false)}>
                    <KeyboardBackspaceIcon />
                    Edit Education
                  </h2>
                  <button
                    onClick={() =>
                      handleSubmitEditEducation(editEducationData._id)
                    }
                  >
                    Update
                  </button>
                </div>
                <form className="form-group">
                  <TextField
                    id="outlined-basic"
                    label="Institution/University"
                    variant="outlined"
                    name="university"
                    size="small"
                    value={editEducationData.university}
                    onChange={handleEducationEditChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Degree"
                    variant="outlined"
                    name="degree"
                    size="small"
                    value={editEducationData.degree}
                    onChange={handleEducationEditChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Field of study"
                    variant="outlined"
                    size="small"
                    name="field"
                    value={editEducationData.field}
                    onChange={handleEducationEditChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Grade"
                    variant="outlined"
                    size="small"
                    name="grade"
                    value={editEducationData.grade}
                    onChange={handleEducationEditChange}
                  />
                  <div className="year">
                    <div>
                      <p>start year</p>
                      <select
                        value={editEducationData.startYear}
                        name="startYear"
                        placeholder="Year"
                        onChange={handleEducationEditChange}
                      >
                        {years?.map((item, i) => (
                          <option value={item} key={i}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <p>End year</p>
                      <select
                        value={editEducationData.endYear}
                        placeholder="Year"
                        name="endYear"
                        onChange={handleEducationEditChange}
                      >
                        {years?.map((item, i) => (
                          <option value={item} key={i}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>
              </Paper>
            </Dialog>
            <div className="add-skills">
              <p>Skills</p>
              {loading ? (
                <Skeleton
                  variant="text"
                  width={350}
                  sx={{ fontSize: "1rem" }}
                  style={{ marginTop: "5px" }}
                />
              ) : (
                <>
                  {" "}
                  {UserAllDetails?.skill ? (
                    <>
                      <div className="user-skill-card">
                        <p>{UserAllDetails?.skill}</p>
                      </div>
                      <button onClick={() => setAddSkills(!addSkills)}>
                        + Add skills
                      </button>
                    </>
                  ) : (
                    <>
                      {" "}
                      <button onClick={() => setAddSkills(!addSkills)}>
                        + Add skills
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
            <Dialog
              open={addSkills}
              fullScreen={fullScreen}
              PaperProps={{
                className: "fullScreenDialog",
              }}
            >
              <Paper className="DialogBox">
                <div className="top">
                  <h2 onClick={() => setAddSkills(!addSkills)}>
                    <KeyboardBackspaceIcon />
                    Add Skills
                  </h2>
                  <button onClick={handleUserSkill}>save</button>
                </div>
                <form className="form-group">
                  <textarea
                    placeholder="Add skills (e.g.,Data Analysis)"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                  />
                </form>
              </Paper>
            </Dialog>
          </div>
        </div>
        <br />
        <hr />
        {userType === "jobSeeker" ? (
          <>
            <div className="swipe-userType">
              <div className="jobseeker_employer_toggle">
                <p
                  onClick={() => setActiveTab("applied")}
                  className={activeTab === "applied" ? "active-tab" : ""}
                >
                  Applied
                </p>
                <p
                  onClick={() => setActiveTab("saved")}
                  className={activeTab === "saved" ? "active-tab" : ""}
                >
                  Saved
                </p>
              </div>
              {loading ? (
                <Loading />
              ) : (
                <div className="job-list-container">
                  {activeTab === "applied" && (
                    <div className="job-applied">
                      {userAppliedJob?.length < 1 ? (
                        <h2
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "30px",
                            color: "gray",
                          }}
                        >
                          <InventoryIcon />
                          &nbsp; No Jobs Created
                        </h2>
                      ) : (
                        userAppliedJob?.map((appl) => (
                          <JobCard item={appl.job} key={appl._id} />
                        ))
                      )}
                    </div>
                  )}
                  {activeTab === "saved" && (
                    <div className="job-saved">
                      {SavedJobs?.length < 1 ? (
                        <h2
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "30px",
                            color: "gray",
                          }}
                        >
                          {" "}
                          <InventoryIcon />
                          &nbsp; No Job Saved
                        </h2>
                      ) : (
                        SavedJobs?.map((item) => (
                          <JobCard key={item._id} item={item} />
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="swipe-userType">
              <div className="jobseeker_employer_toggle">
                <p
                  onClick={() => setActiveTab("applied")}
                  className={activeTab === "applied" ? "active-tab" : ""}
                >
                  Created
                </p>
                <p
                  onClick={() => setActiveTab("saved")}
                  className={activeTab === "saved" ? "active-tab" : ""}
                >
                  Saved
                </p>
              </div>
              {loading ? (
                <Loading />
              ) : (
                <div className="job-list-container">
                  {activeTab === "applied" && (
                    <div className="job-created">
                      {employeerjob?.length < 1 ? (
                        <h2
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "30px",
                            color: "gray",
                          }}
                        >
                          {" "}
                          <InventoryIcon />
                          &nbsp; No Jobs Created
                        </h2>
                      ) : (
                        employeerjob?.map((item) => (
                          <JobCard key={item._id} item={item} />
                        ))
                      )}
                    </div>
                  )}
                  {activeTab === "saved" && (
                    <div className="saved">
                      {SavedJobs?.length < 1 ? (
                        <h2
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "30px",
                            color: "gray",
                          }}
                        >
                          {" "}
                          <InventoryIcon />
                          &nbsp; No Job Saved
                        </h2>
                      ) : (
                        SavedJobs?.map((item) => (
                          <JobCard key={item._id} item={item} />
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
