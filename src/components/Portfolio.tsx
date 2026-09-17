interface PortfolioProps {
    portfolioValue: number;
    cash: number;
}

function Portfolio({ portfolioValue, cash }: PortfolioProps) {
    return (
        <div>
            <h2>Portfolio</h2>
            <p>Portfolio: ${portfolioValue.toFixed(2)}</p>
            <p>Cash: ${cash.toFixed(2)}</p>
        </div>
    );
}

export default Portfolio;