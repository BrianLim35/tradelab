import type { Stock } from "./models/Stock";

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
    return (
        <div>
            <h1>TradeLab</h1>

            <h2>Portfolio</h2>
            <p>$100,000</p>

            <h2>Watchlist</h2>
            {stocks.map((stock) => (
                <p key={stock.symbol}>
                    {stock.symbol} - {stock.price}
                </p>
            ))}
        </div>
    );
}

export default App
