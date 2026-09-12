import type { Position } from "../models/Position";

interface PositionListProps {
    positions: Position[];
}

function PositionList({ positions }: PositionListProps) {
    if (positions.length < 1) {
        return (
            <p>No positions currently</p>
        );
    }

    return (
        <div>
            {positions.map((position) => (
                <p key={position.symbol}>
                    {position.symbol}: {position.quantity} shares
                </p>
            ))}
        </div>
    )
}

export default PositionList;