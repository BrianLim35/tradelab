import type { Stock } from "../models/Stock";

interface StockCardProps {
    stock: Stock;
    onSelect: (stock: Stock) => void;
}

function StockCard({ stock, onSelect }: StockCardProps) {
    return (
        <div onClick={() => onSelect(stock)}>
            <h3>{stock.symbol}</h3>
            <p>{stock.name}</p>
            <p>${stock.price}</p>
        </div>
    );
}

export default StockCard;