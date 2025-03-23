# Scenario Files

Scenario files are relevant in running benchmark tests. They contain information
such as the map to be used, map size, start and goal coordinates, and the
theoretical optimal length. For uniformity, this repository will also be using
the same format as in this
[page](https://www.movingai.com/benchmarks/formats.html) despite not needing all
the fields.

## Format

The first line begins with the text `version x.x`. This document describes the
version 1.0. The trailing `0` is optional.

The following lines are scenarios; each line has 9 fields, delimited by a
horizontal tab (`0x09`). Only relevant fields will be described for this
document.

- **Bucket:** Unused
- **Map:** Path of the map to be used
- **Map Width:** Static 360 (due to the fact that all maps have longitude values
  of [-180, 180])
- **Map Height:** Static 180 (due to the fact that all maps have latitude values
  of [-90, 90])
- **Start X-Coordinate:** Will be treated as the start latitude
- **Start Y-Coordinate:** Will be treated as the start longitude
- **Goal X-Coordinate:** Will be treated as the goal latitude
- **Goal X-Coordinate:** Will be treated as the goal longitude
- **Optimal Length:** Optimal length of the path in spherical coordinates
