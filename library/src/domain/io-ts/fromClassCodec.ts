import * as Codec from "io-ts/lib/Codec";
import * as Decoder from "io-ts/lib/Decoder";

export const fromClassCodec = <S, T extends S>(
  type: new (s: S) => T
): Codec.Codec<S, S, T> =>
  Codec.fromDecoder({ decode: (props: S) => Decoder.success(new type(props)) });

export const fromProtoCodec = <T>(
  protoCodec: any 
): Codec.Codec<Uint8Array, Uint8Array, T> =>
  Codec.make(
    {
      decode: (protoBytes: unknown) =>
        //@ts-ignore
        Decoder.success(protoCodec.decode(protoBytes as Uint8Array)),
    },
    {
      encode: (values: T) =>
        //@ts-ignore
        protoCodec.encode(protoCodec.fromJSON(values)).finish(),
    }
  );
