import { howMuch } from "./howMuch";

describe('howMuch()', () => {
  it('should return some results when searching for iPhone', () => {
    expect(howMuch('iphone').numResults).toBeGreaterThan(0)
  });
});
