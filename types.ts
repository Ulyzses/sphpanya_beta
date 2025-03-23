import { Point } from "./point.ts"

export interface Scenario {
  map: string;
  start: Point;
  end: Point;
  optimalPath: number;
}
