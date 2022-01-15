import { HowMuchResult } from "./HowMuchResult";

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
}

type ResultObjectProps = {
  results: HowMuchResult[];
};
