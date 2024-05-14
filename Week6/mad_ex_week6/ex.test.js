/**
 * @file ex.test.js
 * @description Test suite for Week 6 exercises of the Mobile Application Development
 *              course. This file contains test cases that validate the correctness of
 *              the code written in the exercises. The tests are designed to assess
 *              the functionality of the implemented solutions against specified
 *              requirements and scenarios.
 * @author Larry Wen
 * @created [14/04/2024]
 *
 * NOTE: This file is not intended to be modified by the students. Alterations to this
 * test suite may result in inaccurate assessments of the exercise solutions.
 */

const {
  containDigit,
  containCapital,
  validPlate,
  findWordsWithVowels,
  findWordsEndingWithDigit,
  findWordsWithPattern,
  formatProductNames,
  getCategories,
  getGoodProducts,
} = require("./questions");

describe("Question 1: Using Regular Expression Function .test()", () => {
  test("containDigit returns true if string contains a digit", () => {
    expect(containDigit("abc123")).toBeTruthy();
    expect(containDigit("abc")).toBeFalsy();
  });

  test("containCapital returns true if string contains a capital letter", () => {
    expect(containCapital("Abc")).toBeTruthy();
    expect(containCapital("abc")).toBeFalsy();
  });

  test("validPlate returns true if string is in the format of three capitals followed by three digits", () => {
    expect(validPlate("ABC123")).toBeTruthy();
    expect(validPlate("abc123")).toBeFalsy();
    expect(validPlate("AB123")).toBeFalsy();
    expect(validPlate("ABCD1234")).toBeFalsy();
  });
});

describe("Question 2: Using Regular Expression Function .match()", () => {
  test("findWordsWithVowels should return all words containing vowels", () => {
    expect(findWordsWithVowels("This is an example.")).toEqual([
      "this",
      "is",
      "an",
      "example",
    ]);
    expect(findWordsWithVowels("Try crypt.")).toEqual([]);
  });

  test("findWordsEndingWithDigit should return all words ending with a digit", () => {
    expect(
      findWordsEndingWithDigit("My favorite numbers are 42 and ibm360.")
    ).toEqual(["42", "ibm360"]);
    expect(findWordsEndingWithDigit("No numbers here.")).toEqual([]);
  });

  test("findWordsWithPattern should return words starting with b, k, d, l and ending with e", () => {
    expect(findWordsWithPattern("Mike like to ride bike.")).toEqual([
      "like",
      "bike",
    ]);
    expect(findWordsWithPattern("No matches here.")).toEqual([]);
  });
});

describe("Question 3: formatProductNames", () => {
  it("should correctly transform product names into objects", () => {
    const products = ["shoes", "women's cloth", "canon camera lens"];
    const expected = [
      { id: "shoes", title: "Shoes" },
      { id: "womensCloth", title: "Women's Cloth" },
      { id: "canonCameraLens", title: "Canon Camera Lens" },
    ];
    const result = formatProductNames(products);
    expect(result).toEqual(expected);
  });
});

describe("Question 4: getCategories", () => {
  it("should fetch an array of categories from the Fake Store API", async () => {
    const categories = await getCategories();
    expect(Array.isArray(categories)).toBeTruthy();
    expect(categories).toEqual([
      "electronics",
      "jewelery",
      "men's clothing",
      "women's clothing",
    ]); // Assuming 'electronics' is a known category returned by the API
  });
});

// Test cases for Question 5
describe("Question 5: getGoodProducts", () => {
  it("should fetch products matching the specified category with ratings above the given minimum", async () => {
    const category = "electronics";
    const minRate = 4.5;
    const products = await getGoodProducts(category, minRate);
    const expectedProduct = [
      {
        id: 11,
        title:
          "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
        rate: 4.8,
        price: 109,
      },
      {
        id: 12,
        title:
          "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
        rate: 4.8,
        price: 114,
      },
    ];
    expect(Array.isArray(products)).toBeTruthy();
    expect(products).toEqual(expectedProduct);
  });

  it("should return an empty array if no products match the criteria", async () => {
    const category = "nonexistent";
    const minRate = 5;
    const products = await getGoodProducts(category, minRate);
    expect(products).toEqual([]);
  });
});
