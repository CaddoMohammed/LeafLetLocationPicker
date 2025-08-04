const LeafletLocationPicker = {
	"Marker":null,
	"width":12,
	"height":12,
	"color":"#000000",
	"thickness":2.5,
	"label":{"title":"","direction":"","always visible":false},
	"PickLocation": function(mapa,inputs){
		let keys = ["lat","lng"];
		for(i in keys){
			if(inputs[keys[i]]===undefined){return};
		}
		mapa.on('click',function(W){
			let coords = {"lat":W.latlng.lat,"lng":W.latlng.lng};
			for(let i in coords){
				let a = "";
				if(inputs[i] instanceof HTMLElement){a="innerHTML"};
				if(inputs[i] instanceof HTMLInputElement){a="value"};
				if(a===""){inputs[i] = coords[i]};
				if(a!==""){inputs[i][a] = coords[i]};
			}
			if(LeafletLocationPicker["SetLocation"]===undefined){console.error("function SetLocation() not found");return};
			LeafletLocationPicker["SetLocation"](mapa,coords,false);
		});
	},
	"SetLocation": function(mapa,coordenadas,move){
		if((typeof(coordenadas)==="object")&&Array.isArray(coordenadas)){return};
		let keys = ["lat","lng"];
		for(i in keys){
			if(coordenadas[keys[i]]===undefined){console.error(`undefined key ${keys[i]}`);return};
			if(isNaN(coordenadas[keys[i]])){console.error(`value for ${keys[i]} is NaN`);return};
		}
		if(LeafletLocationPicker["icon"]===undefined){
			LeafletLocationPicker["icon"] =
				`<div style="display:flex; align-items:center; background-color:transparent; flex-wrap:nowrap; flex-shrink:0;">
					<div style="width:${LeafletLocationPicker["width"]-LeafletLocationPicker["thickness"]/2}px; height:${LeafletLocationPicker["thickness"]}px; background-color:${LeafletLocationPicker["color"]}; margin:auto 0"></div>
							<div style="display:flex; flex-direction:column; flex-wrap:nowrap; flex-shrink:0;">
								<div style="width:${LeafletLocationPicker["thickness"]}px; height:${LeafletLocationPicker["width"]}px; background-color:${LeafletLocationPicker["color"]};"></div>
								<div style="width:${LeafletLocationPicker["thickness"]}px; height:${LeafletLocationPicker["width"]}px; background-color:${LeafletLocationPicker["color"]};"></div>
							</div>
					<div style="width:${LeafletLocationPicker["width"]-LeafletLocationPicker["thickness"]/2}px; height:${LeafletLocationPicker["thickness"]}px; background-color:${LeafletLocationPicker["color"]}; margin:auto 0"></div>
				</div>`
		}
		if(LeafletLocationPicker["Marker"]!==null){mapa.removeLayer(LeafletLocationPicker["Marker"]);LeafletLocationPicker["Marker"]=null};
		if((LeafletLocationPicker["label"]["title"]==="")||LeafletLocationPicker["label"]["direction"]===""){
			LeafletLocationPicker["Marker"] = L.marker(coordenadas,{icon:L.divIcon({className:"",iconSize:[2*LeafletLocationPicker["width"],2*LeafletLocationPicker["height"]],iconAnchor:[LeafletLocationPicker["width"],LeafletLocationPicker["width"]],html:LeafletLocationPicker["icon"]})}).addTo(mapa);
		} else {
			LeafletLocationPicker["Marker"] = L.marker(coordenadas,{icon:L.divIcon({className:"",iconSize:[2*LeafletLocationPicker["width"],2*LeafletLocationPicker["height"]],iconAnchor:[LeafletLocationPicker["width"],LeafletLocationPicker["width"]],html:LeafletLocationPicker["icon"]})}).addTo(mapa).bindTooltip(LeafletLocationPicker["label"]["title"],{permanent:LeafletLocationPicker["label"]["always visible"],"direction":LeafletLocationPicker["label"]["direction"]});
		}
		if((move==true)||(move===undefined)){mapa.setView(coordenadas,mapa.getZoom())};
	}
}