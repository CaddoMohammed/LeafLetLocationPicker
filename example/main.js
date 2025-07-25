const Input = {"latitud":document.getElementById("latitud"),"longitud":document.getElementById("longitud")};
const ErrorInput = {"latitud":document.getElementById("error-latitud"),"longitud":document.getElementById("error-longitud")};
const Mapa = L.map("map",{center:[14.084657,-87.165792],zoom:7,minZoom:3,maxZoom:18,zoomControl:false,attributionControl:false});
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}).addTo(Mapa);	
new L.Control.MiniMap(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:15}),{toggleDisplay:true,minimized:false}).addTo(Mapa);
new L.Control.Zoom({position:'topleft'}).addTo(Mapa);
Mapa.setMaxBounds(L.latLngBounds(L.latLng(90,-180),L.latLng(-90,180)));
L.control.resetView({position:"topleft",title:"Reset view",latlng:L.latLng([14.084657,-87.165792]),zoom:7,}).addTo(Mapa);
L.control.scale().addTo(Mapa);
let Ubicacion = 0;
let timeout = null;
Input["latitud"].addEventListener("input",function(){
	clearTimeout(timeout);
	timeout = setTimeout(() => {validation();},500);
});
Input["longitud"].addEventListener("input",function(){
	clearTimeout(timeout);
	timeout = setTimeout(() => {validation();},500);
});
window.addEventListener("load",() =>{Input["latitud"].value = ""; Input["longitud"].value = "";});
LocationPicker(Input["latitud"],Input["longitud"],Mapa);
LeafletLocationPickerConfig = {
	"width":12,
	"height":2.5,
	"color":"#000000"
}
function validation(){
	let error = {"latitud":false,"longitud":false};
	let Max = {"latitud":90,"longitud":180};
	for(let i in Input){
		if(isNaN(Input[i].value)){
			Input[i].className = "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer";
			ErrorInput[i].innerHTML = "Solamente números";
			error[i] = true;
		}
		if(Math.abs(Input[i].value)>Max[i]){
			Input[i].className = "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer";
			ErrorInput[i].innerHTML = `La ${i} debe ser solo desde -${Max[i]}° hasta ${Max[i]}°`;
			error[i] = true;
		}
	}
	for(let i in Input){
		if(error[i]===false){
			Input[i].className = "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
			ErrorInput[i].innerHTML = "";
		}
	}
	for(let i in Input){
		if(error[i]===true){
			return;
		}
		if(Input[i].value===""){
			return;
		}
	}
	Mapa.setView([Number(Input["latitud"].value),Number(Input["longitud"].value)],Mapa.getZoom());
	SetLocation(Input["latitud"].value,Input["longitud"].value,Mapa);
}