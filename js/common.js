var com = com === undefined ? {} : com;

com.charlierobin = com.charlierobin === undefined ? {} : com.charlierobin;

com.charlierobin.numberOfPics = 287;

com.charlierobin.picsPerPage = 8;

com.charlierobin.randomPic = function () 
{
    return Math.floor((Math.random() * com.charlierobin.numberOfPics) + 1);
};

com.charlierobin.selectRandomPics = function () 
{
    let selected = [];

    for (var i = 0; i < com.charlierobin.picsPerPage; i++) 
    {
        let x = com.charlierobin.randomPic();

        while (selected.includes(x)) 
        {
            x = com.charlierobin.randomPic();
        }

        selected.push(x);
    }

    return selected;
};

com.charlierobin.getUrlGetParams = function () 
{
    var vars = {};

    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for (var i = 0; i < hashes.length; i++) 
    {
        let hash = hashes[i].split('=');

        vars[hash[0]] = hash[1];
    }

    return vars;
};

