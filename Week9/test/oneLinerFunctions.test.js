// oneLinerFunctions.test.js

const { filterEvens, sumOfSquares, findLongestWord, capitalizeWords, areAllTrue, asyncFetchProduct, extractEmails, removeDuplicates, countWords, flattenArray } = require('./oneLinerFunctions');

test('filterEvens returns only even numbers', () => {
  expect(filterEvens([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
});

test('sumOfSquares returns the sum of the squares of all numbers', () => {
  expect(sumOfSquares([1, 2, 3])).toEqual(14);
});

test('findLongestWord returns the longest word', () => {
  expect(findLongestWord(["apple", "banana", "grape"])).toBe("banana");
});

test('capitalizeWords capitalizes the first letter of each word', () => {
  expect(capitalizeWords("hello world")).toBe("Hello World");
});

test('areAllTrue checks if all elements satisfy the condition', () => {
  expect(areAllTrue([1, 2, 3], x => x > 0)).toBe(true);
});

test('asyncFetchProduct fetches product data for valid IDs', async () => {
  await expect(asyncFetchProduct(1)).resolves.toEqual({ id: 1, product: "Product Name", price: 99.99 });
});

test('extractEmails finds all email addresses in the text', () => {
  expect(extractEmails("test@example.com and another@test.org")).toEqual(["test@example.com", "another@test.org"]);
});

test('removeDuplicates removes all duplicate values', () => {
  expect(removeDuplicates([1, 1, 2, 3, 3])).toEqual([1, 2, 3]);
});

test('countWords counts the number of occurrences of each word', () => {
  expect(countWords("hello world hello")).toEqual({ hello: 2, world: 1 });
});

test('flattenArray flattens an array of arrays into a single array', () => {
  expect(flattenArray([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5]);
});
