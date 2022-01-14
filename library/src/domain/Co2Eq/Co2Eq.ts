import * as Either from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import * as Codec from "io-ts/lib/Codec";
import * as Decoder from "io-ts/lib/Decoder";
import { Co2EqUnit, Co2EqUnitEnum } from "./Co2EqUnit";

export class Co2Eq {
  averageInGrams;

  constructor({ averageValue, unit }: Co2EqProps) {
    this.averageInGrams = convertToGrams(averageValue, unit);
  }

  format(co2EqUnit?: Co2EqUnitEnum) {
    const unit = co2EqUnit
      ? co2EqUnit
      : findBestUnitForAmountInGrams(this.averageInGrams);

    switch (unit) {
      case Co2EqUnitEnum.KILOGRAM:
        return `${this.averageInGrams / 1e3} kg`;

      case Co2EqUnitEnum.TON:
        return `${this.averageInGrams / 1e6} tons`;

      case Co2EqUnitEnum.GRAM:
        return `${this.averageInGrams} g`;
    }
  }

  static build(co2EqProps: Co2EqProps) {
    return new Co2Eq(co2EqProps);
  }

  static factory({
    averageValue = 100 * 1000,
    unit = Co2EqUnitEnum.KILOGRAM,
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
          const REGEX = /^([0-9]*,?\.?[0-9]*) *(g|kg|ton)$/;
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
    return Co2EqUnitEnum.GRAM;
  } else if (orderOfMagnitude < 6) {
    return Co2EqUnitEnum.KILOGRAM;
  } else {
    return Co2EqUnitEnum.TON;
  }
};

const convertToGrams = (value: number, unit: Co2EqUnitEnum) => {
  return value * multiplicationFactor(unit);
};

const multiplicationFactor = (unit: Co2EqUnitEnum) => {
  switch (unit) {
    case Co2EqUnitEnum.KILOGRAM:
      return 1e3;

    case Co2EqUnitEnum.TON:
      return 1e6;

    case Co2EqUnitEnum.GRAM:
      return 1;
  }
};
