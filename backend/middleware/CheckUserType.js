import User from "../Model/User.js";

export const CheckEmployer = async (req, res, next) => {
  try {
  
    const userId = req.user._id; // Assuming you have middleware to extract user from the request
  
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.userType !== "jobSeeker") {
      return res
        .status(403)
        .json({ message: "Access forbidden for employeer" });
    }
    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Unexpected error during user type check" });
  }
};

export const CheckUserType = async (req, res, next) => {
  try {
    const userId = req.user._id; // Assuming you have middleware to extract user from the request

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.userType !== "employer") {
      return res
        .status(403)
        .json({ message: "Access forbidden for jobSeeker" });
    }
    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Unexpected error during user type check" });
  }
};
