## CPM.js

CPM.js is a JavaScript library for performing critical path method calculation. It is developed in Typescript to be able to run in both Node.js and browser.

## Installation

`npm install @consology/cpm.js`

## Usage

```javascript
import { CPM, linkTypes } from "@consology/cpm.js";

const activities = [
  { id: 1, name: "A", duration: 5 },
  { id: 2, name: "B", duration: 5 },
  { id: 3, name: "C", duration: 5 },
  { id: 4, name: "D", duration: 5 },
  { id: 5, name: "E", duration: 5 },
];

const links = [
  { predecessor_id: 1, successor_id: 2, type: linkTypes.SS, lag: 0 },
  { predecessor_id: 2, successor_id: 3, type: linkTypes.FS, lag: 5 },
  { predecessor_id: 3, successor_id: 4, type: linkTypes.FS, lag: 0 },
  { predecessor_id: 4, successor_id: 5, type: linkTypes.FS, lag: 0 },
  { predecessor_id: 1, successor_id: 3, type: linkTypes.FS, lag: 0 },
];

const cpm = new CPM(activities, links);
cpm.calculate();
console.log(cpm.criticalPath);
```
