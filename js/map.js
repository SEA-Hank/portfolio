var initMap = function () {
  const myLatLng = { lat: 47.62479327422437, lng: -122.348230405326 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: myLatLng,
  });
  new google.maps.Marker({
    position: myLatLng,
    map,
  });
};
