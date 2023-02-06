var com = {

    charlierobin: {

        selectRandomPics: function () 
        {
            let max = 279;

            let selected = [];

            for (var i = 0; i < 8; i++) 
            {

                let x = Math.floor((Math.random() * max) + 1);

                while (selected.includes(x)) 
                {
                    x = Math.floor((Math.random() * max) + 1);
                }

                selected.push(x);
            }

            return selected;
        },

        getUrlGetParams: function () 
        {
            var vars = {};

            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

            for (var i = 0; i < hashes.length; i++) 
            {
                let hash = hashes[i].split('=');

                vars[hash[0]] = hash[1];
            }

            return vars;
        }
    }
};
