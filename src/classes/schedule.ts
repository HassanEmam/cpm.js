import { linkTypes, Link } from "./links";
import { iActivity } from "./activity";
import { addDays } from "../utils/helpers";

export class CPM {
  activities: iActivity[];
  links: Link[];
  startDate: Date;

  constructor(startDate: Date, activities: iActivity[], links: Link[]) {
    this.activities = activities;
    this.links = links;
    this.startDate = startDate;
  }

  calculate() {
    this.calculateEarlyStart();
    // this.calculateEarlyFinish();
    this.calculateLateStart();
    this.calculateLateFinish();
    this.calculateTotalFloat();
    this.calculateStartAndEndDates();
    console.log(this.activities);
  }

  calculateEarlyStart() {
    this.activities.forEach((activity) => {
      const predecessors = this.links.filter(
        (link) => link.successor_id === activity.id
      );
      console.log(activity, predecessors);
      if (predecessors.length === 0) {
        activity.es = 0;
        activity.ef = activity.es + activity.duration;
      } else {
        const max = Math.max(
          ...predecessors.map((link) => {
            const predecessor = this.activities.find(
              (activity) => activity.id === link.predecessor_id
            );
            console.log("predecessor", predecessor);
            switch (link.type) {
              case linkTypes.FS:
                return predecessor.ef + link.lag + 1;
              case linkTypes.FF:
                return predecessor.ef + link.lag - activity.duration;
              case linkTypes.SS:
                return predecessor.es + link.lag;
              case linkTypes.SF:
                return predecessor.ls + link.lag - activity.duration;
            }
            // return predecessor.ef;
          })
        );
        console.log("max", max);
        activity.es = max;
        activity.ef = activity.es + activity.duration;
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
      } else {
        const successors = this.links.filter(
          (link) => link.predecessor_id === activity.id
        );
        const min = Math.min(
          ...successors.map((link) => {
            const successor = this.activities.find(
              (activity) => activity.id === link.successor_id
            );
            return successor.ls;
          })
        );
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
      activity.start = addDays(this.startDate, activity.es);
      activity.end = addDays(this.startDate, activity.ef);
    });
  }

  getCriticalPath() {
    return this.activities.filter((activity) => activity.tf === 0);
  }
}
