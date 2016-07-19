/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// Google Maps Scripts
// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 3,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(39.422748, -44.535484), // New York

        // Disables the default Google Maps UI components
//        disableDefaultUI: true,
//        scrollwheel: false,
//        draggable: false,
        
        disableDefaultUI: false,
        scrollwheel: false,
        draggable: true,

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 29
            }, {
                "weight": 0.2
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 18
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 21
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "saturation": 36
            }, {
                "color": "#000000"
            }, {
                "lightness": 40
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 19
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }, {
                "weight": 1.2
            }]
        }]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    var markers = [
        ['London', 51.503454,-0.119562],
        ['Wall Street NY', 40.706008, -74.008815],
        ['Las Vegas NV', 36.169941, -115.13983],
        ['San Francisco CA', 37.774929, -122.419416],
        ['The Hamptons NY', 40.924616, -72.354791],
        ['Austin TX', 30.267153, -97.743061],
        ['Atlanta GA', 33.748995, -84.387982],
        ['Chicago IL', 41.878114, -87.629798],
        ['Seattle WA', 47.606209, -122.332071],
        ['Miami FL', 25.761680, -80.19179],
        ['Huntsville AL', 34.730369, -86.586104],
        ['Nashville TN', 36.162664, -86.781602],
        ['Charlotte NC', 35.227087, -80.843127],
        ['Hollywood CA', 34.092809, -118.328661],
        ['Napa Valley CA', 38.427431, -122.39433],
        ['San Jose CA', 37.339386, -121.894955],
        ['Los Angeles CA', 34.052234, -118.243685],
        ['Toronto', 43.653226, -79.383184],
        ['Miami FL', 25.761680, -80.19179],
        ['Orlando FL', 28.538335, -81.379236],
        ['New Orleans LA', 29.951066, -90.07153],
        ['Stanford CA', 37.424106, -122.166076],
        ['MIT MA', 42.360243, -71.100318],
        ['Tampa FL', 27.950575, -82.457178],
        ['Malibu CA', 34.025922, -118.779757],
        ['Santa Clara CA', 37.356159, -121.962168],
        ['Washington DC', 38.907192, -77.036871],
        ['Rio', -22.911632, -43.188286],
        ['Buenos Aires', -34.603684, -58.381559],
        ['Amsterdam', 52.370216, 4.895168],
        ['Berlin', 52.520007, 13.404954],
        ['Paris', 48.856614, 2.352222],
        ['Hong Kong', 22.396428, 114.109497],
        ['Singapore', 1.352083, 103.819836],
        ['Beijing', 39.904211, 116.407395],
        ['Seoul', 37.566535, 126.977969],
        ['Dublin', 53.349805, -6.26031],
        ['Stockholm', 59.329323, 18.068581],
        ['Tel Aviv', 32.085300, 34.781768],
        ['Munich', 48.135125, 11.581981],
        ['Athens', 37.983917, 23.72936],
        ['Kiev', 50.450100, 30.5234],
        ['Melbourne', -37.814107, 144.96328]
    ];
    // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
    var image = '/img/map-marker.png';
//    var myLatLng = new google.maps.LatLng(40.6700, -73.9400);
//    var beachMarker = new google.maps.Marker({
//        position: myLatLng,
//        map: map,
//        icon: image
//    });
//    
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: image,
            title: markers[i][0]
        });
        
    }
}
