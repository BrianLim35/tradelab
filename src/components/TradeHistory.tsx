import type { Trade } from "../models/Trade";

interface TradeHistoryProps {
    trades: Trade[];
}

function TradeHistory({ trades }: TradeHistoryProps) {
    if (trades.length === 0) {
        return null;
    }

    return (
        <div>
            <h2>Trades</h2>

            {trades.map(trade => (
                <p key={trade.id}>
                    {trade.side} {trade.quantity} {trade.symbol} @ ${trade.price}
                </p>
            ))}
        </div>
    );
}

export default TradeHistory;