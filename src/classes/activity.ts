import { Link } from "./links";

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
  lateStart?: Date;
  lateEnd?: Date;
  predessors?: Link[] | null;
  successors?: Link[] | null;
}

export class Activity {
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

  constructor(id: number, name: string, description: string) {
    this.name = name;
    this.id = id;
    this.description = description;
  }
}
