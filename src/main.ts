import data from "data";
import "./styles.scss";
import scatterPlot from "./scatterPlot";


function main(): void {
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
	plot1.react(data.forPlot1, "#ff0000");
	plot2.react(data.forPlot2, "#00ff00");
	plot3.react(data.forPlot3, "#0000ff");


	// @2: ACTIVATE RESIZING
	// // only useful if you use Golden Layout
	// const observer = new ResizeObserver(entries => {
	// 	plot1.relayout();
	// 	plot2.relayout();
	// 	plot3.relayout();
	// });

	// observer.observe(eltPlot1);
	// observer.observe(eltPlot2);
	// observer.observe(eltPlot3);
}

main();

