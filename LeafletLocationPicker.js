let LeafletLocationPickerMarker = null;
let LeafletLocationPickerConfig = {"width":12,"height":2.5,"color":"#000000"};
function LocationPicker(InputLatitud,InputLongitud,Mapa){
	Mapa.on('click',function(W){
		const Latitud = W.latlng.lat;
		const Longitud = W.latlng.lng;
		InputLatitud.value = Latitud;
		InputLongitud.value = Longitud;
		SetLocation(Latitud,Longitud,Mapa)
	});
}
function SetLocation(Latitud,Longitud,Mapa){
	if(LeafletLocationPickerMarker){
		Mapa.removeLayer(LeafletLocationPickerMarker);
	}
	LeafletLocationPickerMarker = L.marker([Latitud,Longitud],{
		icon:L.divIcon({
			className:"",
			iconSize:[2*LeafletLocationPickerConfig["width"],2*LeafletLocationPickerConfig["width"]],
			iconAnchor:[LeafletLocationPickerConfig["width"],LeafletLocationPickerConfig["width"]],
			html:
				`<div style="display:flex; align-items:center; background-color:transparent;">
					<div style="width:${LeafletLocationPickerConfig["width"]}px; height:${LeafletLocationPickerConfig["height"]}px; background-color:${LeafletLocationPickerConfig["color"]};"></div>
					<div>
						<div style="width:${LeafletLocationPickerConfig["height"]}px; height:${LeafletLocationPickerConfig["width"]}px; background-color:${LeafletLocationPickerConfig["color"]};"></div>
						<div style="width:${LeafletLocationPickerConfig["height"]}px; height:${LeafletLocationPickerConfig["width"]}px; background-color:${LeafletLocationPickerConfig["color"]};"></div>
					</div>
					<div style="width:${LeafletLocationPickerConfig["width"]}px;height:${LeafletLocationPickerConfig["height"]}px; background-color:${LeafletLocationPickerConfig["color"]};"></div>
				</div>`			
		})
	}).addTo(Mapa).openPopup();
}