import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

function StockAccordion(props) {

  return (

    <Accordion style={{ margin: '50px' }}>

      {props.stocks.map((stock, index) => {
        return (

          <Card border="dark" style={{ width: '100%', backgroundColor: 'white' }} >
            <Card.Header > <center>
              <Accordion.Toggle as={Button} variant="link" eventKey={index + 1} style={{ backgroundColor: 'pink' }}>

                {stock}

              </Accordion.Toggle>
            </center>
            </Card.Header>
            <Accordion.Collapse id="dropdown" eventKey={index + 1}>
              <Card.Body>Information About {stock} <br></br>
              information <br></br>
              information <br></br>
              information <br></br>
              information <br></br>
              information <br></br> </Card.Body>
            </Accordion.Collapse>
          </Card>
        )
      })}

    </Accordion >
  )
}

export default StockAccordion;