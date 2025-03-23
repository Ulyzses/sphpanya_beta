import { assert } from "@std/assert/assert";
import { Polygon } from "./polygon.ts";
import { readlines } from "./utils/io.ts";
import { Vertex } from "./vertex.ts";

export class Mesh {
  vertices: Vertex[] = [];
  polygons: Polygon[] = [];
  maxSides: number = 0;

  constructor() {
    
  }

  async read(file: string) {
    const mapReader = readlines(file);
    
    const firstLine = (await mapReader.next()).value;
    
    assert(firstLine.toLowerCase() === "sph", `Invalid map header: ${firstLine} (expecting 'sph')`)
  
    const secondLine = (await mapReader.next()).value;
    console.log(secondLine.split(" "));
    console.log(secondLine.split(" ").map(Number));
    const [V, P] = secondLine.split(" ").map(Number);

    assert(V >= 1, `Invalid number of vertices: ${V}`);
    assert(P >= 1, `Invalid number of polygons: ${P}`);

    // Read vertices
    for (let i = 0; i < V; ++i) {
      const line = (await mapReader.next()).value;
      const [lat, lon, n, ...rest] = line.split(" ").map(parseFloat);

      const vertex = new Vertex(lat, lon, rest);

      for (let j = 0; j < n; ++j) {
        const polygonIndex = rest[j];

        assert (polygonIndex < P, `Invalid polygon index: ${polygonIndex}`);

        if (polygonIndex === -1) {
          if (vertex.isCorner) {
            vertex.isAmbiguous = true;
          } else {
            vertex.isCorner = true;
          }
        }
      }

      this.vertices.push(vertex);
    }

    // Read polygons
    for (let i = 0; i < P; ++i) {
      const line = (await mapReader.next()).value;
      const [n, ...rest] = line.split(" ").map(Number);

      assert(n >= 3, `Invalid number of sides: ${n}`);

      if (n > this.maxSides) {
        this.maxSides = n;
      }

      const polygon = new Polygon();

      // Reading the vertices for each polygon
      for (let j = 0; j < n; ++j) {
        const vertexIndex = rest[j];

        assert(vertexIndex < V, `Invalid vertex index: ${vertexIndex}`);

        polygon.vertices.push(vertexIndex);

        // TODO: There is a bounding box setup here that I skipped bc Idk yet what it's used for
      }

      // TODO: Same here, there is a mesh min/max function that I skipped

      // Reading the polygon neighbours
      let foundTrav = false;
      polygon.isOneWay = true;

      for (let j = 0; j < n; ++j) {
        const polygonIndex = rest[n + j];

        assert(polygonIndex < P, `Invalid polygon index: ${polygonIndex}`);

        if (polygonIndex !== -1) {
          if (foundTrav) {
            if (polygonIndex.isOneWay) {
              polygon.isOneWay = false;
            }
          } else {
            foundTrav = true;
          }
        }

        polygon.neighbours.push(polygonIndex);
      }

      this.polygons.push(polygon);
    }
  }
}