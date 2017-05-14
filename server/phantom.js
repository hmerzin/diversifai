const Horseman = require('node-horseman');
var horseman = new Horseman();
const URL = 'http://www.bestbuy.com/'

module.exports = () => {
    horseman
        .open(URL)
        .html()
        .then((text) => {
            getImageURLs(text)
        })
}

function getImageURLs(text) {
    var matches = text.match(/<img([^>]+)src="[/]?([^"]+)"([^>]*)>|<( *)img( *)[/>|>]/g);
    var sources = [];
    var buildStr = '';
    var re = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
    matches.forEach((imgTag) => {
        var imgTagFocused = imgTag.split('src');
        var src = imgTagFocused[1];
        for (var i = 2; i < src.indexOf('.jpg'); i++) {
            buildStr += src[i];
            if ((i + 1) === src.indexOf('.jpg')) {
                buildStr += '.jpg'
            }
        }
        sources.push(buildStr);
        buildStr = ''; // empty out
    })

    // console.log(sources);
}
