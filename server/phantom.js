const Horseman = require('node-horseman');
var horseman = new Horseman();
const URL = 'https://www.sequoiacap.com/people/'

module.exports = (url) => {

    return new Promise((resolve, reject) => {

    horseman
        .open(url)
        .html()
        .then((text) => {
            resolve(getImageURLs(text));
        });
    });

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

    sources = sources.filter((elem) => {
        if (elem.length > 0) return true;
        return false;
    });
    
    return sources;
}
}
