import { CityArrayProto, CityProto } from "./City.pb";
import { DataProvider } from "../../../domain/DataProvider";
//@ts-ignore
import citiesBase64 from "./all-cities.pbf";
import { decode } from "base64-arraybuffer";

// This works in Node, in the browser you  will need to convert from base64 with a different method.

export class CitiesDataProvider implements DataProvider<CityProto> {
  getAll() {
    const uint8Array = new Uint8Array(decode(citiesBase64));
    return CityArrayProto.decode(uint8Array).cities;
  }
}
