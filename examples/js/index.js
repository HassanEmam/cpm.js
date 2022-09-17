import { CPM } from "../../dist";
import { linkTypes } from "../../dist";
import { GanttChart } from "4d-gantt-chart";

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

const cpm = new CPM(new Date(2022, 1, 1), activities, links);

cpm.calculate();

console.log(cpm.activities);

const ganttSchedule = [];
for (let act of cpm.activities) {
  const obj = {
    id: act.id,
    name: act.name,
    start: act.start,
    end: act.end,
    parent: null,
  };
  ganttSchedule.push(obj);
}

console.log("ganttSchedule", ganttSchedule);
const container = document.getElementById("root");
let options = {
  container: container,
  dataDate: new Date(2022, 1, 1),
  gridScale: 5,
  gridColor: "black",
  data: ganttSchedule,
  titleOptions: "Music",
  rowHeight: 30,
  timeLineColumnWidth: 20,
  timeLineBackgroundColor: "rgb(245, 245, 245)",
  timeLineHeight: 120,
  tableWidth: 400,
  table: {
    width: 400,
  },
  barColor: "lightgreen",
  barColorHover: "red",
  colors: ["#a55ca5", "#67b6c7", "#bccd7a", "#eb9743"],
};

const gantt = new GanttChart(options);
gantt.draw();
