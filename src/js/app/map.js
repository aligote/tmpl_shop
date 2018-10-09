function initialize() {
    var googleMap = document.getElementById('map');
    var myLatlng = new google.maps.LatLng(50.6173568, 26.2686358);
    var map;
    var styles = [
    {
     stylers: [
      { hue: "#00ffe6" },
      { saturation: -20 }
     ]
    },{
     featureType: "road",
     elementType: "geometry",
     stylers: [
      { lightness: 100 },
      { visibility: "simplified" }
     ]
    },{
     featureType: "road",
     elementType: "labels",
     stylers: [
      { visibility: "off" }
     ]
    }
    ];
    var mapOptions = {
        zoom: 17,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: myLatlng,
        styles: styles
    };
    map = new google.maps.Map(googleMap, mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
}
google.maps.event.addDomListener(window, 'load', initialize());