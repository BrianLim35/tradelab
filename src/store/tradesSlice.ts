import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Trade } from "../models/Trade";

interface TradesState {
    trades: Trade[];
}

const initialState: TradesState = {
    trades: [],
};

const tradesSlice = createSlice({
    name: "trades",
    initialState,
    reducers: {
        addTrade(state, action: PayloadAction<Trade>) {
            state.trades.push(action.payload);
        }
    }
});

export const { addTrade } = tradesSlice.actions;

export default tradesSlice.reducer;