import { assert } from "@std/assert/assert";
import { readlines } from "./utils/io.ts";
import { Point } from "./point.ts";
import { Scenario } from "./types.ts";
import { Mesh } from "./mesh.ts";

const [scenario, map] = Deno.args;

async function* readScenario(scenario: string): AsyncGenerator<Scenario> {
  const scenarioReader = readlines(scenario);

  const firstLine = (await scenarioReader.next()).value;
  if (!firstLine.toLowerCase().startsWith("version 1")) {
    throw new Error(`Invalid scenario version: ${firstLine}`);
  }

  for await (const line of scenarioReader) {
    const scen = line.split("	");
    assert(scen.length === 9, `Invalid scenario format: ${line}`);

    // const bucket: number = parseInt(scen[0]); // unused
    const map: string = scen[1];
    // const height: number = parseFloat(scen[2]); // unused
    // const width: number = parseFloat(scen[3]);  // unused
    const startLat: number = parseFloat(scen[4]);
    const startLon: number = parseFloat(scen[5]);
    const endLat: number = parseFloat(scen[6]);
    const endLon: number = parseFloat(scen[7]);
    const optimalPath: number = parseFloat(scen[8]);

    yield {
      map: map,
      start: new Point(startLat, startLon),
      end: new Point(endLat, endLon),
      optimalPath: optimalPath,
    };
  }
}

for await (const scen of readScenario(scenario)) {
  console.log(scen);
}

const mesh = new Mesh();
await mesh.read(map);
console.log(mesh);

// await readMesh(map);