import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/auth/authSlice";
import qaReducer from "./redux/qa/qaSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        qa: qaReducer
    }
})