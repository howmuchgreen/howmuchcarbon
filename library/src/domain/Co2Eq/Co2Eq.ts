import * as Either from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import * as Codec from "io-ts/Codec";
import * as Decoder from "io-ts/Decoder";
import { Co2EqUnit } from "./Co2EqUnit";

export class Co2Eq {
  averageInGrams;

  constructor({ averageValue, unit }: Co2EqProps) {
    this.averageInGrams = convertToGrams(averageValue, unit);
  }

  format(co2EqUnit?: Co2EqUnit) {
    const unit = co2EqUnit
      ? co2EqUnit
      : findBestUnitForAmountInGrams(this.averageInGrams);

    const number = this.averageInGrams / Math.pow(10, unit.magnitude);
    const unitString = number > 1 ? unit.plural : unit.singular;
    return `${number} ${unitString}`;
  }

  static build(co2EqProps: Co2EqProps) {
    return new Co2Eq(co2EqProps);
  }

  static factory({
    averageValue = 100 * 1000,
    unit = Co2EqUnit.KILOGRAM,
  }: Partial<Co2EqProps> = {}) {
    return Co2Eq.build({ averageValue, unit });
  }

  static propsCodec = Codec.struct({
    averageValue: Codec.number,
    unit: Co2EqUnit.codec,
  });

  static stringCodec = Codec.make<unknown, string, Co2Eq>(
    pipe(
      Decoder.string,
      Decoder.compose({
        decode: (string) => {
          const REGEX = /^([0-9]*\.?[0-9]*) *([a-zA-Z]*)$/;
          const regexArray = REGEX.exec(string.replace(/,/, "."));
          if (!regexArray) {
            return Decoder.failure(string, `matching regex ${REGEX.source}`);
          } else {
            const [, value, unitString] = regexArray;
            return pipe(
              Co2EqUnit.codec.decode(unitString),
              Either.map((unit) =>
                Decoder.success(
                  Co2Eq.build({ averageValue: Number(value), unit })
                )
              ),
              Either.getOrElse(() =>
                Decoder.failure(string, "having a valid unit")
              )
            );
          }
        },
      })
    ),
    {
      encode: (co2Eq) => {
        return co2Eq.format();
      },
    }
  );
}

type Co2EqProps = Codec.TypeOf<typeof Co2Eq.propsCodec>;

export const findBestUnitForAmountInGrams = (amountInGrams: number) => {
  const orderOfMagnitude = Math.floor(
    Math.log(amountInGrams) / Math.LN10 + 0.000000001
  );
  if (orderOfMagnitude < 3) {
    return Co2EqUnit.GRAM;
  } else if (orderOfMagnitude < 6) {
    return Co2EqUnit.KILOGRAM;
  } else {
    return Co2EqUnit.TON;
  }
};

const convertToGrams = (value: number, unit: Co2EqUnit) => {
  return value * multiplicationFactor(unit);
};

const multiplicationFactor = (unit: Co2EqUnit) => {
  switch (unit) {
    case Co2EqUnit.KILOGRAM:
      return 1e3;

    case Co2EqUnit.TON:
      return 1e6;

    case Co2EqUnit.GRAM:
      return 1;

    default:
      throw new Error("This should never happen");
  }
};
