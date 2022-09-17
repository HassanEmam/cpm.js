export enum linkTypes {
  "FS",
  "FF",
  "SS",
  "SF",
}

export interface Link {
  predecessor_id: number;
  successor_id: number;
  type: linkTypes;
  lag: number;
}
