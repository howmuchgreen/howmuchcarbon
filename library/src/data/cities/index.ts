import { CityArrayProto } from "./City.pb";
//@ts-ignore
import citiesBase64 from "./cities-above-10k.pbf";
import { decode } from "base64-arraybuffer";

export * from "./City.pb";

const uint8Array = new Uint8Array(decode(citiesBase64));
export const CITIES_ABOVE_10_000 = CityArrayProto.decode(uint8Array).cities;
