import { linkTypes, Link } from "./links";
import { iActivity } from "./activity";
import { addDays } from "../utils/helpers";

export class CPM {
  activities: iActivity[];
  links: Link[];
  startDate: Date;
  duration: number;

  constructor(startDate: Date, activities: iActivity[], links: Link[]) {
    this.activities = activities;
    this.links = links;
    this.startDate = startDate;
    this.duration = 0;

    this.activities.forEach((activity) => {
      const predecessors = this.links.filter(
        (link) => link.successor_id === activity.id
      );
      const successors = this.links.filter(
        (link) => link.predecessor_id === activity.id
      );
      activity.predessors = predecessors;
      activity.successors = successors;
    });
  }

  calculate() {
    const pred = this.activities.filter((activity) => {
      return activity.predessors.length === 0;
    });
    pred.forEach((activity) => {
      activity.es = 0;
      activity.ef = activity.duration;
    });
    this.forwardPath(pred);
    const no_succ = this.activities.filter((activity) => {
      activity.lf = this.duration;
      activity.ls = activity.lf - activity.duration;
      return activity.successors.length === 0;
    });
    this.backwardPath(no_succ);
    this.calculateStartAndEndDates();
  }

  forwardPath(activity_lst: iActivity[]) {
    for (let actv of activity_lst) {
      const successors: iActivity[] = [];
      for (let succ of actv.successors) {
        const successor = this.activities.find(
          (activity) => activity.id === succ.successor_id
        );
        if (successor) {
          successors.push(successor);
          switch (succ.type) {
            case linkTypes.FS:
              if (successor.es && successor.es > actv.ef + succ.lag + 1) {
              } else {
                successor.es = actv.ef + succ.lag + 1;
                successor.ef = successor.es + successor.duration;
              }
              break;
            case linkTypes.SS:
              if (successor.es && successor.es > actv.es + succ.lag) {
              } else {
                successor.es = actv.es + succ.lag;
                successor.ef = successor.es + successor.duration;
              }
              break;
            case linkTypes.FF:
              if (successor.ef && successor.ef > actv.ef + succ.lag) {
              } else {
                successor.ef = actv.ef + succ.lag;
                successor.es = successor.ef - successor.duration;
              }
              break;
            case linkTypes.SF:
              if (successor.ef && successor.ef > actv.es + succ.lag) {
              } else {
                successor.ef = actv.es + succ.lag;
                successor.es = successor.ef - successor.duration;
              }
              break;
          }
          if (successor.ef > this.duration) {
            this.duration = successor.ef;
          }
        }
      }
      this.forwardPath(successors);
    }
  }

  backwardPath(activity_lst: iActivity[]) {
    for (const activity of activity_lst) {
      const predecessors: iActivity[] = [];
      for (const rel of activity.predessors) {
        const pred_activity = this.activities.find(
          (actv) => actv.id === rel.predecessor_id
        );
        if (pred_activity) {
          predecessors.push(pred_activity);
          // console.log("Calculations", rel.type, pred_activity, activity);

          switch (rel.type) {
            case linkTypes.FS:
              if (
                pred_activity.lf &&
                pred_activity.lf > activity.ls - rel.lag
              ) {
                pred_activity.lf = activity.ls - rel.lag - 1;
                pred_activity.ls = pred_activity.lf - pred_activity.duration;
              } else {
              }
              break;
            case linkTypes.SS:
              if (
                pred_activity.ls &&
                pred_activity.ls > activity.ls - rel.lag
              ) {
                pred_activity.ls = activity.ls - rel.lag;
                pred_activity.lf = pred_activity.ls + pred_activity.duration;
              }
              break;
            case linkTypes.FF:
              if (
                pred_activity.lf &&
                pred_activity.lf > activity.lf - rel.lag
              ) {
                pred_activity.lf = activity.lf - rel.lag;
                pred_activity.ls = pred_activity.lf - pred_activity.duration;
              } else {
              }
              break;
            case linkTypes.SF:
              if (
                pred_activity.ls &&
                pred_activity.ls > activity.lf - rel.lag
              ) {
                pred_activity.ls = activity.lf - rel.lag;
                pred_activity.lf = pred_activity.ls + pred_activity.duration;
              } else {
              }
              break;
          }
        }
        this.backwardPath(predecessors);
      }
    }
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

  calculateStartAndEndDates() {
    this.activities.forEach((activity) => {
      activity.tf = activity.lf - activity.ef;
      activity.start = addDays(this.startDate, activity.es);
      activity.end = addDays(this.startDate, activity.ef);
      activity.lateStart = addDays(this.startDate, activity.ls);
      activity.lateEnd = addDays(this.startDate, activity.lf);
    });
  }

  getCriticalPath() {
    return this.activities.filter((activity) => activity.tf === 0);
  }
}
