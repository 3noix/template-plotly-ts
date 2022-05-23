import data from "data";
import "./styles.scss";
import * as gl from "./layout";
import scatterPlot from "./scatterPlot";


function main(): void {
	// @2: GOLDEN LAYOUT
	const eltPlots = document.querySelector<HTMLDivElement>("#plots-grid");
	if (eltPlots == null) {return;}

	const rootItem = gl.appendRow();
	gl.appendComponent(rootItem, "Heatmap and spikes", "plot1", {width: 1});
	const col = gl.appendColumn(rootItem, {width: 2});
	gl.appendComponent(col, "Scatter", "plot2", {height: 2});
	gl.appendComponent(col, "Histo", "plot3", {height: 3});
	gl.createLayout(eltPlots, rootItem);


	// @2: GET ELEMENTS PART
	const eltPlot1 = document.querySelector<HTMLDivElement>("#plot1");
	const eltPlot2 = document.querySelector<HTMLDivElement>("#plot2");
	const eltPlot3 = document.querySelector<HTMLDivElement>("#plot3");
	if (eltPlot1 == null) {return;}
	if (eltPlot2 == null) {return;}
	if (eltPlot3 == null) {return;}


	// @2: DO PLOTS
	const plot1 = scatterPlot(eltPlot1);
	const plot2 = scatterPlot(eltPlot2);
	const plot3 = scatterPlot(eltPlot3);
	plot1.update(data.forPlot1, "#ff0000");
	plot2.update(data.forPlot2, "#00ff00");
	plot3.update(data.forPlot3, "#0000ff");


	// @2: ACTIVATE RESIZING
	gl.ensureResponsive([eltPlot1, eltPlot2, eltPlot3], [plot1, plot2, plot3]);
}

main();

