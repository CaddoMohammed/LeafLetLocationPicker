const Inputs = [document.getElementById("latitud"),document.getElementById("longitud")];
const Descriptors = [Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value").set,Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value").get];
const ErrorInputs = [document.getElementById("error-latitud"),document.getElementById("error-longitud")];
const Mapa = L.map("map",{center:[14.084657,-87.165792],zoom:7,minZoom:3,maxZoom:18,zoomControl:false,attributionControl:false});
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}).addTo(Mapa);	
new L.Control.MiniMap(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:15}),{toggleDisplay:true,minimized:false}).addTo(Mapa);
new L.Control.Zoom({position:'topleft'}).addTo(Mapa);
Mapa.setMaxBounds(L.latLngBounds(L.latLng(90,-180),L.latLng(-90,180)));
L.control.resetView({position:"topleft",title:"Reset view",latlng:L.latLng([14.084657,-87.165792]),zoom:7,}).addTo(Mapa);
L.control.scale().addTo(Mapa);
let error=[false,false],timer=null;
Object.defineProperty(HTMLInputElement.prototype,"value",{
	set:function(newValue){
		Descriptors[0].call(this,newValue);
		validation(this.id);
	},
	get:function(){
		return Descriptors[1].call(this);
	},
	configurable:true,
	enumerable:true
});
for(let i=0;i<Inputs.length;i++){
	Inputs[i]["value"] = "";
	Inputs[i].addEventListener("input",() => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			validation(Inputs[i]["id"]);
			if((error[0]===false)&&(error[1]===false)){LeafletSetLocation(Mapa,Inputs)};
		},500);
	});
}
LeafletLocationPicker(Mapa,Inputs);
function validation(x){
	let a = Inputs.findIndex(b => b.id===x);
	const Max=[90,180],Name=["latitud","longitud"];
	if(isNaN(Inputs[a]["value"])){
		Inputs[a]["className"] = "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer";
		ErrorInputs[a]["innerHTML"] = "Solamente números";
		error[a] = true;
		return;
	} else {
		error[a] = false;
	}
	if(Math.abs(Inputs[a]["value"])>Max[a]){
		Inputs[a]["className"] = "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer";
		ErrorInputs[a]["innerHTML"] = `La ${Name[a]} debe ser solo desde -${Max[a]}° hasta ${Max[a]}°`;
		error[a] = true;
		return;
	} else {
		error[a] = false;
	}
	Inputs[a]["className"] = "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
	ErrorInputs[a].innerHTML = "";
	if(Inputs[a]["value"].trim()===""){error[a]=true;return};
}