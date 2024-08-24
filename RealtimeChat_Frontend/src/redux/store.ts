import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducer/UserReducer";

const store = configureStore({
  reducer: {
    user: UserReducer.reducer,
  },
});

export default store;