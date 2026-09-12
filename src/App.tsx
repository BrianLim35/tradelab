import { useState } from "react";
import type { Stock } from "./models/Stock";
import type { Trade } from "./models/Trade";

import StockCard from "./components/StockCard.tsx";
import TradeForm from "./components/TradeForm.tsx";
import TradeHistory from "./components/TradeHistory.tsx";

const stocks: Stock[] = [
    {
        symbol: "AAPL",
        name: "Apple",
        price: 230.42
    },
    {
        symbol: "NVDA",
        name: "Nvidia",
        price: 177.82
    },
    {
        symbol: "MSFT",
        name: "Microsoft",
        price: 414.36
    },
    {
        symbol: "TSLA",
        name: "Tesla",
        price: 349.12
    },
]

function App() {
    const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
    const [trades, setTrades] = useState<Trade[]>([]);
    const [cash, setCash] = useState<number>(100000);

    function handleTrade(trade: Trade) {
        const tradeValue = trade.quantity * trade.price;

        if (trade.side === "BUY") {
            setCash((currentCash) => currentCash - tradeValue);
        } else {
            setCash((currentCash) => currentCash + tradeValue);
        }

        setTrades((currentTrades) => [
            ...currentTrades,
            trade
        ]);
    }

    return (
        <div>
            <h1>TradeLab</h1>

            <h2>Portfolio</h2>
            <p>Cash: ${cash.toFixed(2)}</p>

            <br/>

            <h2>Watchlist</h2>
            {stocks.map((stock) => (
                <StockCard
                    key={stock.symbol}
                    stock={stock}
                    onSelect={setSelectedStock}
                />
            ))}

            <br/>

            <h2>Selected Stock</h2>
            {selectedStock ? (
                <div>
                    <h3>{selectedStock.symbol}</h3>
                    <p>{selectedStock.name}</p>
                    <p>{selectedStock.price}</p>
                </div>
            ) : (
                <p>No stock selected</p>
            )}

            <br/>

            {selectedStock && (
                <TradeForm
                    stock={selectedStock}
                    onTrade={handleTrade}
                />
            )}

            <br/>

            <TradeHistory
                trades={trades}
            />
        </div>
    );
}

export default App
