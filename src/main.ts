import * as Plotly from "plotly.js-dist-min";
import {allData} from "./dataBidon";


function main(): void {
	const eltPlot1 = document.querySelector<HTMLDivElement>("#plot1");
	const eltPlot2 = document.querySelector<HTMLDivElement>("#plot2");
	const eltPlot3 = document.querySelector<HTMLDivElement>("#plot3");
	if (eltPlot1 == null) {return;}
	if (eltPlot2 == null) {return;}
	if (eltPlot3 == null) {return;}

	const data1: Partial<Plotly.PlotData> = {
		type: "scatter",
		x: allData.forPlot1.x,
		y: allData.forPlot1.y,
		mode: "lines+markers",
		hoverinfo: "text",
		marker: {color: "#ff0000"}
	};

	const data2: Partial<Plotly.PlotData> = {
		type: "scatter",
		x: allData.forPlot2.x,
		y: allData.forPlot2.y,
		mode: "lines+markers",
		hoverinfo: "text",
		marker: {color: "#00ff00"}
	};

	const data3: Partial<Plotly.PlotData> = {
		type: "scatter",
		x: allData.forPlot3.x,
		y: allData.forPlot3.y,
		mode: "lines+markers",
		hoverinfo: "text",
		marker: {color: "#0000ff"}
	};
	
	const layout: Partial<Plotly.Layout> = {
		title: "Just a dumb title",
		xaxis: {title: "X axis title"},
		yaxis: {title: "Y axis title"},
		margin: {t: 50, b: 60, l: 70, r: 40} // 100,80,80,80 by default
	};
	
	const config: Partial<Plotly.Config> = {responsive: true};

	Plotly.react(eltPlot1, [data1], layout, config);
	Plotly.react(eltPlot2, [data2], layout, config);
	Plotly.react(eltPlot3, [data3], layout, config);
}

main();

