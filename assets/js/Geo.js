var map
var marcador
var bounds = new google.maps.LatLngBounds();
var directionsDisplay = new google.maps.DirectionsRenderer();

function goahead(){
	initialize();
}

function initialize() {

	var mapOptions = {
		zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map_canvas'),
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

					getJSON('https://json4apps.herokuapp.com/farmacias').then(function(data) {
					counta = Object.keys(data).length;
					for(i=0; i<counta;i++){
					  if(data[i].local_lat!="" && data[i].local_lng!="" && data[i].local_nombre!=""){
					  		var nombre = data[i].local_nombre;
					  		var idlocal = data[i].local_id;
					  		var H_A = data[i].funcionamiento_hora_apertura;
					  		var H_C = data[i].funcionamiento_hora_cierre;
					  		var tel = data[i].local_telefono;
					  		var di = data[i].local_direccion;
								var lat = data[i].local_lat;
								var lng = data[i].local_lng;
								var marcadors = new google.maps.Marker({

								position: new google.maps.LatLng(data[i].local_lat, data[i].local_lng),
								map:map,
								title: data[i].local_nombre});
							marcadors.setTitle((i + 1).toString());
    						attachSecretMessage(marcadors, i,nombre,idlocal,H_A,H_C,tel,di,lat,lng);
							}
						}
					     //display the result in an HTML element
					}, function(status) { //error detection....
					  alert('Something went wrong.');
					});
					//AQUI TERMINA
}
function attachSecretMessage(marker, num,names,idl,HA,HC,tel,di,lat,lng) {
	var message = "jorgy boy";
	var id = 0;
	message = names;
	id=idl;
	ho_A=HA;
	ho_C=HC;
	te=tel
	dir=di;
	var infowindow = new google.maps.InfoWindow({
 	content: dir+"</br>"+te+"</br>"+ho_A+"-"+ho_C+"</br>"+message+"</br><a href='http://farmanet.minsal.cl/maps/index.php/comprobar/informar/"+message+"/?id="+id+"' target='a_blank'>&nbspDenuncia</a>",
  	});
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(marker.get('map'), marker);
		calcRoute(lat, lng, 0)
  });
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
