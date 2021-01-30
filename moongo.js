const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://moon:wsb-to-the-moon@moon.ehaws.mongodb.net/moon?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const TickerSchema = new mongoose.Schema({
  symbol: String,
  occurences: Number
});

const BetSchema = new mongoose.Schema({
  scrape: { type: Date, default: Date.now },
  tickers: [TickerSchema]
});

const Bet = mongoose.model('Bet', BetSchema);

function sendTickers(tickers) {

  const db = mongoose.connection;

  new Bet({
    scrape: new Date(),
    tickers: Object.keys(tickers).map(stk => ({ symbol: stk, occurences: tickers[stk]}))
  }).save(() => db.close());

}

async function getLatestBets() {
  const b = await Bet.find().limit(1).sort({$natural:-1}).exec();
  return b;
}

module.exports = { 
  sendTickers,
  getLatestBets
};
