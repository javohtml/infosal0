var map
var marcador
var wap
var warcador
function goahead(){
	initialize();
	initializa();
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

					getJSON('http://infosaludapp.cl/getLocals.php').then(function(data) {
					counta = Object.keys(data).length;
					for(i=0; i<counta;i++){
					  if(data[i].local_lat!="" && data[i].local_lng!="" && data[i].local_nombre!=""){
					  		var nombre = data[i].local_nombre;
					  		var idlocal = data[i].local_id;
					  		var H_A = data[i].funcionamiento_hora_apertura;
					  		var H_C = data[i].funcionamiento_hora_cierre;
					  		var tel = data[i].local_telefono;
					  		var di = data[i].local_direccion;
							/*var infowindow = new google.maps.InfoWindow({
											map: map,
											position: new google.maps.LatLng(data[i].local_lat, data[i].local_lng),
											content: data[i].local_nombre
											})*/
							var marcadors = new google.maps.Marker({

								position: new google.maps.LatLng(data[i].local_lat, data[i].local_lng),
								map:map,
								title: data[i].local_nombre});
							marcadors.setTitle((i + 1).toString());
    						attachSecretMessage(marcadors, i,nombre,idlocal,H_A,H_C,tel,di);
							}
						}
					     //display the result in an HTML element
					}, function(status) { //error detection....
					  alert('Something went wrong.');
					});
					//AQUI TERMINA
}
function attachSecretMessage(marker, num,names,idl,HA,HC,tel,di) {
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
  });
}
function initializa() {
				
	var mapOptions = {
		zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	mapa = new google.maps.Map(document.getElementById('map_ganvas'),
		mapOptions);
					
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		var pos = new google.maps.LatLng(position.coords.latitude,
														   position.coords.longitude);

		var infowindow = new google.maps.InfoWindow({
					map: mapa,
					position: pos,
					content: 'Aqui Estoy!'
					})
					marcador = new google.maps.Marker({
					position: pos,
					map:mapa,
					title: 'Dónde estoy?' })
					
						  mapa.setCenter(pos);
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
						map: mapa,
						position: new google.maps.LatLng(60, 105),
						content: content
					  };

					  var infowindow = new google.maps.InfoWindow(options);
					  mapa.setCenter(options.position);
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

					getJSON('http://infosaludapp.cl/infohos.php').then(function(data) {
					counta = Object.keys(data).length;
					for(i=0; i<counta;i++){
					  if(data[i].CA_GEO!=null && data[i].CA_GEO!="" && data[i].CA_NOMBRE!="" && data[i].CA_NOMBRE!= null){
					  		var nombre = data[i].CA_NOMBRE;
					  		var dir = data[i].CA_DIR;
					  		var destroy = data[i].CA_GEO;
					  		var arr 	= destroy.split(',');
					  		var lat 	= arr[0];
					  		var lan 	= arr[1];
							var marcadors = new google.maps.Marker({

								position: new google.maps.LatLng(lat, lan),
								map:mapa,
								title: data[i].CA_NOMBRE});
							marcadors.setTitle((i + 1).toString());
    						attachMessage(marcadors, i,nombre,dir);
							}
						}
					     //display the result in an HTML element
					}, function(status) { //error detection....
					  alert('Something went wrong.');
					});
					//AQUI TERMINA
}
function attachMessage(marker, num,names,dir) {
	var message = "jorgy boy";
	message = names;
	direc = dir;
	var infowindow = new google.maps.InfoWindow({
 	content: direc+"</br>"+message
  	});
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(marker.get('map'), marker);
  });
}