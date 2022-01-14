import { Co2Eq, findBestUnitForAmountInGrams } from "./Co2Eq";
import { Co2EqUnitEnum } from "./Co2EqUnit";

describe("findBestUnitForAmountInGrams", () => {
  it("", () => {
    expect(findBestUnitForAmountInGrams(1000)).toEqual(Co2EqUnitEnum.KILOGRAM);
  });
  it("", () => {
    expect(findBestUnitForAmountInGrams(100)).toEqual(Co2EqUnitEnum.GRAM);
  });
  it("", () => {
    expect(findBestUnitForAmountInGrams(1000)).toEqual(Co2EqUnitEnum.KILOGRAM);
  });
  it("", () => {
    expect(findBestUnitForAmountInGrams(1)).toEqual(Co2EqUnitEnum.GRAM);
  });
  it("", () => {
    expect(findBestUnitForAmountInGrams(10 * 1000 * 1000)).toEqual(Co2EqUnitEnum.TON);
  });
});

describe("Co2Eq", () => {
  it("", () => {
    expect(Co2Eq.build({averageValue: 10, unit: Co2EqUnitEnum.KILOGRAM}).format()).toEqual("10 kg");
  });
});
