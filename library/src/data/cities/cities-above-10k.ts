import { CityArrayProto } from "./City.pb";
//@ts-ignore
import citiesBase64 from "./cities-above-10k.pbf";
import { decode } from "base64-arraybuffer";

export const CITIES_ABOVE_10_000 = () => {
  const uint8Array = new Uint8Array(decode(citiesBase64));
  return CityArrayProto.decode(uint8Array).cities;
};
