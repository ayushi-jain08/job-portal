import cloudinary from "../Cloudinary.js";
import Application from "../Model/Applicants.js";
import Job from "../Model/Job.js";
import User from "../Model/User.js";
import { errorHandler } from "../Utils/Error.js";

const uploadImage = async (file) => {
  const folder = "images";
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder,
  });
  return {
    public_id: result.public_id,
    url: result.secure_url,
  };
};

//=======================CREATE JOB==============================//
export const CreateJob = async (req, res, next) => {
  const {
    title,
    desc,
    category,
    location,
    company,
    type,
    available,
    experience,
    salary,
    requirements,
    requiredSkills,
  } = req.body;
  const userId = req.user._id;
  if (!userId) {
    next(errorHandler(404, "User not found"));
  }
  try {
    let jobs;
    if (!req.files || !req.files.photo) {
      // No image present, create user without image
      jobs = new Job({
        title,
        desc,
        category,
        location,
        company,
        type,
        available,
        experience,
        salary,
        requirements,
        requiredSkills,
        postedBy: userId,
      });
    } else {
      const imageInfo = await uploadImage(req.files.photo);
      jobs = new Job({
        title,
        desc,
        category,
        location,
        company,
        type,
        available,
        experience,
        salary,
        requirements,
        requiredSkills,
        image: imageInfo,
        postedBy: userId,
      });
    }
    await jobs.save();
    res.status(201).json({
      success: true,
      message: "Job Successfully Created",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// =======================UPDATE JOB==============================//
export const UpdateJob = async (req, res, next) => {
  const { jobId } = req.params;

  const {
    title,
    desc,
    category,
    location,
    company,
    type,
    available,
    experience,
    salary,
    requirements,
    requiredSkills,
  } = req.body;
  const userId = req.user._id;
  if (!userId) {
    next(errorHandler(404, "User not found"));
  }
  try {
    const updateJob = await Job.findById(jobId);
    if (!updateJob) {
      return next(errorHandler(404, "Job not found"));
    }
    if (updateJob.postedBy.toString() !== req.user._id.toString()) {
      return next(errorHandler(403, "Only the Job Creator can Edit this Job"));
    }

    // Update product properties based on request body
    if (title) {
      updateJob.title = title;
    }
    if (desc) {
      updateJob.desc = desc;
    }
    if (category) {
      updateJob.category = category;
    }
    if (location) {
      updateJob.location = location;
    }
    if (company) {
      updateJob.company = company;
    }
    if (type) {
      updateJob.type = type;
    }
    if (experience) {
      updateJob.experience = experience;
    }
    if (salary) {
      updateJob.salary = salary;
    }
    if (requirements) {
      updateJob.requirements = requirements;
    }
    if (requiredSkills) {
      updateJob.requiredSkills = requiredSkills;
    }
    if (req.files && req.files.photo) {
      await cloudinary.uploader.destroy(updateJob?.image);
      const imageInfo = await uploadImage(req.files.photo);
      updateJob.image = imageInfo;
    }
    await updateJob.save();
    res.status(201).json({
      success: true,
      updateJob,
      message: "Job Successfully updated",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//===================GET ALL JOB=======================//
export const GetAllJobs = async (req, res, next) => {
  try {
    const { category, type, location, search, sort, experience } = req.query;

    const page = parseInt(req.query.page) || 1;
    const perpage = 6;

    const startIndex = (page - 1) * perpage;
    // Build the query object based on filters
    const query = {};
    if (category) {
      query.category = category;
    }
    if (type) {
      query.type = type;
    }
    if (location) {
      query.location = location;
    }
    let sortOption = { createdAt: -1 }; // Default to sorting by latest jobs

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }
    if (experience !== undefined && experience !== null && experience !== "") {
      // Only include experience in the query if it's not an empty string
      query.experience = { $gte: 0, $lte: experience };
    }
    if (search) {
      query.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { company: { $regex: new RegExp(search, "i") } },
      ];
    }
    const totalProducts = await Job.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / perpage);

    // Find all jobs with pagination and filters
    const jobs = await Job.find(query)
      .sort(sortOption)
      .skip(startIndex)
      .limit(perpage)
      .populate("category")
      .populate("postedBy");

    if (!jobs) {
      res.status(400).json({
        meassage: "no product found",
      });
    }
    res.status(200).json({ success: true, jobs, totalProducts, totalPages });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//===================SINGLE JOB DETAILS PAGE========================//
export const GetSingleJobDetails = async (req, res, next) => {
  const { jobId } = req.params;
  try {
    const jobs = await Job.findById(jobId)
      .populate("postedBy", "name email")
      .populate("applications", "user");
    if (!jobs) {
      return next(400, "Job not found");
    }
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

//==========================GET ALL JOBS OF SINGLE EMPLOYEER=====================//
export const GetSingleEmployerJob = async (req, res, next) => {
  try {
    const employerId = req.user._id;
    const jobs = await Job.find({ postedBy: employerId });
    if (!jobs) {
      return next(errorHandler(404, "No jobs found"));
    }
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs created by employer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const GetEmployerJob = async (req, res, next) => {
  try {
    const { employerId } = req.params;
    const jobs = await Job.find({ postedBy: employerId });
    if (!jobs) {
      return next(errorHandler(404, "No jobs found"));
    }
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs created by employer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ==================ADD TO SAVED==================
export const AddToSavedJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: "Invalid User" });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      console.error(`Job with ID ${jobId} not found.`);
      return res.status(404).json({ message: "Job not found" });
    }

    const existingSavedJobIndex = user.savedjob.findIndex(
      (savedJob) => savedJob.toString() === jobId
    );

    if (existingSavedJobIndex !== -1) {
      // Job is already saved, so remove it
      user.savedjob.splice(existingSavedJobIndex, 1);
      await user.save();
      return res.status(200).json({ success: true, jobId });
    } else {
      // Job is not saved, so add it
      user.savedjob.push(jobId);
      await user.save();
      return res.status(200).json({ success: true, jobId });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
};
// ==========================GET SAVED JOB====================
export const GetSavedJob = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("savedjob");
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const savedlistItem = user.savedjob.map((saveitem) => ({
      ...saveitem.toObject(),
    }));
    res.status(200).json(savedlistItem);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//===================DELETE JOBS=====================//
export const DeleteSingleJob = async (req, res, next) => {
  const { jobId } = req.params;
  const userId = req.user._id;
  try {
    console.log("Attempting to delete job:", jobId);
    const job = await Job.findById(jobId);
    if (!job) {
      console.log("Job not found:", jobId);
      return next(errorHandler(404, "Job not found"));
    }
    if (job.postedBy.toString() !== req.user._id.toString()) {
      console.log("Unauthorized: You can only delete your own jobs");
      return next(
        errorHandler(403, "Unauthorized: You can only delete your own jobs")
      );
    }
    const usersToUpdate = await User.find({ savedjob: jobId });

    // Update each user by filtering the savedjob array
    await Promise.all(
      usersToUpdate.map(async (user) => {
        const updatedSavedJob = user.savedjob.filter(
          (savedJobId) => savedJobId.toString() !== jobId
        );
        await User.findByIdAndUpdate(
          user._id,
          { savedjob: updatedSavedJob },
          { new: true }
        );
      })
    );

    const applications = await Application.find({ job: jobId });

    // Remove each application
    await Promise.all(
      applications.map(async (application) => {
        await application.deleteOne();
      })
    );

    await job.deleteOne();
    console.log("Job deleted successfully:", jobId);
    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    next(error);
  }
};

//================JOB ACCORDING TO SKILL=====================//
export const JobsBasedOnSkill = async (req, res, next) => {
  const userSkills = req.user.skill;
  console.log("skill", userSkills);
  if (!userSkills || typeof userSkills !== "string") {
    return res
      .status(400)
      .json({ error: "Skills parameter is required and should be a string" });
  }
  try {
    const userSkillsArray = userSkills.split(",").map((skill) => skill.trim());

    console.log("pp", userSkillsArray);
    // Create case-insensitive regular expressions for each skill
    const caseInsensitiveRegex = userSkillsArray.map(
      (skill) => new RegExp(skill, "i")
    );
    console.log("oo", caseInsensitiveRegex);
    // Find jobs where at least one skill matches using $in
    const jobs = await Job.find({
      requiredSkills: { $in: caseInsensitiveRegex },
    });

    res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
