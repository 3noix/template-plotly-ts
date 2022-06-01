import L from "leaflet";


export default function leafletMap(htmlElt: HTMLElement) {
	const map = L.map(htmlElt).setView([43.5,1.4], 7);
	const tile_openStreetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	// to create or update the plot
	const update = () => {
		if (htmlElt == null) {return;}
		// update the data of the map here
	};

	const resize = () => {
		if (htmlElt == null) {return false;}
		map.invalidateSize(); // BUG: not working!
	};

	return {update};
}

