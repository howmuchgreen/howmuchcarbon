import { Co2Eq, findBestUnitForAmountInGrams } from "./Co2Eq";
import { Co2EqUnit } from "./Co2EqUnit";

describe("findBestUnitForAmountInGrams", () => {
  it("", () => {
    expect(findBestUnitForAmountInGrams(1000)).toEqual(Co2EqUnit.KILOGRAM);
  });
  it("", () => {
    expect(findBestUnitForAmountInGrams(100)).toEqual(Co2EqUnit.GRAM);
  });
  it("", () => {
    expect(findBestUnitForAmountInGrams(1000)).toEqual(Co2EqUnit.KILOGRAM);
  });
  it("", () => {
    expect(findBestUnitForAmountInGrams(1)).toEqual(Co2EqUnit.GRAM);
  });
  it("", () => {
    expect(findBestUnitForAmountInGrams(10 * 1000 * 1000)).toEqual(Co2EqUnit.TON);
  });
});

describe("Co2Eq", () => {
  it("", () => {
    expect(Co2Eq.build({averageValue: 10, unit: Co2EqUnit.KILOGRAM}).format()).toEqual("10 kg");
  });
});
