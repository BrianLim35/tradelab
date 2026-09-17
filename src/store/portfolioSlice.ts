import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Position } from "../models/Position";

interface PortfolioState {
    cash: number;
    positions: Position[];
}

interface UpdatePositionPayload {
    symbol: string;
    quantityChange: number;
}

const initialState: PortfolioState = {
    cash: 100000,
    positions: []
};

const portfolioSlice = createSlice({
    name: "portfolio",
    initialState,
    reducers: {
        updateCash(state, action: PayloadAction<number>) {
            state.cash += action.payload;
        },
        updatePosition(
            state,
            action: PayloadAction<UpdatePositionPayload>
        ) {
            const { symbol, quantityChange } = action.payload;
            const existingPosition = state.positions.find(
                (position) => position.symbol === symbol
            );

            if (existingPosition) {
                const newQuantity = existingPosition.quantity + quantityChange;

                if (newQuantity == 0) {
                    state.positions = state.positions.filter(
                        (position) => position.symbol === symbol
                    );
                    return;
                }

                existingPosition.quantity = newQuantity;
                return;
            }

            state.positions.push({
                symbol,
                quantity: quantityChange,
            });
        }
    }
});

export const {
    updateCash,
    updatePosition,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;