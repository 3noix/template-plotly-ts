import * as Plotly from "plotly.js-dist-min";
import type {xyData} from "./types";


export default class ScatterPlot {
	private htmlElt: HTMLElement;
	private plotData: Partial<Plotly.PlotData>;
	private config: Partial<Plotly.Config>;
	private layout: Partial<Plotly.Layout>;

	// @2: constructor
	constructor(htmlElt: HTMLElement) {
		this.htmlElt = htmlElt;

		// we will update x and y of plotData in the "update" method
		this.plotData = {
			type: "scatter",
			mode: "lines+markers",
			hoverinfo: "text"
		};

		// config and layout will be constant
		this.config = {responsive: true};
		this.layout = {
			title: "Just a dumb title",
			xaxis: {title: "X axis title"},
			yaxis: {title: "Y axis title"},
			margin: {t: 50, b: 60, l: 70, r: 40} // 100,80,80,80 by default
		};
	}

	// @2: to create or update the plot
	public update(data: xyData, color: string): void {
		this.plotData.x = data.x;
		this.plotData.y = data.y;
		this.plotData.marker = {color: color};

		Plotly.react(this.htmlElt, [this.plotData], this.layout, this.config);
	}

	// @2: to force resizing the plot (only useful if you use Golden Layout)
	public resize(): void {
		Plotly.relayout(this.htmlElt, this.layout);
	}
}

