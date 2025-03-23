import { Point } from "./point.ts";

export class Polygon {
  vertices: Point[] = [];
  neighbours: Polygon[] = [];

  isOneWay: boolean = false;
}