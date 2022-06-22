declare module "all-the-cities" {
  export type LngLat = [number, number];

  export type City = {
    cityId: Number;
    name: string;
    altName: string;
    country: string;
    featureCode: string;
    adminCode: string;
    population: number;
    loc: { type: "Point"; coordinates: LngLat };
  };

  const Cities: City[];

  export default Cities;
}
