import * as Either from "fp-ts/Either";
import { identity, pipe } from "fp-ts/function";
import * as Codec from "io-ts/lib/Codec";
import * as Decoder from "io-ts/lib/Decoder";

const isEnumValue =
  <EnumType extends string>(theEnum: Record<string, EnumType>) =>
  (input: unknown): input is EnumType =>
    Object.values(theEnum).includes(input as EnumType);

export const makeEnumParser = <EnumType extends string>(
  enumName: string,
  theEnum: Record<string, EnumType>
): ((input: unknown) => Either.Either<Error, EnumType>) =>
  Either.fromPredicate(
    isEnumValue(theEnum),
    (input) => new Error(`${input} is not a valid value for enum ${enumName}`)
  );

export const fromEnumCodec = <EnumType extends string>(
  enumName: string,
  theEnum: Record<string, EnumType>
): Codec.Codec<unknown, string, EnumType> =>
  Codec.make(
    {
      decode: (value) =>
        pipe(
          value,
          makeEnumParser(enumName, theEnum),
          Either.match(
            (failure) => Decoder.failure(value, failure.message),
            (value) => Decoder.success(value)
          )
        ),
    },
    { encode: identity }
  );