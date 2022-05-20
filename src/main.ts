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
			div.textContent = "a";
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

	let i = 1;
	const observer = new ResizeObserver(entries => {
		eltPlot1.textContent = `${eltPlot1.offsetWidth}x${eltPlot1.offsetHeight}`;
		eltPlot2.textContent = `${eltPlot2.offsetWidth}x${eltPlot2.offsetHeight}`;
		eltPlot3.textContent = `${eltPlot3.offsetWidth}x${eltPlot3.offsetHeight}`;
		console.log(`Resize #${i}`);
		i++;
	});

	observer.observe(eltPlot1);
	observer.observe(eltPlot2);
	observer.observe(eltPlot3);
}

main();

