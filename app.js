//1-29-2021


//imports
const axios = require('axios').default;
const parser = require('fast-xml-parser');
const he = require('he');

const posts = {};
const tickers = {};
//functions

//.map(ele => ele.toUpperCase()).filter( (x, y, z) => (x))
function getTickers(string) {
    let str = string.toUpperCase();
    if(str.includes('$')) {
        return str.split('$')
        .map(t => t.split(' ')).flat()
        .filter(x => x.trim(''))
        .filter(x => x.length < 5)
        .filter(x => x.match(/^[A-Z]/))
        .filter((element, index, array) => (array.indexOf(element) === index))
        .filter(x => str.includes(`$${x}`))
        .map(x => x.replace(/[^\w\s]/gi, ''));
    }
    return [];
}

function containsTickers(ticksArray, string) {
    let present = false;
    ticksArray.forEach(ele => {
        if (string.toUpperCase().includes(ele)) {
            present = true;
        }
    })
    return present;
}

function getRSSFeed(url) {
    axios.get(url)
    .then(res => {
        //parses xml into json obj
        let parsedData = parser.parse(res.data);
        let parsedArray = parsedData.feed.entry
        //goes through each element and transforms
        parsedArray.forEach(ele => {
            posts[ele.id] = parsePost(ele);
            
            //destructuring as a param
        })
        let x = parsedArray.filter(({id}) => posts[id])
        
        x.forEach( ele => {
            posts[ele.id] = parsePost(ele);
        })
        console.log(parsedArray.length);
        console.log(x.length);
    })
}



function parsePost(post) {
    let id = post.id;
    let author = post.author.uri;
    let title = he.decode(post.title);
    let content = he.decode(post.content);
    let ticks = Object.keys(tickers, title);
    if (!posts[id]) {
        //combines 2 arrays into 1
        let t = [
            ...getTickers(title),
            ...getTickers(content)
        ]
    
        t.forEach(tick => {
            tickers[tick] = tickers[tick] ? tickers[tick] + 1 : 1;
        })
        
        if (t.length || (containsTickers(ticks, title) && containsTickers(ticks, content))) {
            return {
                author,
                title,
                content
            }
        }
    }
}


getRSSFeed('https://www.reddit.com/r/wallstreetbets/.rss');




