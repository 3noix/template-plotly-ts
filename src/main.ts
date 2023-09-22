import data from "data";
import "./styles.scss";
import ScatterPlot from "./ScatterPlot";


function main(): void {
	const eltPlot = document.querySelector<HTMLDivElement>("#plot");
	if (eltPlot == null) {return;}

	const plot = new ScatterPlot(eltPlot);
	plot.update(data.forPlot, "#ff0000");
}

main();

