import cloudinary from "../Cloudinary.js";
import User from "../Model/User.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../Utils/Error.js";
import Jwt from "jsonwebtoken";

//=================REGISTER USER====================//
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
export const RegisterUser = async (req, res, next) => {
  const { name, email, userType, password } = req.body;

  try {
    let user;
    const hashPassword = bcryptjs.hashSync(password, 10);
    if (!req.files || !req.files.img) {
      // No image present, create user without image
      user = new User({
        name,
        email,
        userType,
        password: hashPassword,
      });
    } else {
      const imageInfo = await uploadImage(req.files.img);

      user = new User({
        name,
        email,
        userType,
        password: hashPassword,
        pic: imageInfo,
      });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      next(errorHandler(400, "This email already exist"));
    }

    await user.save();
    res.status(200).json({
      msg: "User register Successfully!!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//======================LOGIN USER======================//
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(errorHandler(404, "User not found"));
    }
    const ComparePass = bcryptjs.compareSync(password, validUser.password);
    if (!ComparePass) {
      next(errorHandler(401, "Inavlid Credentials"));
    } else {
      const token = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...otherDeatils } = validUser._doc;

      return res.status(200).json({
        users: { otherDeatils, token },
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// ===================USER DATA=======================
export const aboutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const UploadResume = async (req, res, next) => {
  const { _id } = req.user;
  if (!_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    if (!req.files || !req.files.resume) {
      return next(errorHandler(400, "Resume is required"));
    }
    const file = req.files.resume;
    const folder = "resumes";
    const result = cloudinary.uploader.upload(file.tempFilePath, { folder });
    const resumeLink = (await result).secure_url;

    await User.findByIdAndUpdate(_id, { resume: resumeLink });
    res.status(201).json({ message: "Resume uploaded successfully." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getAllEmployers = async (req, res, next) => {
  try {
    const employers = await User.find({ userType: "employer" });

    res.status(200).json(employers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const GetSingleUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const users = await User.findById(userId);
    if (!users) {
      next(errorHandler(400, "User not found"));
    }
    const { password: pass, ...otherDeatils } = users._doc;
    console.log(otherDeatils);
    res.status(200).json(otherDeatils);
  } catch (error) {
    next(error);
  }
};

//======================ADD ABOUT USER==================//
export const AddAboutUser = async (req, res, next) => {
  const { about } = req.body;
  const userId = req.user._id;
  if (!userId) {
    return next(errorHandler(404, "Unauthorized"));
  }
  if (!about) {
    return next(errorHandler(400, "Please fill about user"));
  }
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { about: about },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Additional details added successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//====================ADD EXPERIENCE====================//
export const AddExperience = async (req, res, next) => {
  const userId = req.user._id;
  const { company, title, from, to } = req.body;
  console.log(req.body);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "Unauthorized"));
    }
    user.experience.push({ title, company, from, to });
    await user.save();

    res.status(201).json({ message: "Experience added successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//============================ADD USER EDUCATION========================//
export const AddEducation = async (req, res, next) => {
  const userId = req.user._id;
  const { university, degree, field, startYear, endYear } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "Unauthorized"));
    }
    user.education.push({ university, degree, field, startYear, endYear });

    await user.save();
    res.status(201).json({ message: "Education added successfully" });
  } catch (error) {
    next(error);
  }
};
//====================ADD USER SKILLS=============================//
export const AddSkills = async (req, res, next) => {
  const userId = req.user._id;
  const { skill } = req.body;
  try {
    if (!userId) {
      return next(errorHandler(404, "Unauthorized"));
    }
    if (!skill) {
      return next(errorHandler(400, "Please fill skills of user"));
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { skill: skill },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Additional details added successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
//====================EDIT USER EXPERIENCE====================//
export const EditUserExperience = async (req, res, next) => {
  const { company, title, from, to } = req.body;
  console.log("body", req.body);
  const { expId } = req.params;
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const experiences = user.experience.id(expId);
    console.log("ex", experiences);
    if (!experiences) {
      return next(errorHandler(404, "experience not found"));
    }

    // Update the experience
    experiences.title = title || experiences.title;
    experiences.company = company || experiences.company;
    experiences.from.year = from?.year || experiences.from.year;
    experiences.from.month = from?.month || experiences.from.month;
    experiences.to.toYear = to?.toYear || experiences.to.toYear;
    experiences.to.toMonth = to?.toMonth || experiences.to.toMonth;

    await user.save();

    res.json({ success: true, message: "Experience updated successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//===================EDIT USER EDUCATION=======================//
export const EditUserEducation = async (req, res, next) => {
  const { eduId } = req.params;
  const { university, degree, field, startYear, endYear } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const educations = user.education.id(eduId);
    if (!educations) {
      return next(errorHandler(404, "education not found"));
    }
    educations.university = university || educations.university;
    educations.degree = degree || educations.degree;
    educations.field = field || educations.field;
    educations.startYear = startYear || educations.startYear;
    educations.endYear = endYear || educations.endYear;

    await user.save();

    res.json({ success: true, message: "Education updated successfully" });
  } catch (error) {
    next(error);
  }
};
