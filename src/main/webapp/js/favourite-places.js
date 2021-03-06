/** Creates and displays a map on the page with everyone's favourite locations */
function createMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:26.80,  lng: 16.59 },
        zoom: 2.0
      });

    addLandmark(map, 43.724911, -79.394798, 'Ginelle\'s Favourite Place',
          'Toronto is Ginelle\'s favourite place in the world.');
    addLandmark(map, 32.640176, 51.677378, 'Pardis\'s Favourite Place',
          'Esfahan is Pardis\'s favourite place in the world.');
    addLandmark(map, 30.579241, 114.344387, 'Chloe\'s Favourite Place',
          'Wuhan is Chloe\'s favourite place in the world.');
    addLandmark(map, 21.171620, 72.806259, 'Priyal\'s Favourite Place',
          'Surat is Priyal\'s favourite place in the world.');

    }

/** Adds a marker that shows an info window when clicked. */
function addLandmark(map, lat, lng, title, description) {
  const marker = new google.maps.Marker ({
    position: {lat: lat, lng: lng},
    map: map,
    title: title
  });
  const infoWindow = new google.maps.InfoWindow({
    content: description
  });
  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
}

