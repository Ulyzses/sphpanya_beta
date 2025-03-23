// A point on the polygon mesh.
import { Point } from "./point.ts";

export class Vertex extends Point {
  isCorner: boolean = false;
  isAmbiguous: boolean = false;
  polygons: number[] = [];

  constructor(lat: number, lon: number, polygons: number[]) {
    super(lat, lon);
    this.polygons = polygons;
  }
}