import { useState } from "react";
import type { Stock } from "./models/Stock";
import type { Trade } from "./models/Trade";
import type { Position } from "./models/Position";

import StockCard from "./components/StockCard";
import TradeForm from "./components/TradeForm";
import TradeHistory from "./components/TradeHistory";
import PositionList from "./components/PositionList";
import ErrorMessage from "./components/ErrorMessage";
import Portfolio from "./components/Portfolio.tsx";

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
    const [positions, setPositions] = useState<Position[]>([]);
    const [tradeError, setTradeError] = useState<string | null>(null);

    function isTradeInvalid(trade: Trade): string | null {
        if (trade.quantity < 1) {
            return "Please enter a quantity greater than 0";
        }

        if (trade.side === "BUY") {
            if (cash < trade.quantity * trade.price) {
                return "Insufficient cash to buy!";
            }
            return null;
        } else {
            const position = positions.find(
                (position) => position.symbol === trade.symbol
            );
            if (position === undefined || position.quantity < trade.quantity) {
                return "Insufficient positions to sell!";
            }
            return null;
        }
    }

    function handleTrade(trade: Trade) {
        const error = isTradeInvalid(trade);
        if (error) {
            setTradeError(error);
            return;
        }
        setTradeError(null);

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

        const quantityChange =
            trade.side === "BUY" ? trade.quantity : - trade.quantity;

        setPositions((currentPositions) => {
            const existingPosition = currentPositions.find(
                (position) => position.symbol === trade.symbol
            );

            if (existingPosition) {
                const newQuantity = existingPosition.quantity + quantityChange;

                if (newQuantity === 0) {
                    return currentPositions.filter(
                        (position) => position.symbol !== trade.symbol);
                }

                return (currentPositions.map((position) =>
                position.symbol === trade.symbol
                    ? {
                        ...position,
                        quantity: newQuantity
                    }
                    : position));
            }

            return [
                ...currentPositions,
                {
                    symbol: trade.symbol,
                    quantity: quantityChange
                }
            ];
        });
    }

    const positionsValue = positions.reduce((total, position) => {
        const stock = stocks.find(
            (stock) => stock.symbol === position.symbol);

        if (!stock) {
            return total;
        }

        return total + position.quantity * stock.price;
    }, 0);
    const portfolioValue = cash + positionsValue;

    return (
        <div>
            <h1>TradeLab</h1>

            <Portfolio
                portfolioValue={portfolioValue}
                cash={cash}
            />

            <br/>

            <h2>Positions</h2>
            <PositionList
                positions={positions}
            />

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

            {tradeError && (
                <ErrorMessage message={tradeError} />
            )}

            <br/>

            <TradeHistory
                trades={trades}
            />
        </div>
    );
}

export default App
