import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';


function StockAccordion(props) {

  return (

    <Accordion defaultActiveKey="0">

      {props.stocks.map((stock, index) => {
        return (

          <Card border="dark" style={{ width: '25rem' }}>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={index + 1}>

                {stock}

              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index + 1}>
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

    </Accordion>


  )
}
export default StockAccordion;