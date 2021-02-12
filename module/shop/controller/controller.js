function load_content(url) {
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: 'module/shop/controller/controller_shop.php?op=filter&' + url,
    }).done(function (jsonSearch) {
        // console.log(jsonSearch); //Debug
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
// FALTA:  ALINIEAR EL PREU EN EL BOTO)
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
        $('#result-content').empty();
        $('<table></table>').attr({ 'id': 'car_details_table', 'class': 'table table-hover' }).appendTo('#result-content');
        $('#car_details_table').html(function () {
            for (row in jsonCar) {
                $('<tr></tr>').attr({ 'id': row }).appendTo('#car_details_table');
                $('<td></td>').attr({ 'id': `${row}index` }).append(document.createTextNode(row)).appendTo('#' + row);
                $('<td></td>').attr({ 'id': `${row}content` }).append(document.createTextNode(jsonCar[row])).appendTo('#' + row);
            }

        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (console && console.log) {
            console.log("Error name/code: " + textStatus);
        }
        //window.location.href = 'index.php?page=error503';
    });


}
// var markers = [];

// function initialize() {

//     var beaches = [
//         ['Bondi Beach', -33.890542, 151.274856, 1],
//         ['Coogee Beach', -33.923036, 151.259052, 1],
//         ['Cronulla Beach', -34.028249, 151.157507, 2],
//         ['Manly Beach', -33.800101, 151.287478, 2],
//         ['Maroubra Beach', -33.950198, 151.259302, 2]
//     ];

//     // var map = new google.maps.Map(document.getElementById('map'), {
//     //     zoom: 10,
//     //     center: new google.maps.LatLng(-33.88, 151.28),
//     //     mapTypeId: google.maps.MapTypeId.ROADMAP
//     // });

//     // var infowindow = new google.maps.InfoWindow();

//     for (var i = 0; i < beaches.length; i++) {

//         var newMarker = new google.maps.Marker({
//             position: new google.maps.LatLng(beaches[i][1], beaches[i][2]),
//             map: map,
//             title: beaches[i][0]
//         });

//         google.maps.event.addListener(newMarker, 'click', (function (newMarker, i) {
//             return function () {
//                 infowindow.setContent(beaches[i][0]);
//                 infowindow.open(map, newMarker);
//             }
//         })(newMarker, i));

//         markers.push(newMarker);
//     }
// }

// initialize();
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
                            infowindow.setContent("<b>"+jsonSearch[i]["brand"]+" "+jsonSearch[i]["model"]+"</b><br>"+jsonSearch[i]["carcondition"]+" "+jsonSearch[i]["price"]+"€"+"<br><img class='mapsimage' id='"+jsonSearch[i]["registration"]+"' style='height:110px;' src='"+jsonSearch[i]["src"]+"' alt='image in infowindow'>");
                            infowindow.open(map, newMarker);
                        }
                    })(newMarker, i));
                    markers.push(newMarker);
                });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                if (console && console.log) {
                    console.log("Error name/code: " + textStatus);
                }
                //window.location.href = 'index.php?page=error503';
            });
        },
        () => {
            console.log(true, infoWindow, map.getCenter());
        }
    );
}
function getSearchValues() {
    var keyword = $("#shop-search").val();
    var brand = $("#brand_cat").val();
    var condition = $("#condition_cat").val();
    var maxprice = $("#max_price").val();
    var minprice = $("#min_price").val();
    if (maxprice == "") {
        maxprice = 99999999;
    }
    if (minprice == "") {
        minprice = 100;
    }

    var url = "keyword=" + keyword + "&brand=" + brand + "&condition=" + condition + "&minprice=" + minprice + "&maxprice=" + maxprice;
    load_content(url);
}
$(document).ready(function () {
    load_filters();
    // getmap();
    if(document.getElementById("map") != null){
        var script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key="+MAPAPI+"&callback=initMap";
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
                    var url = "keyword=%&brand=%&condition=New&minprice=100&maxprice=99999999";
                    load_content(url);
                    break;
                case "Seat":
                    var url = "keyword=%&brand=Seat&condition=%&minprice=100&maxprice=99999999";
                    load_content(url);
                    break;
                case "Luxury":
                    var url = "keyword=%&brand=%&condition=%&minprice=200000&maxprice=99999999";
                    load_content(url);
                    break;
                case "Preowned":
                    var url = "keyword=%&brand=%&condition=Used&minprice=100&maxprice=99999999";
                    load_content(url);
                    break;
                case "BMW":
                    var url = "keyword=%&brand=BMW&condition=%&minprice=100&maxprice=99999999";
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
    $('.btn-details').on('click', function () {
        details(this.getAttribute("id"));
    });
    $(document).on("click", ".btn-details", function () {
        details($(this).attr('id')); // or var clickedBtnID = this.id
    });
    $(document).on("click", ".mapsimage", function () {
        details($(this).attr('id')); // or var clickedBtnID = this.id
    });

});