import { howMuch } from "./howMuch";

describe('howMuch()', () => {
  it('should return some results when searching for iPad', () => {
    expect(howMuch('iphone').numResults).toBeGreaterThan(0)
  });
});
