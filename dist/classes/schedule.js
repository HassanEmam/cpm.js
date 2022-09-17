import { addDays } from "../utils/helpers";
export class CPM {
    constructor(startDate, activities, links) {
        this.activities = activities;
        this.links = links;
        this.startDate = startDate;
    }
    calculate() {
        this.calculateEarlyStart();
        this.calculateEarlyFinish();
        this.calculateLateStart();
        this.calculateLateFinish();
        this.calculateTotalFloat();
        this.calculateStartAndEndDates();
    }
    calculateEarlyStart() {
        this.activities.forEach((activity) => {
            const preds = this.links.filter((link) => link.successor_id === activity.id);
            console.log(preds);
        });
        this.activities.forEach((activity) => {
            if (activity.id === 1) {
                activity.es = 0;
            }
            else {
                const predecessors = this.links.filter((link) => link.successor_id === activity.id);
                const max = Math.max(...predecessors.map((link) => {
                    const predecessor = this.activities.find((activity) => activity.id === link.predecessor_id);
                    return predecessor.ef;
                }));
                activity.es = max;
            }
        });
    }
    calculateEarlyFinish() {
        this.activities.forEach((activity) => {
            activity.ef = activity.es + activity.duration;
        });
    }
    calculateLateStart() {
        this.activities.forEach((activity) => {
            if (activity.id === this.activities.length) {
                activity.ls = activity.ef;
            }
            else {
                const successors = this.links.filter((link) => link.predecessor_id === activity.id);
                const min = Math.min(...successors.map((link) => {
                    const successor = this.activities.find((activity) => activity.id === link.successor_id);
                    return successor.ls;
                }));
                activity.ls = min - activity.duration;
            }
        });
    }
    calculateLateFinish() {
        this.activities.forEach((activity) => {
            activity.lf = activity.ls + activity.duration;
        });
    }
    calculateTotalFloat() {
        this.activities.forEach((activity) => {
            activity.tf = activity.lf - activity.ef;
        });
    }
    calculateStartAndEndDates() {
        this.activities.forEach((activity) => {
            activity.start = addDays(this.startDate, activity.es + 1);
            activity.end = addDays(this.startDate, activity.ef + 1);
        });
    }
    getCriticalPath() {
        return this.activities.filter((activity) => activity.tf === 0);
    }
}
//# sourceMappingURL=schedule.js.map