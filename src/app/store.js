import { configureStore  } from "@reduxjs/toolkit";
// import { userReducer } from "../features/userSlice";
import { userSlice } from "../features/userSlice";


export const store = configureStore({
    reducer: {
        user: userSlice,
    }
})