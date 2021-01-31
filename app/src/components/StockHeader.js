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
        </Card >
    )
}
export default StockHeader;