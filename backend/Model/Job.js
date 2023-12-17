import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories", // Assuming you have a Category model
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
  },
  requirements: {
    type: [String],
  },
  type: {
    type: String,
    enum: ["full-time", "part-time", "contractual", "internship"],
    required: true,
  },
  experience: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
    default: "Fresher",
  },
  available: {
    type: Boolean,
    default: true,
  },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  requiredSkills: {
    type: String,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Assuming you have a User model for job poster
    required: true,
  },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "application" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
