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

com.charlierobin.archaeology = function () {

    return [

        {
            name: "pics1",
            thumbnail: "design/pic_01.jpg",
            pics: [
                "design/pic_01.jpg",
                "design/pic_02.jpg",
                "design/pic_04.jpg",
                "design/pic_05.jpg",
                "design/pic_06.jpg",
                "design/pic_07.jpg",
                "design/pic_09.jpg",
                "design/pic_11.jpg",
                "design/pic_12.jpg",
                "design/pic_13.jpg",
                "design/pic_14.jpg",
                "design/pic_15.jpg",
                "design/pic_16.jpg",
                "design/pic_17.jpg"
            ]
        },
        {
            name: "pics2",
            thumbnail: "interactive/bp/screen_01.jpg",
            pics: [
                "interactive/bp/screen_01.jpg",
                "interactive/bp/screen_02.jpg",
                "interactive/bp/screen_03.jpg",
                "interactive/bp/screen_04.jpg"
            ]
        },
        {
            name: "pics3",
            thumbnail: "web_design/screenset.jpg",
            pics: [
                "web_design/aj_nursing.jpg",
                "web_design/elektrik_effekts_site.jpg",
                "web_design/equifavourites_site.jpg",
                "web_design/jack_nadel_uk.jpg",
                "web_design/kompassJava.jpg",
                "web_design/modern_healing_site.jpg",
                "web_design/pet_favourites_site.jpg",
                "web_design/sa_tutors_site.jpg",
                "web_design/sarah_aspinall_site.jpg",
                "web_design/siteAgfaPACS.jpg",
                "web_design/siteBP.jpg",
                "web_design/siteEntOil.jpg",
                "web_design/siteFloorit.jpg",
                "web_design/siteGarryAndAlex.jpg",
                "web_design/siteGoweb.jpg",
                "web_design/siteJotun.jpg",
                "web_design/siteMatt.jpg",
                "web_design/siteMustard.jpg",
                "web_design/sitePRF.jpg",
                "web_design/siteSarah.jpg",
                "web_design/siteTarmac.jpg",
                "web_design/siteTBS.jpg",
                "web_design/spreadsheet_1.jpg",
                "web_design/spreadsheet_2.jpg",
                "web_design/the_betties_site.jpg",
                "web_design/tile_view.jpg"
            ]
        }
    ];
};

com.charlierobin.initThumbnails = function () {

    let order = localStorage.getItem("thumbnails");

    if (!order) {

        let L = 10;
        let T = 10;

        com.charlierobin.archaeology().forEach(entry => {

            const section = com.charlierobin.getSectionByName(entry.name);

            const el = $(`<div class="thumbnail" style="background-image: url(pictures/${section.thumbnail}); left: ${L}%; top: ${T}%; transform: rotate(-0.01turn)"><a href="pictures/${section.thumbnail}" title="${section.name}"></a></div>`);

            $("#thumbnails").append(el);

            $(el).data("id", section.name);

            L = L + 10;
            T = T + 1;
        });

        com.charlierobin.storeThumbnailsData();
    }
    else {

        order = JSON.parse(order);

        order.forEach(entry => {

            const section = com.charlierobin.getSectionByName(entry.id);

            const el = $(`<div class="thumbnail" style="background-image: url(pictures/${section.thumbnail}); left: ${entry.L}; top: ${entry.T}; transform: ${entry.M}"><a href="pictures/${section.thumbnail}" title="${section.name}"></a></div>`);

            $("#thumbnails").append(el);

            $(el).data("id", section.name);
        });
    }
};

com.charlierobin.getSectionByName = function (name) {

    const nameMatched = com.charlierobin.archaeology().filter((value, index, array) => {

        return value.name == name;
    });

    const result = nameMatched[0];

    return result;
}

com.charlierobin.cookiesClickA = function(e) {

    localStorage.clear();

    alert("The cookies and other client storage used by this site have been removed from your device.");

    e.preventDefault();
}

com.charlierobin.storeThumbnailsData = function() {

    let order = [];

    $("#thumbnails").children().each((index, elem) => {

        order.push({ id: $(elem).data("id"), L: $(elem).css("left"), T: $(elem).css("top"), M: $(elem).css("transform") });
    });

    order = JSON.stringify(order);

    localStorage.setItem("thumbnails", order);
}

com.charlierobin.storeSectionLayoutData = function(id) {

    let order = [];

    $("#fullsize").children().each((index, elem) => {

        order.push({ id: $(elem).data("id"), L: $(elem).css("left"), T: $(elem).css("top"), M: $(elem).css("transform") });
    });

    order = JSON.stringify(order);

    const picDataName = "data-" + id;

    localStorage.setItem(picDataName, order);
}

