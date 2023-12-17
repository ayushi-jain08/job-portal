import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  userType: {
    type: String,
    enum: ["employer", "jobSeeker"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },

  savedjob: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  applied: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  about: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
      },
      company: {
        type: String,
      },
      from: {
        year: {
          type: Number,
        },
        month: {
          type: String,
        },
      },
      to: {
        toYear: {
          type: Number,
        },
        toMonth: {
          type: String,
        },
      },
    },
  ],
  education: [
    {
      university: {
        type: String,
      },
      degree: {
        type: String,
      },
      field: {
        type: String,
      },
      grade: {
        type: String,
      },
      startYear: {
        type: Number,
      },
      endYear: {
        type: Number,
      },
    },
  ],
  skill: {
    type: String,
    default: "communcation, leadership",
  },
});

//Export the model
const user = mongoose.model("user", userSchema);

export default user;
