var map
var marcador
var bounds = new google.maps.LatLngBounds();
var directionsDisplay = new google.maps.DirectionsRenderer();

function initializa() {

	var mapOptions = {
		zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map_ganvas'),
		mapOptions);

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		var pos = new google.maps.LatLng(position.coords.latitude,
														   position.coords.longitude);

		var infowindow = new google.maps.InfoWindow({
					map: map,
					position: pos,
					content: 'Aqui Estoy!'
					})
					marcador = new google.maps.Marker({
					position: pos,
					map:map,
					title: 'Dónde estoy?' })

						  map.setCenter(pos);
						}, function() {
						  handleNoGeolocation(true);
						});
					  } else {
						// Browser doesn't support Geolocation
						handleNoGeolocation(false);
					  }

					function handleNoGeolocation(errorFlag) {
					  if (errorFlag) {
						var content = 'Error: The Geolocation service failed.';
					  } else {
						var content = 'Error: Your browser doesn\'t support geolocation.';
					  }

					  var options = {
						map: map,
						position: new google.maps.LatLng(60, 105),
						content: content
					  };

					  var infowindow = new google.maps.InfoWindow(options);
					  map.setCenter(options.position);
					}
					//AQUI EMPIEZA
					var getJSON = function(url) {
					  return new Promise(function(resolve, reject) {
					    var xhr = new XMLHttpRequest();
					    xhr.open('get', url, true);
					    xhr.responseType = 'json';
					    xhr.onload = function() {
					      var status = xhr.status;
					      if (status == 200) {
					        resolve(xhr.response);
					      } else {
					        reject(status);
					      }
					    };
					    xhr.send();
					  });
					};

					getJSON('https://json4apps.herokuapp.com/centros').then(function(data) {
					counta = Object.keys(data.Data).length;
					for(i=0; i<counta;i++){
					  if(data.Data[i].CA_GEO!=null && data.Data[i].CA_GEO!="" && data.Data[i].CA_NOMBRE!="" && data.Data[i].CA_NOMBRE!= null){
					  		var nombre = data.Data[i].CA_NOMBRE;
					  		var dir = data.Data[i].CA_DIR;
					  		var destroy = data.Data[i].CA_GEO;
					  		var arr 	= destroy.split(',');
					  		var lat 	= arr[0];
					  		var lan 	= arr[1];
							var marcadors = new google.maps.Marker({

								position: new google.maps.LatLng(lat, lan),
								map:map,
								title: data.Data[i].CA_NOMBRE});
							marcadors.setTitle((i + 1).toString());
    						attachMessage(marcadors, i,nombre,dir,lat,lan);
							}
						}
					     //display the result in an HTML element
					}, function(status) { //error detection....
					  alert('Something went wrong.');
					});
					//AQUI TERMINA
					google.maps.event.trigger(map,'resize')
}
function attachMessage(marker, num,names,dir,lat,lng) {
	var message = "jorgy boy";
	message = names;
	direc = dir;
	var infowindow = new google.maps.InfoWindow({
 	content: direc+"</br>"+message
  	});
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(marker.get('map'), marker);
		calcRoute(lat, lng, 1)
  });
}

function calcRoute(lat, lng, mode){
	var directionsService = new google.maps.DirectionsService();
	directionsDisplay.setMap(map);
	var destino = new google.maps.LatLng(lat,lng);
	var origen = new google.maps.LatLng(marcador.getPosition().lat(),marcador.getPosition().lng());
	map.setCenter(origen);
	if (mode==0) {
		var request = {
			destination: destino,
			origin: origen,
			travelMode: google.maps.DirectionsTravelMode.WALKING //WALKING, TRANSIT, DRIVING
		};
	}else {
		var request = {
			destination: destino,
			origin: origen,
			travelMode: google.maps.DirectionsTravelMode.DRIVING //WALKING, TRANSIT, DRIVING
		};
	}

	directionsService.route(request, function(response,status){
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setOptions({ preserveViewport: true });
			directionsDisplay.setDirections(response);
							}
	});
}

function gofoward(){
	initializa();
}
