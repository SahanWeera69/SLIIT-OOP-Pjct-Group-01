/**
 * Represents a geographical location with latitude and longitude coordinates.
 */
export interface Location {
  /**
   * The latitude of the location.
   */
  lat: number;
  /**
   * The longitude of the location.
   */
  lng: number;
}

/**
 * Represents a route between two locations.
 */
export interface Route {
  /**
   * The distance of the route in meters.
   */
  distanceMeters: number;
  /**
   * The estimated duration of the route in seconds.
   */
  durationSeconds: number;
}

/**
 * Asynchronously retrieves a route between two locations.
 *
 * @param origin The origin location.
 * @param destination The destination location.
 * @returns A promise that resolves to a Route object containing distance and duration.
 */
export async function getRoute(origin: Location, destination: Location): Promise<Route> {
  // TODO: Implement this by calling an API.

  return {
    distanceMeters: 1000,
    durationSeconds: 600,
  };
}
