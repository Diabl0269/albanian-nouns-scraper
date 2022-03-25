const fs = require("fs");

const data = JSON.parse(fs.readFileSync("nouns.json"));

describe("Check that the albanian nouns data was fetched correctly", () => {
  it("should be longer then 3800", () => {
    expect(data.length).toBeGreaterThan(3800);
  });

  const words = ["abakë", "zôjë"];
  words.forEach((word) => {
    it(`should be contain ${word} as a value`, () => {
      expect(data).toContain(word);
    });
  });
});
