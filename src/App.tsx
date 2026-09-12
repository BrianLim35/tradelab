import type { Stock } from "./models/Stock";
import StockCard from "./components/StockCard.tsx";
import { useState } from "react";

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

    return (
        <div>
            <h1>TradeLab</h1>

            <h2>Portfolio</h2>
            <p>$100,000</p>

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
        </div>
    );
}

export default App
