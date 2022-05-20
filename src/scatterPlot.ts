import * as Plotly from "plotly.js-dist-min";
import type {xyData} from "./types";


export default function scatterPlot(htmlElt: HTMLElement | null) {
	// we will update x and y of plotData in the "react" function
	let plotData: Partial<Plotly.PlotData> = {
		type: "scatter",
		mode: "lines+markers",
		hoverinfo: "text"
	};

	// as const because here the layout does not depends on the x and y values
	const config: Partial<Plotly.Config> = {responsive: true};

	const layout: Partial<Plotly.Layout> = {
		title: "Just a dumb title",
		xaxis: {title: "X axis title"},
		yaxis: {title: "Y axis title"},
		margin: {t: 50, b: 60, l: 70, r: 40} // 100,80,80,80 by default
	};

	// to create or update the plot
	const react = (data: xyData, color: string): boolean => {
		if (htmlElt == null) {return false;}

		plotData = {...plotData,
			x: data.x,
			y: data.y,
			marker: {color: color}
		};

		Plotly.react(htmlElt, [plotData], layout, config);
		return true;
	};

	// to force resizing the plot (only useful if you use Golden Layout)
	const relayout = () => {
		if (htmlElt == null) {return false;}
		Plotly.relayout(htmlElt, layout);
		return true;
	};

	return {react, relayout};
}
