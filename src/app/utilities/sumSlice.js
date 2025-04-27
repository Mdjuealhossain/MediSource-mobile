import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalDiscountedAmountAllorde: 0,
    purchaseTotalAmountSum: 0,
    PsTotalAmountSum: 0,
    totalDiscountedAmountAllShort: 0,
    purchaseTotalAmountSumIsSpecial: 0,
    returnedSum: 0,
    totalStockAmount: 0,
};

const sumSlice = createSlice({
    name: "sums",
    initialState,
    reducers: {
        setAllSums: (state, action) => {
            // Action payload will be an object with any/all sums
            Object.entries(action.payload).forEach(([key, value]) => {
                if (state.hasOwnProperty(key)) {
                    state[key] = value;
                }
            });
        },
    },
});

export const { setAllSums } = sumSlice.actions;
export default sumSlice.reducer;
