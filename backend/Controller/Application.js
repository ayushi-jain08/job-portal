import Application from "../Model/Applicants.js";
import Job from "../Model/Job.js";
import User from "../Model/User.js";
import { errorHandler } from "../Utils/Error.js";

//==========================JOB APPLIED BY JOBSEEKER===================//
export const ApplyForJob = async (req, res, next) => {
  const { jobId } = req.params;
  const userId = req.user._id;
  console.log("oo", userId);
  const { whyHireYou } = req.body;
  if (!userId) {
    next(errorHandler(404, "User not found"));
  }
  try {
    const job = await Job.findById(jobId);

    // Check if the job creator is the same as the user applying
    if (job && job.postedBy.equals(userId)) {
      return res
        .status(403)
        .json({ message: "You cannot apply for your own job." });
    }
    const existingApplication = await Application.findOne({
      job: jobId,
      user: userId,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job." });
    }

    const application = new Application({
      job: jobId,
      user: userId,
      whyHireYou,
    });

    await application.save();

    // Update the job's applications array
    await Job.findByIdAndUpdate(jobId, {
      $push: { applications: application._id },
    });
    await User.findByIdAndUpdate(userId, {
      $push: { applied: application._id },
    });
    res.status(201).json({ message: "Application submitted successfully." });
  } catch (error) {
    console.log(error);
    next(errorHandler(error));
  }
};

//======================APPLICATION FOR SINGLE JOB====================//
export const ApplicationForSingleJob = async (req, res, next) => {
  const { jobId } = req.params;
  console.log("oo", jobId);
  if (!jobId) {
    return next(errorHandler(400, "Job not found"));
  }
  try {
    const applications = await Application.find({
      job: jobId,
    })
      .populate({
        path: "job",
        match: { "postedBy._id": req.user._id }, // Assuming user is authenticated, and req.user contains user details
      })
      .populate("user");

    // Filter out applications where job.postedBy._id !== req.user._id

    res.json(applications);
  } catch (error) {
    console.error("Error fetching job applicants:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//===========================TOTAL JOB APPLIED BY SINGLE JOBSEEKER===================//
export const TotalAppliedJobOfSingleUser = async (req, res, next) => {
  try {
    const jobSeekerId = req.user._id;
    const applications = await Application.find({
      user: jobSeekerId,
    }).populate("job");
    res.status(200).json(applications);
  } catch (error) {
    console.log("eeee", error);
    next(error);
  }
};
