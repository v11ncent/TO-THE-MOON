const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

const { getTrendingTickers } = require('wsb-scraper');

exports.getTickers = functions.pubsub.schedule('*/15 * * * *').onRun(async (ctx) => {
  const tickers = await getTrendingTickers();
  const bets = admin.database().ref('bets');

  bets.push({
    scrape: new Date().toString(),
    tickers: Object.keys(tickers).map(t => ({
      symbol: t,
      occurences: tickers[t]
    }))
  });
});

exports.currentTickers = functions.https.onRequest(async (request, response) => {
  const bets = admin.database().ref('bets');

  response.send(await bets.orderByChild('scrape').limitToLast(1).get());
});
