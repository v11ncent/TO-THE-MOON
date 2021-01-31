import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

function StockScreener({ ticker }) {
    return <iframe 
      title={`screener-${ticker}`} 
      style={{ border: 'none', width: '100%', minHeight: '400px' }}
      src={`https://www.tradingview.com/widgetembed/?frameElementId=tradingview_616ce&symbol=${ticker}&interval=D&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=light&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&lo%20%20%20%20cale=en&utm_source=www.tradingview.com&utm_medium=widget_new&utm_campaign=chart&utm_term=${ticker}`}></iframe>
}

function StockAccordion(props) {

  return (

    <Accordion>

      {props.stocks.map(({ symbol }, index) => {
        return (
          <Card key={symbol} border="dark" style={{ width: '100%', backgroundColor: 'white' }} >
            <Card.Header style={{ textAlign: 'center' }}> 
              <Accordion.Toggle as={Button} variant="link" eventKey={index + 1}>
                <label style={{ margin: 0, textTransform: 'uppercase', cursor: 'pointer' }}>{symbol}</label>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse id="dropdown" eventKey={index + 1}>
              <Card.Body>
                <StockScreener ticker={symbol}></StockScreener>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        )
      })}

    </Accordion >
  )
}

export default StockAccordion;