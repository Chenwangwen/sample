/**
 * @file ex.test.js
 * @description Test suite for Week 2 exercises of the Mobile Application Development
 *              course. This file contains test cases that validate the correctness of
 *              the code written in the exercises. The tests are designed to assess
 *              the functionality of the implemented solutions against specified
 *              requirements and scenarios.
 * @author Larry Wen
 * @created [26/02/2024]
 *
 * NOTE: This file is not intended to be modified by the students. Alterations to this
 * test suite may result in inaccurate assessments of the exercise solutions.
 */

const {
  accountGenerator,
  distributeTips,
  greetingGenerator,
  mergeAndExtract,
  calculateAlternatingHarmonic,
} = require("./questions");

describe("Exercise 1: accountGenerator Function", () => {
  const myAccount = accountGenerator("Saving", 100);

  test("returns correct message and updates balance on deposit", () => {
    expect(myAccount(50)).toBe(
      "You deposited 50 to your Saving Account and the current balance is 150."
    );
  });

  test("accumulates balance correctly across multiple deposits", () => {
    expect(myAccount(20)).toBe(
      "You deposited 20 to your Saving Account and the current balance is 170."
    );
    expect(myAccount(30)).toBe(
      "You deposited 30 to your Saving Account and the current balance is 200."
    );
  });
});

describe("Exercise 2: distributeTips Function", () => {
  test("correctly distributes tips between food and drink", () => {
    expect(distributeTips(1, 2, 3)).toEqual({ food: 4, drink: 2 });
    expect(distributeTips(10, 15)).toEqual({ food: 10, drink: 15 });
    expect(distributeTips(5, 5, 5, 5)).toEqual({ food: 10, drink: 10 });
  });

  test("returns zero for both food and drink when no tips are given", () => {
    expect(distributeTips()).toEqual({ food: 0, drink: 0 });
  });
});

describe("Exercise 3: greetingGenerator Function with Closure and Default Parameters", () => {
  const casualGreet = greetingGenerator();
  const formalGreet = greetingGenerator("Good day");

  test("uses the default greeting when no specific greeting is provided", () => {
    expect(casualGreet("Alice")).toBe("Hello, Alice!");
  });

  test("uses the closure default greeting when no greeting is given", () => {
    expect(formalGreet("Charlie")).toBe("Good day, Charlie!");
  });

  test("overrides the default greeting with the provided greeting", () => {
    expect(formalGreet("Bob", "Salutations")).toBe("Salutations, Bob!");
  });
});

describe("Exercise 4: mergeAndExtract Function", () => {
  test("correctly merges arrays and extracts elements", () => {
    expect(mergeAndExtract([1, 2], [3, 4, 5, 6])).toEqual({
      first: 1,
      second: 2,
      remaining: [3, 4, 5, 6],
    });
    expect(mergeAndExtract(["a", "b"], ["c", "d", "e"])).toEqual({
      first: "a",
      second: "b",
      remaining: ["c", "d", "e"],
    });
  });

  test("handles empty arrays correctly", () => {
    expect(mergeAndExtract([], [1, 2, 3])).toEqual({
      first: 1,
      second: 2,
      remaining: [3],
    });
    expect(mergeAndExtract(["a"], [])).toEqual({
      first: "a",
      second: undefined,
      remaining: [],
    });
  });
});

describe("Exercise 5: calculateAlternatingHarmonic Function", () => {
  test("calculates the series sum correctly for a given number of terms", () => {
    expect(calculateAlternatingHarmonic(4)).toBeCloseTo(0.5833333333333333);
    expect(calculateAlternatingHarmonic(1)).toBeCloseTo(1);
    expect(calculateAlternatingHarmonic(2)).toBeCloseTo(0.5);
  });

  test("handles large number of terms", () => {
    console.log(111, calculateAlternatingHarmonic(1000));
    expect(calculateAlternatingHarmonic(1000)).toBeCloseTo(
      0.6926474305598223,
      9
    );
  });
});
