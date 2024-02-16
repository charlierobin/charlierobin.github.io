var com = com === undefined ? {} : com;

com.charlierobin = com.charlierobin === undefined ? {} : com.charlierobin;

com.charlierobin.numberOfPics = 287;

com.charlierobin.picsPerPage = 8;

com.charlierobin.randomPic = function () {

    return Math.floor((Math.random() * com.charlierobin.numberOfPics) + 1);
};

com.charlierobin.selectRandomPics = function () {

    let selected = [];

    for (var i = 0; i < com.charlierobin.picsPerPage; i++) {
        let x = com.charlierobin.randomPic();

        while (selected.includes(x)) {
            x = com.charlierobin.randomPic();
        }

        selected.push(x);
    }

    return selected;
};

com.charlierobin.getUrlGetParams = function () {

    var vars = {};

    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for (var i = 0; i < hashes.length; i++) {
        let hash = hashes[i].split('=');

        vars[hash[0]] = hash[1];
    }

    return vars;
};

com.charlierobin.loadKML = function (number) {

    $.get("kmls/" + number + ".kml", function (xmlDoc) {

        var data = xmlDoc.getElementsByTagName("coordinates")[0].textContent;

        data = data.trim();

        var coords = data.split(" ");

        var lineCount = coords.length - 1;
        var vertexCount = coords.length;

        var points = "";

        for (i = 0; i < coords.length; i++) {

            var longLatHeight = coords[i].split(",");

            var converted = lnglat_to_globe([longLatHeight[0], longLatHeight[1]], { r: 1.01, mode: "degrees" });

            points = points + round(converted[0]) + ", " + round(converted[1]) + ", " + round(converted[2]);

            if (i < lineCount) points = points + ", ";
        }

        var newRoute = $(`<group id="group${number}"><shape><appearance><material emissivecolor='yellow' /></appearance><lineset vertexcount='${vertexCount}' containerfield='geometry'><coordinate def='route${number}' point='${points}' /></lineset></shape><shape><appearance><material emissivecolor='red' /></appearance><pointset><coordinate use='route${number}' /></pointset></shape></group>`);

        $("#transform").append(newRoute);
    });

    function round(number) {
        return Math.round((number + Number.EPSILON) * 1000) / 1000;
    }

    function lnglat_to_globe(lnglat, opts = {}) {
        let { r = 1.01, mode = "degrees" } = opts;
        let lat = lnglat[1];
        let lng = lnglat[0];
        let R;

        // Third component represents elevation, if it exists
        if (lnglat.length > 2) {
            R = 1.001 + 0.000005 * lnglat[2];
        } else {
            R = r;
        }
        if (mode == "degrees") {
            lat = (lat * Math.PI) / 180;
            lng = (lng * Math.PI) / 180;
        }

        // Convert latitude to spherical phi
        let phi = Math.PI / 2 - lat;
        let theta = lng;
        let x = R * Math.sin(phi) * Math.cos(theta);
        if (Math.abs(x) < 0.000001) {
            x = 0;
        }
        let y = R * Math.sin(phi) * Math.sin(theta);
        if (Math.abs(y) < 0.000001) {
            y = 0;
        }
        let z = R * Math.cos(phi);
        if (Math.abs(z) < 0.000001) {
            z = 0;
        }
        return [x, y, z]
    }
};

com.charlierobin.loadKMLFiles = function () {

    com.charlierobin.loadKML("1");
    com.charlierobin.loadKML("2");
    com.charlierobin.loadKML("3");
    com.charlierobin.loadKML("4");
    com.charlierobin.loadKML("5");
    com.charlierobin.loadKML("6");
    com.charlierobin.loadKML("7");
    com.charlierobin.loadKML("8");
    com.charlierobin.loadKML("9");
    com.charlierobin.loadKML("10");
    com.charlierobin.loadKML("11");
    com.charlierobin.loadKML("12");
    com.charlierobin.loadKML("13");
};
