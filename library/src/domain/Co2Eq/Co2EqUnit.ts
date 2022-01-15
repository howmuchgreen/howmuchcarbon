import { pipe } from "fp-ts/es6/function";
import * as Codec from "io-ts/es6/Codec";
import { failure, success } from "io-ts/es6/Decoder";

const textToUnit = (text: string) =>
  pipe(
    [Co2EqUnit.GRAM, Co2EqUnit.KILOGRAM, Co2EqUnit.TON].flatMap((unit) => {
      const { singular, plural } = unit;
      return [
        [singular, unit],
        [plural, unit],
      ];
    }),
    Object.fromEntries
  )[text];

export class Co2EqUnit {
  singular;
  plural;
  magnitude;

  constructor(props: Co2EqUnitProps) {
    this.singular = props.singular;
    this.plural = props.plural;
    this.magnitude = props.magnitude;
  }

  static build = (props: Co2EqUnitProps) => new Co2EqUnit(props);

  static propsCodec = Codec.struct({
    singular: Codec.string,
    plural: Codec.string,
    magnitude: Codec.number,
  });

  // static codec = pipe(this.propsCodec, Codec.compose(fromClassCodec(Co2EqUnit)));
  static codec = pipe(
    Codec.string,
    Codec.compose(
      Codec.make<string, string, Co2EqUnit>(
        {
          decode: (text) => {
            const unitOrUndefined = textToUnit(text);
            if (unitOrUndefined) {
              return success(unitOrUndefined);
            } else return failure(text, "a valid unit");
          },
        },
        { encode: (unit) => unit.singular }
      )
    )
  );
}

export namespace Co2EqUnit {
  export const KILOGRAM = Co2EqUnit.build({
    singular: "kg",
    plural: "kgs",
    magnitude: 3,
  });
  export const TON = Co2EqUnit.build({
    singular: "ton",
    plural: "tons",
    magnitude: 3,
  });
  export const GRAM = Co2EqUnit.build({
    singular: "g",
    plural: "g",
    magnitude: 3,
  });
}

export type Co2EqUnitProps = Codec.TypeOf<typeof Co2EqUnit.propsCodec>;
