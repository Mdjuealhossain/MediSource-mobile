import { configureStore } from "@reduxjs/toolkit";
import sumReducer from "./sumSlice";

const store = configureStore({
    reducer: {
        sums: sumReducer,
    },
});

export default store;
