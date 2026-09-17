import type { Position } from "../models/Position";
import type { Trade } from "../models/Trade";

export function validateTrade(
    trade: Trade,
    cash: number,
    positions: Position[]
): string | null {
    if (trade.quantity < 1) {
        return "Please enter a quantity greater than 0";
    }

    if (trade.side === "BUY") {
        const tradeValue = trade.quantity * trade.price;

        if (cash < tradeValue) {
            return "Insufficient cash to buy!";
        }

        return null;
    }

    const position = positions.find(
        (position) => position.symbol === trade.symbol
    );

    if (!position || position.quantity < trade.quantity) {
        return "Insufficient positions to sell!";
    }

    return null;
}