import express from "express";
import { auth } from "../Utils/Auth.js";
import {
  ApplicationForSingleJob,
  ApplyForJob,
  TotalAppliedJobOfSingleUser,
} from "../Controller/Application.js";
import { CheckEmployer, CheckUserType } from "../middleware/CheckUserType.js";
const router = express.Router();

router.post("/:jobId/apply", auth, ApplyForJob);
router.get("/:jobId/applyjob", auth, CheckUserType, ApplicationForSingleJob);
router.get(
  "/jobseeker/appliedjobs",
  auth,
  CheckEmployer,
  TotalAppliedJobOfSingleUser
);

export default router;
