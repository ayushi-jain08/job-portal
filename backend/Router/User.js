import express from "express";
import {
  AddAboutUser,
  AddEducation,
  AddExperience,
  AddSkills,
  EditUserEducation,
  EditUserExperience,
  GetSingleUser,
  RegisterUser,
  UploadResume,
  aboutUser,
  getAllEmployers,
  loginUser,
} from "../Controller/User.js";
import { CheckEmployer } from "../middleware/CheckUserType.js";
import { auth } from "../Utils/Auth.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", loginUser);
router.get("/about", auth, aboutUser);
router.post("/upload-resume", auth, CheckEmployer, UploadResume);
router.get("/employers", getAllEmployers);
router.get("/single/:userId", GetSingleUser);
router.post("/add/about", auth, AddAboutUser);
router.post("/add/experience", auth, AddExperience);
router.post("/add/education", auth, AddEducation);
router.post("/add/skill", auth, AddSkills);
router.patch("/edit/exp/:expId", auth, EditUserExperience);
router.patch("/edit/edu/:eduId", auth, EditUserEducation);
export default router;
