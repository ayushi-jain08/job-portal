import express from "express";
import {
  AddToSavedJob,
  CreateJob,
  DeleteSingleJob,
  GetAllJobs,
  GetEmployerJob,
  GetSavedJob,
  GetSingleEmployerJob,
  GetSingleJobDetails,
  JobsBasedOnSkill,
  UpdateJob,
} from "../Controller/Job.js";
import { auth } from "../Utils/Auth.js";
import { CheckUserType } from "../middleware/CheckUserType.js";

const router = express.Router();

router.post("/create", auth, CheckUserType, CreateJob);
router.patch("/edit/:jobId", auth, CheckUserType, UpdateJob);
router.get("/get", GetAllJobs);
router.get("/getsingle/:jobId", GetSingleJobDetails);
router.get("/employerjob", auth, GetSingleEmployerJob);
router.get("/employer/:employerId", GetEmployerJob);
router.post("/saved", auth, AddToSavedJob);
router.get("/getsaved", auth, GetSavedJob);
router.delete("/delete/:jobId", auth, CheckUserType, DeleteSingleJob);
router.get("/skill", auth, JobsBasedOnSkill);

export default router;
