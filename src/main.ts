import * as Plotly from "plotly.js-dist-min";
import {allData} from "./dataBidon";


function main(): void {
	const eltPlot = document.querySelector<HTMLDivElement>("#plotlyPlot");
	if (eltPlot == null) {return;}

	const data = {
		type: "scatter",
		x: allData.x,
		y: allData.y,
		mode: "lines+markers",
		hoverinfo: "text",
		marker: {color: "#00ff00"}
	} as Plotly.PlotData;
	
	const layout = {
		title: "Just a dumb title",
		xaxis: {title: "X axis title"},
		yaxis: {title: "Y axis title"},
		margin: {t: 50, b: 60, l: 70, r: 40} // 100,80,80,80 by default
	} as Plotly.Layout;
	
	const config = {responsive: true} as Plotly.Config;
	Plotly.react(eltPlot, [data], layout, config);
}

main();

