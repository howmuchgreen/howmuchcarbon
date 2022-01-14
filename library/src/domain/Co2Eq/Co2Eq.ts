import { Co2EqUnit } from "./Co2EqUnit";

export type Co2EqProps = {
  averageInGrams: number;
};

export class Co2Eq {
  averageInGrams;

  constructor({ averageInGrams }: Co2EqProps) {
    this.averageInGrams = averageInGrams;
  }

  format(co2EqUnit: Co2EqUnit = Co2EqUnit.KILOGRAM) {
    switch (co2EqUnit) {
      case Co2EqUnit.KILOGRAM:
        return this.averageInGrams / 1e3;

      case Co2EqUnit.TON:
        return this.averageInGrams / 1e6;

      default:
        return this.averageInGrams;
    }
  }

  static build(co2EqProps: Co2EqProps) {
    return new Co2Eq(co2EqProps);
  }

  static facory({ averageInGrams = 100 * 1000 }: Partial<Co2EqProps> = {}) {
    return Co2Eq.build({ averageInGrams });
  }
}
