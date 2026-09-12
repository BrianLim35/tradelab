import { useState } from 'react';
import type { Stock } from "../models/Stock";
import type { Trade } from "../models/Trade.ts";

interface TradeFormProps {
    stock: Stock;
    onTrade: (trade: Trade) => void;
}

function TradeForm({ stock, onTrade }: TradeFormProps) {
    const [quantity, setQuantity] = useState<number>(0);

    function handleTrade(side: "BUY" | "SELL") {
        const trade: Trade = {
            id: crypto.randomUUID(),
            symbol: stock.symbol,
            quantity: quantity,
            price: stock.price,
            side: side
        };

        onTrade(trade);
    }

    return (
        <div>
            <h2>Trade</h2>

            <p>{stock.symbol} - ${stock.price}</p>

            <label>
                Quantity:
                <input
                    type="number"
                    value={quantity}
                    onChange={(event) =>
                        setQuantity(Number(event.target.value))}
                />
                <p>Quantity: {quantity}</p>
                <p>Total: ${(stock.price * quantity).toFixed(2)}</p>
            </label>

            <button onClick={() => handleTrade("BUY")}>
                Buy
            </button>
            <button onClick={() => handleTrade("SELL")}>
                Sell
            </button>
        </div>
    )
}

export default TradeForm;