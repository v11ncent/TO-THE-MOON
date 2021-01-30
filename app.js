const axios = require('axios');
const parser = require('fast-xml-parser');
const he = require('he');

const { sendTickers, getLatestBets } = require('./moongo');

const posts = {};
const tickers = {};

function getTickers(string) {
  let str = string.toUpperCase();
  if (str.includes('$')) {
    return str
      .split('$')
      .map((t) => t.split(' '))
      .flat()
      .filter((x) => x.trim(''))
      .filter((x) => x.length < 5)
      .filter((x) => x.match(/^[A-Z]/))
      .filter((element, index, array) => array.indexOf(element) === index)
      .filter((x) => str.includes(`$${x}`))
      .map((x) => x.replace(/[^\w\s]/gi, ''));
  }
  return [];
}

function containsTickers(ticksArray, string) {
  let present = false;
  ticksArray.forEach((ele) => {
    if (string.toUpperCase().includes(ele)) {
      present = true;
    }
  });
  return present;
}

function getRSSFeed(url) {
  return new Promise(resolve => {
    axios.get(url).then((res) => {
      
      let parsedData = parser.parse(res.data);
      let parsedArray = parsedData.feed.entry;
      
      parsedArray.forEach((ele) => {
        posts[ele.id] = parsePost(ele);
      });

      let remaining = parsedArray.filter(({ id }) => posts[id]);

      if(remaining.length) {
        remaining.forEach((ele, idx) => {
          posts[ele.id] = parsePost(ele);
          (idx === remaining.length - 1) && resolve(tickers);
        });
      } else {
        resolve(tickers);
      }

    });

  }); 
  
}

function parsePost(post) {
  let id = post.id;
  let author = post.author.uri;
  let title = he.decode(post.title);
  let content = he.decode(post.content);
  let ticks = Object.keys(tickers, title);
  if (!posts[id]) {
    let t = [...getTickers(title), ...getTickers(content)];

    t.forEach((tick) => {
      tickers[tick] = tickers[tick] ? tickers[tick] + 1 : 1;
    });

    if (
      t.length === 0 &&
      !(containsTickers(ticks, title) && containsTickers(ticks, content))
    ) {
      return {
        author,
        title,
        content,
      };
    }
  }
}

async function main() {
  console.log('[BEST]:', await getRSSFeed('https://www.reddit.com/r/wallstreetbets/best/.rss'));
  console.log('[HOT]:', await getRSSFeed('https://www.reddit.com/r/wallstreetbets/hot/.rss'));
  console.log('[NEW]:', await getRSSFeed('https://www.reddit.com/r/wallstreetbets/new/.rss'));
  console.log('[TOP]:', await getRSSFeed('https://www.reddit.com/r/wallstreetbets/top/.rss'));
  console.log('[RISING]:', await getRSSFeed('https://www.reddit.com/r/wallstreetbets/rising/.rss'));

  console.log('[FINAL TICKER COUNT]:', tickers);

  await sendTickers(tickers);
}

main();
