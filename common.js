var com = {

    charlierobin: {

        numberOfPics : 287,
        picsPerPage : 8
    }
};

com.charlierobin.selectRandomPics = function () 
{
    let max = com.charlierobin.numberOfPics;

    let selected = [];

    for (var i = 0; i < com.charlierobin.picsPerPage; i++) 
    {
        let x = Math.floor((Math.random() * max) + 1);

        while (selected.includes(x)) 
        {
            x = Math.floor((Math.random() * max) + 1);
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
