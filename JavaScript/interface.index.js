/**
 * Index page JavaScript logic.
 *
 * @copyright   2015 dodify Ltd.
 * @license     See LICENSE in repository root
 */

var maps = "https://www.google.com/maps/dir/LAT,LNG/";

$(document).ready(function() {

    // Add all the photos to HTML grid
    for(i in photos) {
        
        var photo = photos[i];
        var title = photo.title;
        var file  = "Images/" + photo.file;
        var desc  = title + ' - ' + photo.description;
        var go    = maps + photo.lat + ',' + photo.lng;
        var sview = photo.sview;
        
        // Actual HTML to be added for each photo
        var html = 
            '<div class="item"><div>' + 
                '<img src="' + file + '" alt="' + title + '" />' + 
                '<h3>' + title + '</h3>' + 
                '<a href="' + file + '" data-lightbox="photo" data-title="' + 
                    desc + '">Read More</a>' + 
                '<a href="' + go + '" target="_blank" class="go">Go!</a>' +
                '<a href="' + sview + '" target="_blank">Present View</a>' +
            '</div></div>';
        $('#grid').append(html);
    }
    
    // If user location is available add "go" buttons
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            $(".go").each(function() {
                $(this).attr('href',
                    $(this).attr('href')
                    .replace("LAT", pos.coords.latitude)
                    .replace("LNG", pos.coords.longitude)
                );
            });
            $('.go').css('display', 'block');
        });
    }

    // Activate masonry style
    var $grid = $('#grid').masonry({
        itemSelector: '.item',
        percentPosition: true
    });
    
    // Make sure grid renders correctly
    $grid.imagesLoaded().progress( function() {
        $grid.masonry('layout');
    });
});