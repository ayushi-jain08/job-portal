// models/Application.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  whyHireYou: String, // Add the whyHireYou field
  // other application fields
});

const Application = mongoose.model("application", applicationSchema);

export default Application;
