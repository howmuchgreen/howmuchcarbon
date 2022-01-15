import { HowMuchResult } from "./HowMuchResult";
import { fromClassCodec } from "./io-ts";
import * as Codec from "io-ts/Codec";
import { pipe } from "fp-ts/function";

export class ResultObject {
  results;

  constructor(props: ResultObjectProps) {
    this.results = props.results;
  }

  get bestResult() {
    return this.results[0] || null;
  }

  get numResults() {
    return this.results.length;
  }

  static build(props: ResultObjectProps) {
    return new ResultObject(props);
  }

  static fromResults(results: Extract<ResultObjectProps, "results">) {
    return this.build({ results });
  }

  static propsCodec = pipe(
    Codec.struct({
      results: Codec.array(HowMuchResult.codec),
    })
  );

  static codec = pipe(
    this.propsCodec,
    Codec.compose(fromClassCodec(ResultObject))
  );
}

type ResultObjectProps = Codec.TypeOf<typeof ResultObject.propsCodec>;
