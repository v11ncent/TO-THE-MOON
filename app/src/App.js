import StockAccordion from './components/StockAccordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import index from './index.css';
import React from 'react';
import StockHeader from './components/StockHeader';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stocks: ['Stock1', 'Stock2', 'Stock3', 'Stock4', 'Stock5']
    };
  }

  render() {

    return <div><StockHeader></StockHeader><StockAccordion stocks={this.state.stocks} /></div>
  }

}
export default App;
