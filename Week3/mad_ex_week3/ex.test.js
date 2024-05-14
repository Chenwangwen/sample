/**
 * @file ex.test.js
 * @description Test suite for Week 3 exercises of the Mobile Application Development
 *              course. This file contains test cases that validate the correctness of
 *              the code written in the exercises. The tests are designed to assess
 *              the functionality of the implemented solutions against specified
 *              requirements and scenarios.
 * @author Larry Wen
 * @created [01/03/2024]
 *
 * NOTE: This file is not intended to be modified by the students. Alterations to this
 * test suite may result in inaccurate assessments of the exercise solutions.
 */

const {
  filterNegativeNumbers,
  doubleDivisibleByThree,
  selectHighPerformingStudents,
  aggregateStudentData,
  swapForm,
} = require("./questions");

const { students, selectStudents } = require("./data");
describe("Exercise 1: filterNegativeNumbers", () => {
  test("filters mixed positive and negative numbers correctly", () => {
    expect(filterNegativeNumbers([-1, 2, -3, 4, -5, 6])).toEqual([2, 4, 6]);
  });

  test("returns an empty array for all negative numbers", () => {
    expect(filterNegativeNumbers([-7, -3, -15, -100])).toEqual([]);
  });

  test("filters all positive numbers correctly (including zero)", () => {
    expect(filterNegativeNumbers([0, 1, 2, 3, 4, 5])).toEqual([
      0, 1, 2, 3, 4, 5,
    ]);
  });

  test("returns an empty array for an empty input", () => {
    expect(filterNegativeNumbers([])).toEqual([]);
  });
});

describe("Exercise 2: Doubling Numbers Divisible by Three", () => {
  test("doubles numbers that are divisible by three", () => {
    // Input: [1, 2, 3, 4, 5, 6]
    // Expected Output: [6, 12]
    // This test checks if the function correctly identifies numbers divisible by three (3, 6) and doubles them.
    expect(doubleDivisibleByThree([1, 2, 3, 4, 5, 6])).toEqual([6, 12]);
  });

  test("returns an empty array when no numbers are divisible by three", () => {
    // Input: [1, 2, 4, 5]
    // Expected Output: []
    // This test verifies that the function returns an empty array when none of the input numbers are divisible by three.
    expect(doubleDivisibleByThree([1, 2, 4, 5])).toEqual([]);
  });

  test("works with negative numbers and zero", () => {
    // Input: [-3, 0, 3, 6, 10]
    // Expected Output: [-6, 0, 6, 12]
    // This test ensures that the function correctly handles negative numbers and zero, doubling them when they are divisible by three.
    expect(doubleDivisibleByThree([-3, 0, 3, 6, 10])).toEqual([-6, 0, 6, 12]);
  });
});

describe("Exercise 3: Selecting High-Performing Students with a Specific Hobby", () => {
  test("test if filter works", () => {
    expect(selectHighPerformingStudents(students).length).toEqual(
      selectStudents.length
    );
  });
  test("filters students by GPA and coding hobby, returns sorted names and emails", () => {
    expect(selectHighPerformingStudents(students)).toEqual(selectStudents);
  });
});

describe("Exercise 4: Aggregating Student Data with reduce()", () => {
  test("correctly aggregates data get students number correct", () => {
    expect(aggregateStudentData(students).studentNum).toEqual(6);
    expect(aggregateStudentData(students).codingStudentNum).toEqual(5);
  });
  test("correctly aggregates data from student objects", () => {
    const expectedOutput = {
      studentNum: 6,
      studentAvgGPA: 5.55,
      codingStudentNum: 5,
      codingStudentGPA: 5.58,
    };
    expect(aggregateStudentData(students).studentNum).toEqual(6);
    expect(aggregateStudentData(students).codingStudentNum).toEqual(5);
    expect(aggregateStudentData(students)).toEqual(expectedOutput);
  });

  // Add more test cases as needed
});

describe("Exercise 5: Swapping Between Sentence and CamelCase Forms", () => {
  test("converts sentence to camelCase", () => {
    // Example: "open a bank account" -> "openABankAccount"
    expect(swapForm("open a bank account")).toEqual("openABankAccount");
    expect(swapForm("complete validation")).toEqual("completeValidation");
  });

  test("converts camelCase to sentence", () => {
    // Example: "openABankAccount" -> "open a bank account"
    // Assuming camelCase input starts with a lowercase letter
    expect(swapForm("openABankAccount")).toEqual("open a bank account");
    expect(swapForm("refundAnOrder")).toEqual("refund an order");
  });

  test("handles single word input", () => {
    // Single word input should be considered camelCase and converted to sentence
    expect(swapForm("word")).toEqual("word");
    // If input is a single lowercased word, output should be the same as input
  });
});
