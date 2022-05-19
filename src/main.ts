import data from "data";
import "./styles.scss";
import scatterPlot from "./scatterPlot";
import {ComponentContainer, GoldenLayout, JsonValue} from "golden-layout";
import type {LayoutConfig} from "golden-layout";


function main(): void {
	// @2: GET ELEMENTS PART 1
	const eltPlots = document.querySelector<HTMLDivElement>("#plots-grid");
	if (eltPlots == null) {return;}

	// @2: GOLDEN LAYOUT
	const goldenLayoutConfig: LayoutConfig = {
		root: {
			type: "row",
			content: [{
				type: "component",
				title: "Heatmap and spikes",
				componentType: "plot",
				componentState: "plot1",
				// isClosable: false
			}, {
				type: "column",
				content: [{
					type: "component",
					title: "Scatter",
					componentType: "plot",
					componentState: "plot2",
					// isClosable: false
				}, {
					type: "component",
					title: "Histo",
					componentType: "plot",
					componentState: "plot3",
					// isClosable: false
				}]
			}]
		},
		settings: {
			responsiveMode: "always"
		},
		header: {
			show: "top",
			// close: false,
			maximise: false,
			popout: false
		}
	};
	
	const goldenLayout = new GoldenLayout(eltPlots);
	goldenLayout.registerComponentFactoryFunction("plot",
		(container: ComponentContainer, state?: JsonValue): void => {
			container.layoutManager.resizeWithContainerAutomatically = true;
			const div = document.createElement("div");
			div.id = state as string;
			container.element.appendChild(div);
	});

	goldenLayout.loadLayout(goldenLayoutConfig);


	// @2: GET ELEMENTS PART 2
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
	// only useful if you use Golden Layout
	const observer = new ResizeObserver(entries => {
		plot1.relayout();
		plot2.relayout();
		plot3.relayout();
	});

	observer.observe(eltPlot1);
	observer.observe(eltPlot2);
	observer.observe(eltPlot3);
}

main();

