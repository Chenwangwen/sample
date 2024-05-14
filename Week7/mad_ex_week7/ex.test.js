/**
 * @file ex.test.js
 * @description Test suite for Week 7 exercises of the Mobile Application Development
 *              course. This file contains test cases that validate the correctness of
 *              the code written in the exercises. The tests are designed to assess
 *              the functionality of the implemented solutions against specified
 *              requirements and scenarios.
 * @author Larry Wen
 * @created [21/04/2024]
 *
 * NOTE: This file is not intended to be modified by the students. Alterations to this
 * test suite may result in inaccurate assessments of the exercise solutions.
 */

const {
  abbreviateName,
  isValidAustralianMobile,
  describeFunction,
  createFunction,
  invokeWithApplyAndCall,
  bindFunction,
} = require("./questions");

describe("Question 1: Abbreviates a full name to its initials.", () => {
  test("abbreviates two-word name", () => {
    expect(abbreviateName("Tom Sawyer")).toBe("Sawyer, T.");
  });

  test("abbreviates three-word name", () => {
    expect(abbreviateName("Tom William Sawyer")).toBe("Sawyer, T. W.");
  });

  test("handles two-word with extra spaces", () => {
    expect(abbreviateName("  Tom    Sawyer  ")).toBe("Sawyer, T.");
  });

  test("handles three-word with extra spaces", () => {
    expect(abbreviateName(" Tom   William   Sawyer ")).toBe("Sawyer, T. W.");
  });
});

describe("Question 2: isValidAustralianMobile Tests", () => {
  test("validates basic format without any spaces or hyphens", () => {
    expect(isValidAustralianMobile("0412345678")).toBeTruthy();
  });
  test("validates numbers with spaces", () => {
    expect(isValidAustralianMobile("04 1234 5678")).toBeTruthy();
  });
  test("validates numbers with parentheses around the prefix", () => {
    expect(isValidAustralianMobile("(04)12345678")).toBeTruthy();
  });
  test("validates numbers with hyphens", () => {
    expect(isValidAustralianMobile("0412-345-678")).toBeTruthy();
  });
  test("validates numbers with various groupings and separators", () => {
    expect(isValidAustralianMobile("0412 3456 78")).toBeTruthy();
  });
  test("rejects numbers with incorrect prefix", () => {
    expect(isValidAustralianMobile("0312345678")).toBeFalsy();
  });
  test("rejects numbers with too many digits", () => {
    expect(isValidAustralianMobile("04123456789")).toBeFalsy();
  });
  test("rejects numbers with too few digits", () => {
    expect(isValidAustralianMobile("0412 345 67")).toBeFalsy();
  });
});

describe("Question 3: Function Reflection and Dynamic Creation", () => {
  it("should correctly describe a function", () => {
    function testFunc(a, b) {}
    expect(describeFunction(testFunc)).toEqual(
      "testFunc is a function expecting 2 parameters."
    );
  });
  // if you like challenge, you may remove the skip from the line before and try
  // to pass this test case :)
  it("should correctly create a function with the given name and length", () => {
    const dynamicFunc = createFunction("dynamic", 2);
    expect(dynamicFunc.name).toEqual("dynamic");
    expect(dynamicFunc.length).toEqual(2);
  });
});

describe("Question 4: Using Function Methods Apply and Call", () => {
  test("Should correctly invoke function with apply and call", () => {
    function sum(x, y, z) {
      return x + y + z;
    }
    const results = invokeWithApplyAndCall(sum, null, [1, 2, 3]);
    expect(results).toEqual([6, 6]); // Since apply and call should result in the same output
  });

  test("Should handle different contexts and maintain correct this binding", () => {
    const context = { multiplier: 10 };
    function multiplyAdd(x, y) {
      return (x + y) * this.multiplier;
    }
    const results = invokeWithApplyAndCall(multiplyAdd, context, [3, 7]);
    expect(results).toEqual([100, 100]); // Both methods should reflect the context's multiplier
  });
});

describe("Question 5: Understanding Function Binding with Bind", () => {
  test("Should bind function context and partially apply arguments", () => {
    function add(x, y) {
      return x + y;
    }
    const boundAdd = bindFunction(add, null, 5);
    expect(boundAdd(10)).toBe(15); // Checks if the first argument is correctly bound
  });

  test("Should handle binding with different contexts and multiple arguments", () => {
    const context = { multiplier: 2 };
    function multiplyAndAdd(x, y, z) {
      return (x + y + z) * this.multiplier;
    }
    const boundMultiplyAndAdd = bindFunction(multiplyAndAdd, context, 3, 2);
    expect(boundMultiplyAndAdd(5)).toBe(20); // (3+2+5)*2 = 20
  });
});
