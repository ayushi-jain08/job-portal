import express from "express";
import {
  CreateJobCategory,
  GetAllJobCategory,
  GetSingleJobSubcategory,
} from "../Controller/Category.js";

const router = express.Router();

router.post("/create", CreateJobCategory);
router.get("/get", GetAllJobCategory);
router.get("/single/:catID", GetSingleJobSubcategory);

export default router;