com.charlierobin.bringToFront = function(clicked) {

    const container = clicked.parent();

    $(clicked).detach();

    $(container).append(clicked);
}

com.charlierobin.select = function(clickedThumbnail) {

    $("#thumbnails").children().removeClass('selected');

    $(clickedThumbnail).addClass('selected');

    com.charlierobin.bringToFront(clickedThumbnail);
}

com.charlierobin.isSelected = function(element) {

    return $(element).hasClass('selected');
}

com.charlierobin.thumbnailsClick = function(e) {

    const clickedThumbnail = $(e.target).parent();

    if (com.charlierobin.isSelected(clickedThumbnail)) return false;

    com.charlierobin.select(clickedThumbnail);

    com.charlierobin.storeThumbnailsData();

    $("#fullsize").empty();

    const id = $(clickedThumbnail).data("id");

    com.charlierobin.loadUpFullSizeImages(id);

    return false;
}

com.charlierobin.getSelectedThumbnail = function() {

    let selected = null;

    $("#thumbnails").children().each((index, elem) => {

        if ($(elem).hasClass('selected')) {
            selected = elem;
        }
    });

    return selected;
}

com.charlierobin.loadUpFullSizeImages = function(id) {

    const picDataName = "data-" + id;

    let order = localStorage.getItem(picDataName);

    if (!order) {

        const pics = com.charlierobin.getPicsFor(id);

        let L = 30;
        let T = 40;

        pics.forEach(pic => {

            const el = $(`<div class="full" style="background-image: url(pictures/${pic}); left: ${L}%; top: ${T}%; transform: rotate(0.01turn);"></div>`);

            $("#fullsize").append(el);

            $(el).data("id", pic);

            L = L + 10;
            T = T + 2;
        });

        com.charlierobin.storeSectionLayoutData(id);
    }
    else {

        order = JSON.parse(order);

        order.forEach(item => {

            const el = $(`<div class="full" style="background-image: url(pictures/${item.id}); left: ${item.L}; top: ${item.T}; transform: ${item.M};"></div>`);

            $("#fullsize").append(el);

            $(el).data("id", item.id);
        });
    }
}

com.charlierobin.fullSizeMouseDownFull = function(e) {

    const clickedImage = $(e.target);

    com.charlierobin.bringToFront(clickedImage);

    $(clickedImage).addClass("fullDragging");

    $("body").data('clickedImage', clickedImage);
    $("body").data('altMode', e.altKey);

    $("body").data('clickedX', e.pageX);
    $("body").data('clickedY', e.pageY);

    $("body").data('offSetX', e.pageX - clickedImage.offset().left);
    $("body").data('offSetY', e.pageY - clickedImage.offset().top);

    e.preventDefault();
}

com.charlierobin.galleryMouseMove = function(e) {

    if ($("body").data('clickedImage')) {

        const clickedImage = $("body").data('clickedImage');

        if ($("body").data('altMode')) {

            let diffX = $("body").data('clickedX') - e.pageX;

            diffX = diffX / 1000;

            let diffY = $("body").data('clickedY') - e.pageY;

            diffY = diffY / 100;

            diffY = 1 + diffY;

            $(clickedImage).css("transform", "rotate(" + diffX + "turn)" + " " + "scale(" + diffY + ")");

        } else {

            clickedImage.offset({ top: e.pageY - $("body").data('offSetY'), left: e.pageX - $("body").data('offSetX') });
        }
    }
}

com.charlierobin.galleryMouseUp = function(e) {

    if ($("body").data('clickedImage')) {

        const clickedImage = $("body").data('clickedImage');

        $(clickedImage).removeClass("fullDragging");
    }

    $("body").removeData('clickedImage');
    $("body").removeData('altMode');

    $("body").removeData('clickedX');
    $("body").removeData('clickedY');

    $("body").removeData('offSetX');
    $("body").removeData('offSetY');

    const sectionID = $(com.charlierobin.getSelectedThumbnail()).data('id');

    com.charlierobin.storeSectionLayoutData(sectionID);
}

com.charlierobin.getPicsFor = function(name) {

    const nameMatched = com.charlierobin.archaeology().filter((value, index, array) => {

        return value.name == name;
    });

    const result = nameMatched[0];

    return result.pics;
}

com.charlierobin.randomInRange = function(min, max) {

    const range = max - min;

    return (Math.random() * range) + min;
}

com.charlierobin.randomIntInRangeInclusive = function(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);
}
