import StockAccordion from './components/StockAccordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import StockHeader from './components/StockHeader';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stocks: []
    };
  }

  componentDidMount() {
        axios.get('https://us-central1-to-the-moon-8383a.cloudfunctions.net/currentTickers').then(res => {
          const stocks = [];   
          const { data } = res;
          const { tickers } = data[Object.keys(data)];
          const keys = Object.keys(tickers);
          keys.forEach(key => {
            stocks.push(tickers[key]);
          })
          stocks.sort((a, b) => {
            if (a.occurences > b.occurences) {
              return -1;
            }
            if (a.occurences < b.occurences) {
              return 1;
            }
            return 0;
          })

          this.setState({ stocks });
    })
  }

  render() {
    return (
      <div style={{ padding: '1rem' }}>
        <StockHeader></StockHeader>
        <br />
        <StockAccordion stocks={this.state.stocks} />
      </div>
    );
  }
}
export default App;
