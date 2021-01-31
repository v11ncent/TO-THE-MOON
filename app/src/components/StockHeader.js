import Card from 'react-bootstrap/Card';

function StockHeader() {
    return (
        <Card>
            <Card.Header style={{ 
                textAlign: 'center', 
                textTransform: 'uppercase', 
                letterSpacing: '2px' }}> 
                🚀 To The Moon 🚀 
            </Card.Header>
            <Card.Body style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ maxWidth: '80%', textAlign: 'center' }}>
                To The Moon is an <a target="_blank" href="https://reddit.com/r/wallstreetbets">/r/wallstreetbets</a> bot that periodically scrapes the subreddit for
                relevant stock tickers that appear in posts.
                </div>
            </Card.Body>
        </Card >
    )
}
export default StockHeader;