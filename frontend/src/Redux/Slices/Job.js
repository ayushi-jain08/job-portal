import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const HOST = "http://localhost:7070";
//====================CREATE JOB==========================//
export const FetchCreateJob = createAsyncThunk(
  "data/CreateJob",
  async (
    {
      title,
      desc,
      location,
      company,
      salary,
      requirement,
      experience,
      type,
      image,
      category,
    },
    { rejectWithValue }
  ) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("location", location);
    formData.append("company", company);
    formData.append("salary", salary);
    formData.append("requirement", requirement);
    formData.append("experience", experience);
    formData.append("type", type);
    formData.append("photo", image);
    formData.append("category", category);
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/job/create`, {
        method: "POST",
        mode: "cors",
        "Content-Type": "multipart/form-data",
        headers: {
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//=========================ALL JOBS========================//
export const fetchAllJobs = createAsyncThunk(
  "data/fetchAllJobs",
  async ({ category, type, sort, experience, page, search }) => {
    try {
      const response = await fetch(
        `${HOST}/api/job/get?category=${category}&type=${type}&sort=${sort}&experience=${experience}&page=${page}&search=${search}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json", // Fix the header syntax
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        return {
          products: data.jobs,
          totalPages: data.totalPages,
          totalProducts: data.totalProducts,
        };
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
    }
  }
);
//=========================ALL JOBS CATEGORY========================//
export const fetchAllJobCategory = createAsyncThunk(
  "data/fetchAllJobCategory",
  async () => {
    try {
      const response = await fetch(`${HOST}/api/category/get`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // Fix the header syntax
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
    }
  }
);
//=========================ALL JOBS CATEGORY========================//
export const fetchSingleJobCategory = createAsyncThunk(
  "data/fetchSingleJobCategory",
  async ({ catID, type, sort, experience, page }) => {
    try {
      const response = await fetch(
        `${HOST}/api/category/single/${catID}?type=${type}&sort=${sort}&experience=${experience}&page=${page}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json", // Fix the header syntax
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        return {
          jobs: data.jobs,
          totalPages: data.totalPages,
          totalJob: data.totalJob,
        };
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
    }
  }
);
export const FetchSingleJobDetails = createAsyncThunk(
  "data/FetchSingleJobDetails",
  async (jobId) => {
    try {
      const response = await fetch(`${HOST}/api/job/getsingle/${jobId}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // Fix the header syntax
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
    }
  }
);
//========================ALL JOBS CREATED BY EMPLOYER========================//
export const FetchEmployerCreatedJob = createAsyncThunk(
  "data/FetchEmployerCreatedJob",
  async () => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/job/employerJob`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // Fix the header syntax
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
    }
  }
);

//===========================TOTAL JOB APPLIED BY SINGLE JOBSEEKER===================//
export const FetchUserAplliedJob = createAsyncThunk(
  "data/FetchUserAplliedJob",
  async () => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(
        `${HOST}/api/application/jobseeker/appliedjobs`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json", // Fix the header syntax
            Authorization: `Bearer ${StoredUserInfo.token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
    }
  }
);
//======================APPLICATION FOR SINGLE JOB====================//
export const FetchUserAppliedForSingleJob = createAsyncThunk(
  "data/FetchUserAppliedForSingleJob",
  async (jobId) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(
        `${HOST}/api/application/${jobId}/applyjob`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json", // Fix the header syntax
            Authorization: `Bearer ${StoredUserInfo.token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
    }
  }
);

//=======================APPLY FOR JOB==========================//
export const ApplyForJob = createAsyncThunk(
  "data/ApplyForJob",
  async ({ whyHireYou, jobId }) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/application/${jobId}/apply`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // Fix the header syntax
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify({ whyHireYou }),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
    }
  }
);
export const FetchClickedEmployerCreatedJob = createAsyncThunk(
  "data/FetchClickedEmployerCreatedJob",
  async (employerId) => {
    try {
      const response = await fetch(`${HOST}/api/job/employer/${employerId}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // Fix the header syntax
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
    }
  }
);
// ========================ADD TO WISHLIST===================
export const AddToSavedJob = createAsyncThunk(
  "data/AddToSavedJob",
  async (jobId) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/job/saved`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify({ jobId }),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An  while processing your request.");
    }
  }
);
// /  ========================GET WISHLIST PRODUCT======================
export const fetchSavedJob = createAsyncThunk(
  "data/fetchSavedJob",
  async () => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/job/getsaved`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while processing your request.");
    }
  }
);
//====================DELETE JOB===========================//
export const DeleteJob = createAsyncThunk("data/DeleteJob", async (jobId) => {
  try {
    const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
    const response = await fetch(`${HOST}/api/job/delete/${jobId}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${StoredUserInfo.token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
});
//===========================UPDATE JOB============================//
export const FetchEditJob = createAsyncThunk(
  "data/FetchEditJob",
  async (
    {
      jobId,
      title,
      desc,
      location,
      company,
      salary,
      requirement,
      experience,
      type,
      image,
      category,
    },
    { rejectWithValue }
  ) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("location", location);
    formData.append("company", company);
    formData.append("salary", salary);
    formData.append("requirement", requirement);
    formData.append("experience", experience);
    formData.append("type", type);
    formData.append("photo", image);
    formData.append("category", category);
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/job/edit/${jobId}`, {
        method: "PATCH",
        mode: "cors",
        "Content-Type": "multipart/form-data",
        headers: {
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//=========================SKILLED BASED JOBS========================//
export const fetchSkilledJobs = createAsyncThunk(
  "data/fetchSkilledJobs",
  async () => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/job/skill`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
    }
  }
);
const initialState = {
  allJobs: [],
  totalPage: 0,
  totalProduct: 0,
  allJobsCategory: [],
  SelectedCategoryJob: [],
  totalJobPage: 0,
  totalJobs: 0,
  singleJobDetail: {},
  employeerjob: [],
  userAppliedJob: [],
  JobApplication: [],
  ClickedEmployerJob: [],
  SavedJobs: [],
  SkilledJobs: [],
  loading: false,
  error: null,
};

const JobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchCreateJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchCreateJob.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(FetchCreateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.allJobs = action.payload.products;
        state.totalPage = action.payload.totalPages;
        state.totalProduct = action.payload.totalProducts;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllJobCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllJobCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.allJobsCategory = action.payload;
      })
      .addCase(fetchAllJobCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSingleJobCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleJobCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.SelectedCategoryJob = action.payload.jobs;
        state.totalJobPage = action.payload.totalPages;
        state.totalJobs = action.payload.totalJob;
      })
      .addCase(fetchSingleJobCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(FetchSingleJobDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchSingleJobDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.singleJobDetail = action.payload;
      })
      .addCase(FetchSingleJobDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(FetchEmployerCreatedJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchEmployerCreatedJob.fulfilled, (state, action) => {
        state.loading = false;
        state.employeerjob = action.payload;
      })
      .addCase(FetchEmployerCreatedJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(FetchUserAplliedJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchUserAplliedJob.fulfilled, (state, action) => {
        state.loading = false;
        state.userAppliedJob = action.payload;
      })
      .addCase(FetchUserAplliedJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(FetchUserAppliedForSingleJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchUserAppliedForSingleJob.fulfilled, (state, action) => {
        state.loading = false;
        state.JobApplication = action.payload;
      })
      .addCase(FetchUserAppliedForSingleJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(ApplyForJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ApplyForJob.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(ApplyForJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(FetchClickedEmployerCreatedJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchClickedEmployerCreatedJob.fulfilled, (state, action) => {
        state.loading = false;
        state.ClickedEmployerJob = action.payload;
      })
      .addCase(FetchClickedEmployerCreatedJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(AddToSavedJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddToSavedJob.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(AddToSavedJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSavedJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedJob.fulfilled, (state, action) => {
        state.loading = false;
        state.SavedJobs = action.payload;
      })
      .addCase(fetchSavedJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(DeleteJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteJob.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(DeleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(FetchEditJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchEditJob.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(FetchEditJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSkilledJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkilledJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.SkilledJobs = action.payload;
      })
      .addCase(fetchSkilledJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default JobSlice.reducer;
