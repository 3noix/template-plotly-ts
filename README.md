# Concept

This repository is a template for a project whose aim is to generate a standalone files (html, css, js) which displays plots just like in a dashboard. The data is fully contained in one of the js files and can be generated from R. This template uses plotly.js to do the plots.

# Getting started

For this to work, you need to have node.js. If you don't already have it, you can get it [here](https://nodejs.org/en/download/). Using the archive (instead of the installer) does not require administrator rights, but you will have to put the path to the node executable in the PATH environment variable.

Download this template, and unzip it if it is zipped. Open a terminal and go to the root directory of the project and type `npm install` or `npm i`. It will download all the needed dependencies (they are specified in the package.json file).

# Generate data.js from R

In the example, data.js only contains 2 vectors, "x" and "y". In a real project you would have more data, with a nested structure.

You can easily create `data.js` directly with R code:
```R
library(rjson)
library(stringr)

data = list("x"=0:10, "y"=0:10)
str = str_replace_all(toJSON(data), "\"NA\"", "null")
str = str_c("const allData = ",str,";\n")
write(str, file="data.js")
```

# Using the npm scripts and Live Server extension

When you will be modifying the project, you will certainly want to see the results quickly. You can do that by running the command `npm start` in the terminal. This way whenever you modify a .ts file or the .scss file in the `src` folder, the corresponding .js and .css files will be generated automatically generated in the `public` folder.

But if you don't want to press F5 in your web browser each time after that, you can use the extension "Live Server": it will refresh the page each time one of the source file changed. Install the extension then right click on `index.html` and choose `Open with Live Server`.

Once done, press Cltr+C in the terminal and stop Live Server by clicking on the corresponding item in the status bar.

If you just want to generate the output files without "watching for the files to change", you can simply run the command `npm run build`.

# Modify the template

Here are the first steps to adapt the template to your needs:
- generate the new data.js file from R and put it in the `public` folder
- update `types.ts` so that it matches the structure of your data. For example:
```typescript
export type AllData = {
	byYearHisto: {
		year: number[];
		nbFlights: number[];
	},
	scatterAltMach: {
		maxAlt: number[];
		maxMach: number[];
	}
};
```
- update `dataBidon.ts`: it must has the same structure as `data.js` but the smaller it is the better. You can for example use empty arrays. The values will not be used, only `data.js` will be used. For example:
```typescript
import type {AllData} from "./types";

export const allData: AllData = {
	byYearHisto: {
		year: [];
		nbFlights: [];
	},
	scatterAltMach: {
		maxAlt: [];
		maxMach: [];
	}
};
```
- update `index.html`, `main.ts` and `styles.scss` to do exactly what you want for the plots. In `style.scss` you can write just standard CSS or use SASS features.

# Miscellaneous

If you import other files into `main.ts`, you should see an undesired "require" line on the generated `main.js`. To remove it you will have to edit the function "modifyMain" in `scripts/functions.js`.
