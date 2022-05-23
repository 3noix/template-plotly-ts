import {ComponentContainer, GoldenLayout, JsonValue} from "golden-layout";
import type {LayoutConfig, RootItemConfig, ItemConfig, RowOrColumnItemConfig, StackItemConfig, ComponentItemConfig} from "golden-layout";


// @1: CREATE LAYOUT
export function createLayout(rootElt: HTMLElement, rootItem: RootItemConfig): void {
	const goldenLayoutConfig: LayoutConfig = {
		root: rootItem,
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
	
	const goldenLayout = new GoldenLayout(rootElt);
	goldenLayout.registerComponentFactoryFunction("plot",
		(container: ComponentContainer, state?: JsonValue): void => {
			container.layoutManager.resizeWithContainerAutomatically = true;
			const div = document.createElement("div");
			if (typeof state === "string") {div.id = state;}
			container.element.appendChild(div);
	});
	
	goldenLayout.loadLayout(goldenLayoutConfig);
}

type SizeRatio = {
	width?: number;
	height?: number;
};

export function appendRow(addTo?: ItemConfig, sizeRatio?: SizeRatio): RowOrColumnItemConfig {
	const newItem: RowOrColumnItemConfig = {
		type: "row",
		content: [],
		width: sizeRatio?.width,
		height: sizeRatio?.height
	};

	if (addTo == null) {return newItem;}
	if (addTo.content == null) {addTo.content = [];}
	addTo.content.push(newItem);
	return newItem;
}

export function appendColumn(addTo?: ItemConfig, sizeRatio?: SizeRatio): RowOrColumnItemConfig {
	const newItem: RowOrColumnItemConfig = {
		type: "column",
		content: [],
		width: sizeRatio?.width,
		height: sizeRatio?.height
	};

	if (addTo == null) {return newItem;}
	if (addTo.content == null) {addTo.content = [];}
	addTo.content.push(newItem);
	return newItem;
}

export function appendStack(addTo?: ItemConfig, sizeRatio?: SizeRatio): StackItemConfig {
	const newItem: StackItemConfig = {
		type: "stack",
		content: [],
		width: sizeRatio?.width,
		height: sizeRatio?.height
	};

	if (addTo == null) {return newItem;}
	if (addTo.content == null) {addTo.content = [];}
	addTo.content.push(newItem);
	return newItem;
}

export function appendComponent(addTo: ItemConfig, title: string, id: string, sizeRatio?: SizeRatio): ComponentItemConfig {
	const newItem: ComponentItemConfig = {
		type: "component",
		title: title,
		componentType: "plot",
		componentState: id,
		width: sizeRatio?.width,
		height: sizeRatio?.height
	};

	if (addTo == null) {return newItem;}
	if (addTo.content == null) {addTo.content = [];}
	addTo.content.push(newItem);
	return newItem;
}


// @1: ENSURE RESPONSIVE
interface Plot {
	resize: () => boolean;
}

export function ensureResponsive(eltsToWatch: HTMLElement[], plots: Plot[]): void {
	const observer = new ResizeObserver(entries => {
		plots.forEach(p => p.resize());
	});

	eltsToWatch.forEach(e => observer.observe(e));

	// Without emitting this event, the Plotly plots would not resize, unless the
	// browser window is manually resized. The issue occurs only with Plotly + GoldenLayout
	window.dispatchEvent(new Event("resize"));
}

