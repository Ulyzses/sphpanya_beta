// A (lat, lon) point on the sphere
export class Point {
  lat: number;
  lon: number;

  constructor(lat: number, lon: number) {
    if (lat < -90 || lat > 90) {
      throw new Error(`Latitude must be within [-90, 90] (given ${lat})`);
    }

    if (lat < -180 || lat > 180) {
      throw new Error(`Longitude must be within [-180, 180] (given ${lon})`)
    }

    this.lat = lat;
    this.lon = lon;
  }
}