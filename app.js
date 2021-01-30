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
    if(string.includes('$')) {
        return string.toUpperCase().split('$')
        .map(t => t.split(' ')).flat()
        .filter(x => x.length < 5)
        .filter(x => x.match(/^[A-Z]/))
        .filter((element, index, array) => (array.indexOf(element) === index))
        .filter(x => x.trim(''));
        //.filter(x => string.includes(`$${x}`));
        //.filter(x => x.match(/^[A-Z]/));
        //.map(t => t.toUpperCase());
    }
    return [];
}


function getRSSFeed(url) {
    axios.get(url)
    .then(res => {
        //parses xml into json obj
        let parsedData = parser.parse(res.data);
        let parsedArray = parsedData.feed.entry
        //goes through each element and transforms
        parsedArray.forEach(element => {
            let id = element.id;
            let author = element.author.uri;
            let title = he.decode(element.title);
            let content = he.decode(element.content);
            if (!posts[id]) {
                /*let t = [
                    ...getTickers(title),
                    ...getTickers(content)
                ]*/
                
                let x = getTickers(title);
                console.log(x);

               /*t.forEach(tick => {
                    console.log(tick);
                    //tickers[tick] = tickers[tick] ? tickers[tick]++ : 1
                })*/

                let post = {
                    //shorthand for author: author
                    author,
                    title,
                    content
                }

                //dictionary key to value
                posts[id] = post;
            }
        })
        //console.log(posts);
    })
}

getRSSFeed('https://www.reddit.com/r/wallstreetbets/.rss');




