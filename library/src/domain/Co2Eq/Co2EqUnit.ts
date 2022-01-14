import { fromEnumCodec } from "../io-ts";

export enum Co2EqUnitEnum {
  TON = "ton",
  KILOGRAM = "kg",
  GRAM = "g",
}

export namespace Co2EqUnit { 
  export const codec = fromEnumCodec('Co2EqUnit', Co2EqUnitEnum);
}