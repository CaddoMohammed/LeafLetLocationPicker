let marker = null;
function LocationPicker(X,Y,Z){
	Z.on('click', function(W) {
		let a = W.latlng.lat; // Latitud
		let b = W.latlng.lng; // Longitud
		X.value = a;
		Y.value = b;
		SetLocation(a,b,Z)
	});
}
function SetLocation(X,Y,Z){
	if(marker){
		Z.removeLayer(marker);
	}
	marker = L.marker([X,Y], {
		icon: L.icon({
			iconUrl: "LeafletLocationPicker/bx-cross.svg",
			iconSize: [35,35],
			iconAnchor: [17.5,17.5],
		})
	}).addTo(Z).openPopup();
}