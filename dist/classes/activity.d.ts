export interface iActivity {
    id: number;
    name: string;
    duration: number;
    es?: number;
    ef?: number;
    ls?: number;
    lf?: number;
    tf?: number;
    start?: Date;
    end?: Date;
}
export declare class Activity {
    name: string;
    id: number;
    description: string;
    es: number;
    ef: number;
    ls: number;
    lf: number;
    tf: number;
    start: Date;
    end: Date;
    constructor(id: number, name: string, description: string);
}
//# sourceMappingURL=activity.d.ts.map