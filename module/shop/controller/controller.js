function load_content(url) {
    $('.pagination').empty();
    getPaginationValues();
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: 'module/shop/controller/controller_shop.php?op=filter&' + url,
    }).done(function (jsonSearch) {
        $('#result-content').empty();
        if (Object.keys(jsonSearch).length == 1) {
            details(jsonSearch[0]["registration"]);
        } else {
            $.each(jsonSearch, function (i, item) {
                var reg = jsonSearch[i]['registration'];
                $('<div></div>').attr({ 'id': `car_details_card_${reg}`, 'style': 'width: 18rem; flex-basis: 30.333333%; margin-bottom: 20px; background-color: floralwhite', 'class': 'card' }).appendTo('#result-content');
                $(`#car_details_card_${reg}`).html(function () {
                    $('<img>').attr({ 'class': 'card-img-top', 'src': 'https://www.abc.es/media/peliculas/000/019/042/cars-2.jpg' }).appendTo('#car_details_card_' + reg);
                    $('<div></div>').attr({ 'class': 'card-body', 'id': `card-body_${reg}` }).appendTo('#car_details_card_' + reg);
                    $('<h5></h5>').attr({ 'class': 'card-title' }).append(document.createTextNode(jsonSearch[i]['brand'] + " " + jsonSearch[i]['model'])).appendTo('#card-body_' + reg);
                    $('<p></p>').attr({ 'class': 'card-text' }).append(document.createTextNode("Brand: " + jsonSearch[i]['brand'])).appendTo('#card-body_' + reg);
                    $('<p></p>').attr({ 'class': 'card-text' }).append(document.createTextNode("Registration Date: " + jsonSearch[i]['regdate'])).appendTo('#card-body_' + reg);
                    $('<p></p>').attr({ 'class': 'card-text' }).append(document.createTextNode("Condition: " + jsonSearch[i]['carcondition'])).appendTo('#card-body_' + reg);
                    $('<p></p>').attr({ 'class': 'card-text' }).append(document.createTextNode("Upgrades: " + jsonSearch[i]['upgrades'])).appendTo('#card-body_' + reg);
                    $('<p></p>').attr({ 'class': 'card-text' }).append(document.createTextNode("Price: " + jsonSearch[i]['price'] + " €")).appendTo('#card-body_' + reg);
                    $('<a></a>').attr({ 'class': 'btn btn-primary btn-details', 'id': `${reg}` }).append(document.createTextNode("Buy")).appendTo('#card-body_' + reg);
                });
            });
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (console && console.log) {
            console.log("Error name/code: " + textStatus);
            no_result($("#shop-search").val());
        }
    });
}
function pagination(url) {
    var showperpage = $("#num_pag_select").val();
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: 'module/shop/controller/controller_shop.php?op=getpagination&' + url,
    }).done(function (jsonSearch) {
        // console.log(jsonSearch);
        if (Object.keys(jsonSearch).length / showperpage - Math.floor(Object.keys(jsonSearch).length / showperpage) == 0) {
            varnumfinal = Object.keys(jsonSearch).length / showperpage;
        } else {
            varnumfinal = (Math.floor(Object.keys(jsonSearch).length / showperpage)) + 1;
        }
        load_pagination(varnumfinal);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (console && console.log) {
            console.log("Error name/code: " + textStatus);
            no_result($("#shop-search").val());
        }
    });
}
function load_pagination(numpages) {
    for (let i = 1; i < numpages + 1; i++) {
        $("<li></li>").attr({ "class": "page-item", "id": "index" + i }).appendTo(".pagination");
        $("<p></p>").attr({ "class": "page-link", "id": i }).append(document.createTextNode(i)).appendTo("#index" + i);
    }
}
function no_result(keyword) {
    $('#result-content').empty();
    $('<p></p>').attr({ 'class': 'text-danger h3' }).append(document.createTextNode('No results found for ' + keyword)).appendTo('#result-content');
}
function load_filters() {
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: 'module/shop/controller/controller_shop.php?op=load_filters',
    }).done(function (jsonSearch) {
        $.each(jsonSearch, function (i, item) {
            $("<option></option>").attr({ 'value': jsonSearch[i]["brand"] }).append(document.createTextNode(jsonSearch[i]["brand"] + "  " + jsonSearch[i]["num"])).appendTo("#brand_cat");
        });

    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (console && console.log) {
            console.log("Error name/code: " + textStatus);
        }
    });
}
function details(id) {
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: 'module/shop/controller/controller_shop.php?op=details&id=' + id,
    }).done(function (jsonCar) {
        // console.log(jsonCar); // Debug
        $('.pagination').empty();
        $('#result-content').empty();
        $('<table></table>').attr({ 'id': 'car_details_table', 'class': 'table table-hover' }).appendTo('#result-content');
        $('#car_details_table').html(function () {
            for (row in jsonCar) {
                if (row == "srcimg") {
                    $('<tr></tr>').attr({ 'id': row }).appendTo('#car_details_table');
                    $('<td></td>').attr({ 'id': `${row}index`, 'class': 'text-center' }).appendTo('#' + row);
                    $('<img>').attr({ 'id': `${row}content`, 'class': 'text-center', 'src': jsonCar[row] }).appendTo(`#${row}index`);
                } else {
                    $('<tr></tr>').attr({ 'id': row }).appendTo('#car_details_table');
                    $('<td></td>').attr({ 'id': `${row}index` }).append(document.createTextNode(row)).appendTo('#' + row);
                    $('<td></td>').attr({ 'id': `${row}content` }).append(document.createTextNode(jsonCar[row])).appendTo('#' + row);
                }
            }
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (console && console.log) {
            console.log("Error name/code: " + textStatus);
        }
    });
}
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(37.88, -1.28),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var infowindow = new google.maps.InfoWindow();
    var markers = [];
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            infowindow.setPosition(pos);
            map.setCenter(pos);
            $.ajax({
                type: 'GET',
                dataType: 'JSON',
                url: 'module/shop/controller/controller_shop.php?op=getmap&lat=' + pos["lat"] + "&lon=" + pos["lng"],
            }).done(function (jsonSearch) {
                $.each(jsonSearch, function (i, item) {
                    var myLatlng = new google.maps.LatLng(jsonSearch[i]["lat"], jsonSearch[i]["lon"]);
                    var newMarker = new google.maps.Marker({
                        position: myLatlng,
                        map,
                        title: "Car near!",
                    });
                    google.maps.event.addListener(newMarker, 'click', (function (newMarker, i) {
                        return function () {
                            infowindow.setContent("<b>" + jsonSearch[i]["brand"] + " " + jsonSearch[i]["model"] + "</b><br>" + jsonSearch[i]["carcondition"] + " " + jsonSearch[i]["price"] + "€" + "<br><img class='mapsimage' id='" + jsonSearch[i]["registration"] + "' style='height:110px;' src='" + jsonSearch[i]["src"] + "' alt='image in infowindow'>");
                            infowindow.open(map, newMarker);
                        }
                    })(newMarker, i));
                    markers.push(newMarker);
                });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("Error name/code: " + textStatus);
                }
            });
        },
        () => {
            console.log(true, infoWindow, map.getCenter());
        }
    );
}
function getPaginationValues() {
    var keyword = $("#shop-search").val();
    var brand = $("#brand_cat").val();
    var condition = $("#condition_cat").val();
    var maxprice = $("#max_price").val();
    var minprice = $("#min_price").val();
    var showing = $("#num_pag_select").val();
    var page = 1;
    if (maxprice == "") {
        maxprice = 99999999;
    }
    if (minprice == "") {
        minprice = 100;
    }
    // var url = "keyword=" + keyword + "&brand=" + brand + "&condition=" + condition + "&minprice=" + minprice + "&maxprice=" + maxprice;
    var url = "keyword=" + keyword + "&brand=" + brand + "&condition=" + condition + "&minprice=" + minprice + "&maxprice=" + maxprice + "&showing=" + showing + "&page=" + page;
    pagination(url);
}
function getSearchValues(page = 1) {
    var keyword = $("#shop-search").val();
    var brand = $("#brand_cat").val();
    var condition = $("#condition_cat").val();
    var maxprice = $("#max_price").val();
    var minprice = $("#min_price").val();
    var showing = $("#num_pag_select").val();
    if (maxprice == "") {
        maxprice = 99999999;
    }
    if (minprice == "") {
        minprice = 100;
    }
    // var url = "keyword=" + keyword + "&brand=" + brand + "&condition=" + condition + "&minprice=" + minprice + "&maxprice=" + maxprice;
    var url = "keyword=" + keyword + "&brand=" + brand + "&condition=" + condition + "&minprice=" + minprice + "&maxprice=" + maxprice + "&showing=" + showing + "&page=" + page;
    load_content(url);
}
$(document).ready(function () {
    load_filters();
    if (document.getElementById("map") != null) {
        var script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=" + MAPAPI + "&callback=initMap";
        script.async;
        script.defer;
        document.getElementsByTagName('script')[0].parentNode.appendChild(script);
    }
    switch (localStorage.getItem("op")) {
        case null:
            getSearchValues();
            break;
        case "search":
            switch (localStorage.getItem("value")) {
                case "KM0":
                    var url = "keyword=%&brand=%&condition=New&minprice=100&maxprice=99999999&showing=10&page=1";
                    load_content(url);
                    break;
                case "Seat":
                    var url = "keyword=%&brand=Seat&condition=%&minprice=100&maxprice=99999999&showing=10&page=1";
                    load_content(url);
                    break;
                case "Luxury":
                    var url = "keyword=%&brand=%&condition=%&minprice=200000&maxprice=99999999&showing=10&page=1";
                    load_content(url);
                    break;
                case "Preowned":
                    var url = "keyword=%&brand=%&condition=Used&minprice=100&maxprice=99999999&showing=10&page=1";
                    load_content(url);
                    break;
                case "BMW":
                    var url = "keyword=%&brand=BMW&condition=%&minprice=100&maxprice=99999999&showing=10&page=1";
                    load_content(url);
                    break;
                case "global":
                    var url = "keyword="+localStorage.getItem("keyword")+"&brand="+localStorage.getItem('brand')+"&condition="+localStorage.getItem('condition')+"&minprice=100&maxprice=99999999&showing=10&page=1";
                    load_content(url);
                    break;
                default:
                    getSearchValues();
            };
            break;
        case "details":
            details(localStorage.getItem("value"));
            break;
        default:
            getSearchValues();
    };

    //Event Listeners to the search input
    $('#shop-search').on('change', function () {
        getSearchValues();
    });
    $('.fa-search').on('click', function () {
        getSearchValues();
    });
    //Event Listener for the "Buy" button
    $('.btn-details').on('click', function () {
        details(this.getAttribute("id"));
    });
    $(document).on("click", ".btn-details", function () {
        details($(this).attr('id')); 
    });
    //Event Listener for the car in the map
    $(document).on("click", ".mapsimage", function () {
        details($(this).attr('id')); 
    });
    //Event listener for the pagination 
    $(document).on("click", ".page-link", function () {
        getSearchValues($(this).attr('id')); // or var clickedBtnID = this.id
    });

});