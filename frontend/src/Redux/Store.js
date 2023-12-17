import { configureStore } from "@reduxjs/toolkit";
import JobSlice from "./Slices/Job";
import UserSlice from "./Slices/User";

const store = configureStore({
  reducer: {
    job: JobSlice,
    user: UserSlice,
  },
});

export default store;
