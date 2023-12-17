import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const HOST = "http://localhost:7070";
//====================REGISTER USER=======================//
export const fetchRegister = createAsyncThunk(
  "data/fetchRegister",
  async ({ name, email, userType, password, pic }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("userType", userType);
    formData.append("password", password);
    formData.append("img", pic);
    try {
      const response = await fetch(`${HOST}/api/user/register`, {
        method: "POST",
        mode: "cors",
        "Content-Type": "multipart/form-data",
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
// ===================USER LOGIN===================
export const fetchLogin = createAsyncThunk(
  "data/fetchLogin",
  async ({ email, password }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    try {
      const response = await fetch(`${HOST}/api/user/login`, {
        method: "POST",
        mode: "cors",
        "Content-Type": "multipart/form-data",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userDataInfo", JSON.stringify(data.users));
        return data.users;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const infoStorage = () => {
  const StorageUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  if (StorageUserInfo) {
    return StorageUserInfo;
  }
  return null;
};
// =======================USER DATA=========================
export const fetchUserData = createAsyncThunk(
  "data/fetchUserData",
  async () => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/user/about`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data; // This data will be passed to the fulfilled action
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
    }
  }
);
// ======================LOGOUT========================
export const fetchLogout = createAsyncThunk("data/fetchLogout", async () => {
  localStorage.removeItem("userDataInfo");
  return null;
});
// =====================FETCH All EMPLOYER=====================//
export const fetchAllEmployer = createAsyncThunk(
  "data/fetchAllEmployer",
  async () => {
    try {
      const response = await fetch(`${HOST}/api/user/employers`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data; // This data will be passed to the fulfilled action
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
    }
  }
);
// =======================USER DATA=========================
export const fetchSingleUser = createAsyncThunk(
  "data/fetchSingleUser",
  async (userId) => {
    try {
      const response = await fetch(`${HOST}/api/user/single/${userId}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data; // This data will be passed to the fulfilled action
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user profile.");
    }
  }
);

//=======================ADD ABOUT USER==========================//
export const fetchAddAboutUser = createAsyncThunk(
  "data/fetchAddAboutUser ",
  async (about, { rejectWithValue }) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/user/add/about`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify({ about }),
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
//==========================ADD USER EXPERIENCE===========================//
export const fetchAddUserExperience = createAsyncThunk(
  "data/fetchAddUserExperience ",
  async ({ company, title, from, to }, { rejectWithValue }) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/user/add/experience`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify({ company, title, from, to }),
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
//=========================EDIT USER EXPERIENCE========================//
export const fetchEditJobExperience = createAsyncThunk(
  "data/fetchEditJobExperience",
  async ({ expId, company, title, from, to }, { rejectWithValue }) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/user/edit/exp/${expId}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify({ company, title, from, to }),
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
//=============================ADD USER EDUCATION===================//
export const fetchAddUserEducation = createAsyncThunk(
  "data/fetchAddUserEducation ",
  async (
    { university, degree, field, startYear, endYear, grade },
    { rejectWithValue }
  ) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/user/add/education`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify({
          university,
          degree,
          field,
          startYear,
          endYear,
          grade,
        }),
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
//=====================ADD SKILLS===================//
export const fetchAddUserSkill = createAsyncThunk(
  "data/ fetchAddUserSkill ",
  async (skill, { rejectWithValue }) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/user/add/skill`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify(skill),
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
//=========================EDIT USER EDUCATION========================//
export const fetchEditJobEducation = createAsyncThunk(
  "data/fetchEditJobEducation",
  async (
    { eduId, university, degree, field, startYear, endYear, grade },
    { rejectWithValue }
  ) => {
    try {
      const StoredUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
      const response = await fetch(`${HOST}/api/user/edit/edu/${eduId}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${StoredUserInfo.token}`,
        },
        body: JSON.stringify({ university, degree, field, startYear, endYear }),
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
const initialState = {
  currentUser: infoStorage() || {},
  UserAllDetails: {},
  AllEmployeers: [],
  SingleUserDetails: {},
  message: "",
  loading: false,
  error: null,
};
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.msg;
        state.error = null;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        localStorage.setItem("userDataInfo", JSON.stringify(action.payload));
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.UserAllDetails = action.payload;
        state.loggedIn = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.loggedIn = false;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = " ";
        state.UserAllDetails = "";
        localStorage.removeItem("userDataInfo");
        state.loggedIn = false;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.AllEmployeers = action.payload;
      })
      .addCase(fetchAllEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.SingleUserDetails = action.payload;
      })
      .addCase(fetchSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAddAboutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddAboutUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchAddAboutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAddUserExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddUserExperience.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchAddUserExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAddUserEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddUserEducation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchAddUserEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAddUserSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddUserSkill.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchAddUserSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEditJobExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEditJobExperience.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchEditJobExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEditJobEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEditJobEducation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchEditJobEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { clearError } = UserSlice.actions;
export default UserSlice.reducer;
