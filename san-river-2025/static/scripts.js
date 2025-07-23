window.onload = function () {
    waitForFoliumMap();
};

function waitForFoliumMap() {
    for (let key in window) {
        if (key.startsWith("map_") && window[key] instanceof L.Map) {
            const map = window[key];
            console.log("Mapa znaleziona:", key);
            min_zoom(map);
            map_boundaries(map);
            bindMarkerClickEvents();
            return; 
        }
    }
    console.log("Jeszcze nie znaleziono mapy...");
    setTimeout(waitForFoliumMap, 100);
}

function bindMarkerClickEvents() {
    for (let key in window) {
        if (key.startsWith("marker_") && window[key] instanceof L.Marker) {
            const marker = window[key];
            marker.on('click', function (e) {
                const lat = e.latlng.lat.toFixed(5);
                const lng = e.latlng.lng.toFixed(5);
                const url = `https://www.google.com/maps/place/${lat},${lng}?hl=pl`;
                window.open(url, '_blank');
            });
        }
    }
}

function min_zoom(map) {
    map.setMinZoom(10);
    map.setMaxZoom(15);
    map.options.zoomSnap = 0;
    map.options.zoomDelta = 0.1;
}

function map_boundaries(map) {
    var bounds = L.latLngBounds(
        L.latLng(49.34, 21.63), 
        L.latLng(49.92, 23.37)
    );
    map.setMaxBounds(bounds);

    map.on("drag", function () {
        map.panInsideBounds(bounds, { animate: false });
    });
}

function toggleLegend() {
  const box = document.getElementById('legendBox');
  const icon = document.getElementById('legendIcon');

  const isCollapsed = box.classList.toggle('collapsed');

  // steruj widocznością ikony FA poza legendą
  if (isCollapsed) {
    icon.style.visibility = 'visible';
  } else {
    icon.style.visibility = 'hidden';
  }
}
