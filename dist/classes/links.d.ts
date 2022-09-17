export declare enum linkTypes {
    "FS" = 0,
    "FF" = 1,
    "SS" = 2,
    "SF" = 3
}
export interface Link {
    predecessor_id: number;
    successor_id: number;
    type: linkTypes;
    lag: number;
}
//# sourceMappingURL=links.d.ts.map