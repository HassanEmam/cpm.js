import { Link } from "./links";
import { iActivity } from "./activity";
export declare class CPM {
    activities: iActivity[];
    links: Link[];
    startDate: Date;
    constructor(startDate: Date, activities: iActivity[], links: Link[]);
    calculate(): void;
    calculateEarlyStart(): void;
    calculateEarlyFinish(): void;
    calculateLateStart(): void;
    calculateLateFinish(): void;
    calculateTotalFloat(): void;
    calculateStartAndEndDates(): void;
    getCriticalPath(): iActivity[];
}
//# sourceMappingURL=schedule.d.ts.map