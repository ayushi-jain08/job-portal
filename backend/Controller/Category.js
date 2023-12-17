import { Category } from "../Model/Category.js";
import cloudinary from "../Cloudinary.js";
import Job from "../Model/Job.js";
//   ========================POST CATEGORY===========================

export const CreateJobCategory = async (req, res) => {
  if (!req.files || !req.files.photo) {
    return res.status(400).json({ message: "Image file is required." });
  }
  const file = req.files.photo;
  const folder = "images";

  const result = cloudinary.uploader.upload(file.tempFilePath, {
    folder,
  });

  try {
    const { name } = req.body;
    const category = new Category({
      name,
      image: (await result).secure_url,
    });
    const saveCategory = await category.save();
    res.status(200).json({
      success: true,
      message: "Category successfully created",
      saveCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error", error });
  }
};

// ==========================GET SUBCATEGORY===================================
export const GetAllJobCategory = async (req, res) => {
  try {
    const subcategories = await Category.find().limit(10);
    res.status(200).json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", error });
  }
};
//   ========================GET SINGLE SUBCATEGORY==================
export const GetSingleJobSubcategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perpage = 2;

    const startIndex = (page - 1) * perpage;
    const { catID } = req.params;

    const { type, experience, sort } = req.query;

    const query = { category: catID };
    if (type) {
      query.type = type;
    }
    let sortOption = { createdAt: -1 }; // Default to sorting by latest jobs

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }
    if (experience !== undefined && experience !== null && experience !== "") {
      // Only include experience in the query if it's not an empty string
      query.experience = { $gte: 0, $lte: experience };
    }
    const jobs = await Job.find(query)
      .sort(sortOption)
      .skip(startIndex)
      .limit(perpage);
    const totalJob = await Job.countDocuments(query);
    const totalPages = Math.ceil(totalJob / perpage);

    if (!jobs) {
      res.status(400).json({
        meassage: "no product found",
      });
    }
    console.log("iii", totalJob);
    res.status(200).json({
      jobs,
      totalJob,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", error });
  }
};
