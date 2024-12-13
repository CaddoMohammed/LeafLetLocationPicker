const A = [
	document.getElementById("lqwasjzkzx"),				// 0 aside
	document.getElementById("ppoqwjkoasdfhjzkmjbag"),	// 1 Contenedor de latitud y longitud
	document.getElementById("iowapzyaha"),				// 2 section
	document.getElementById("tretdsfgcxsdsx")			// 3 Contenedor mapa
];
const B = [
	[document.getElementById("qwjlaksdjklpoas"),document.getElementById("dwdyusdckjhsudy")],
	[document.getElementById("tythfgsdfxsasdf"),document.getElementById("rijwduhasdjhaja")]
];
let U = 0;
let V;
let timeout = null;
B[0][0].addEventListener("input",function(){
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		a2();
	},400);
});
B[1][0].addEventListener("input",function(){
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		a2();
	},400);
});
window.addEventListener("load",() =>{
	B[0][0].value = "";
	B[1][0].value = "";
	w1();
	a1();
});
window.addEventListener('resize',() => {
	w1();
});
function w1(){
	let a = window.innerHeight;
	let b = window.innerWidth;
	if((a<420)&&(b>=1.5*420)){
		A[0].className = "d-flex flex-column justify-content-start align-items-stretch";
		A[2].className = "d-flex flex-column justify-content-start";
		A[0].style.height = "100dvh";
		A[2].style.minHeight = "100dvh";
		A[0].style.width = "50vw";
		A[2].style.width = "50vw";
		A[0].style.removeProperty("min-height");
		A[2].style.removeProperty("flex-grow");
		A[2].style.removeProperty("min-width");
		A[0].style.overflow = "auto";
	}
	else{
		if(window.innerWidth<(420+20+0.58*b)){
			A[0].className = "d-flex flex-column justify-content-start align-items-stretch flex-grow-1";
			A[2].className = "d-flex flex-column justify-content-start flex-grow-1";
			A[0].style.minHeight = "50dvh";
			A[2].style.minHeight = "50dvh";
			A[0].style.width = "100%";
			A[2].style.width = "100%";
			A[0].style.removeProperty("overflow");
			A[0].style.removeProperty("height");
		}
		else{
			A[0].className = "d-flex flex-column justify-content-start align-items-stretch";
			A[2].className = "d-flex flex-column justify-content-start";
			A[0].style.height = "100dvh";
			A[2].style.minHeight = "100dvh";
			A[0].style.width = "420px";
			if(0.35*b<420){
				A[0].style.width = "35vw";
			}
			A[2].style.minWidth = "50vw";
			A[0].style.overflow = "auto";
			A[2].style.flexGrow = 10;
			A[2].style.removeProperty("width");
		}
	}
}
function a1(){
	B[0][0].disabled = false;
	B[1][0].disabled = false;
	B[0][0].value = "";
	B[1][0].value = "";
	V = L.map("tretdsfgcxsdsx", {
		center:[14.084657,-87.165792],
		zoom:7,
		minZoom:3,
		maxZoom:18,
		zoomControl:false,
		attributionControl:false
	});
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(V);	
	new L.Control.MiniMap(L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
		maxZoom: 15,
	}),{
		toggleDisplay:true,
		minimized:false,
	}).addTo(V);
	new L.Control.Zoom({position:'topleft'}).addTo(V);
	V.setMaxBounds(L.latLngBounds(L.latLng(90,-180),L.latLng(-90,180)));
	L.control.resetView({
		position: "topleft",
		title:"Reset view",
		latlng:L.latLng([14.084657,-87.165792]),
		zoom:6,
	}).addTo(V);
	L.control.scale().addTo(V);
	LocationPicker(B[0][0],B[1][0],V);
	A[3].style.cursor = "crosshair";
	if((U!==0)&&U[0][0]&&U[0][1]){
		V.setView([U[0][0],U[0][1]],7);
		SetLocation(U[0][0],U[0][1],V);
		B[0][0].value = U[0][0]
		B[1][0].value = U[0][1]
	}
}
function a2(){
	if(isNaN(B[0][0].value)||isNaN(B[1][0].value)){
		if(isNaN(B[0][0].value)){
			B[0][0].classList.add("is-invalid");
			B[0][1].innerHTML = "Solamente números";
		}
		if(isNaN(B[1][0].value)){
			B[1][0].classList.add("is-invalid");
			B[1][1].innerHTML = "Solamente números";
		}
		return;
	}
	if((B[0][0].value>90)||(B[0][0].value<-90)){
		B[0][0].classList.add("is-invalid");
		B[0][1].innerHTML = "La latitud solo desde -90° hasta 90°";
		return;
	}
	if((B[1][0].value>180)||(B[1][0].value<-180)){
		B[1][0].classList.add("is-invalid");
		B[1][1].innerHTML = "La longitud solo desde -180° hasta 180°";
		return;
	}
	B[0][0].classList.remove("is-invalid");
	B[0][1].innerHTML = "";
	B[1][0].classList.remove("is-invalid");
	B[1][1].innerHTML = "";
	if((B[0][0].value!=="")&&(B[1][0].value!=="")){
		V.setView([Number(B[0][0].value),Number(B[1][0].value)],7);
		SetLocation(B[0][0].value,B[1][0].value,V);
	}
}