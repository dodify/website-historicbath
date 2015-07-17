/**
 * Index page JavaScript logic.
 *
 * @copyright   2015 dodify Ltd.
 * @license     See LICENSE in repository root
 */

var maps = "https://www.google.com/maps/dir/LAT,LNG/";

$(document).ready(function() {

    // Build map
    var topH = $('header').outerHeight(true);
    var broH = $(window).height();
    $('#map').height(broH - topH);
    var map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(51.38212035, -2.36176014),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    // Add photos
    var markers = [];
    for(i in photos) {
        
        var photo = photos[i];
        var title = photo.title;
        var file  = "Images/" + photo.file;
        var desc  = photo.description;
        var go    = maps + photo.lat + ',' + photo.lng;
        var sview = photo.sview;
        
        // Create content
        var html =
            '<div class="scrollFix">' +
                '<img src="' + file + '" style="width: 320px;" />' +
                '<h3>' + title + '</h3>' +
                '<p>' + desc + '</p>' +
                '<a target="_blank" href="' + go + '">Go!</a>' +
                '<a target="_blank" href="' + sview + '">Present View</a>' +
            '</div>';        
        
        // Create marker
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(photo.lat, photo.lng),
            map:      map,
            title:    title,
            info:     new google.maps.InfoWindow({ content: html })
        });
        
        markers.push(marker);

        // Click event to open the info window
        google.maps.event.addListener(marker, "click", function() {
            for(i in markers) {
                markers[i].info.close();
            }
            this.info.open(map, this);
        });
    }

    // If user location is available enable "go" buttons
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            for(i in markers) {
                markers[i].info.content = markers[i].info.content
                    .replace("LAT", pos.coords.latitude)
                    .replace("LNG", pos.coords.longitude);
            }
        });
    }
});