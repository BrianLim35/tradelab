import { configureStore } from "@reduxjs/toolkit";
import portfolioReducer from "./portfolioSlice";
import tradesReducer from "./tradesSlice";

export const store = configureStore({
    reducer: {
        portfolio: portfolioReducer,
        trades: tradesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;