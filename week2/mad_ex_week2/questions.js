/**
 * @file questions.js
 * @description This file contains programming exercises for Week 2 of the
 *              Mobile Application Development course. It includes a series of
 *              JavaScript challenges that focus functions, closures etc.
 *
 *              Students are expected to write their code solutions within this
 *              file in the designated sections for each exercise. The provided
 *              exercises are designed to enhance understanding of basic JavaScript
 *              syntax and problem-solving skills within the context of web and
 *              mobile app development.
 *
 * @author Larry Wen
 * @created [26/02/2024]
 *
 * INSTRUCTIONS:
 * - Follow the prompts for each exercise and write your code in the specified
 *   areas.
 * - Run the provided tests after completing the exercises to check your work.
 * - Do not modify the structure of the file or the provided code snippets.
 * - Seek assistance if you encounter difficulty understanding the exercises or
 *   implementing the solutions.
 */

/**
 * Exercise 1: Account Generator with Closure
 *
 * Implement a function named `accountGenerator` that utilizes closures to manage account balances.
 * The function should accept two parameters:
 * - `accountName` (String): The name of the account.
 * - `initBalance` (Number): The initial balance of the account.
 *
 * The `accountGenerator` function should return a new function.
 * The new function should take one parameter:
 * - `amount` (Number): The amount to deposit into the account.
 *
 * Each call to the new function should return a string in the following format:
 * "You deposited [amount] to your [accountName] and the current balance is [newBalance]."
 *
 * Ensure that the new function correctly updates and retains the account's balance across multiple invocations.
 *
 * Example usage:
 * const myAccount = accountGenerator('Saving', 100);
 * console.log(myAccount(50)); // "You deposited 50 to your Saving Account and the current balance is 150."
 */

function accountGenerator(accountName, initBalance) {
  let balance = initBalance;
  return function(amount) {
    balance += amount;
    return `You deposited ${amount} to your ${accountName} Account and the current balance is ${balance}.`;
  };
}

/**
 * Exercise 2: Distributing Tips
 *
 * Write a function named `distributeTips` that helps Tom distribute his tips between food and drink.
 * The function should accept an arbitrary number of arguments, each representing the tip amounts
 * Tom received.
 *
 * Tom alternates the allocation of tips between food and drink, starting with food.
 * The function should return an object with two properties: `food` and `drink`, representing the
 * total tips allocated to each.
 *
 * Example:
 * distributeTips(1, 2, 3) should return { food: 4, drink: 2 }.
 * The first tip (1) goes to food, the second tip (2) goes to drink, and the third tip (3) goes back to food.
 *
 * @param {...args} tips - An arbitrary number of tip amounts Tom received.
 * @return {object} An object with the total tips for `food` and `drink`.
 */

function distributeTips(...args) {
  let food = 0;
  let drink = 0;
  args.forEach((tip, index) => {
    if (index % 2 === 0) {
      food += tip;
    } else {
      drink += tip;
    }
  });
  return { food, drink };
}


/**
 * Exercise 3: Customizable Greeting Generator with Closure
 *
 * Implement a function named `greetingGenerator` that uses closures and default parameters
 * to create personalized greeting functions. This function should accept one optional parameter:
 * - `defaultGreeting` (String): The default greeting to be used when no specific greeting is provided.
 *   This parameter should have a default value of "Hello".
 *
 * The `greetingGenerator` function should return a new function that creates the greeting message.
 * This returned function should accept two parameters:
 * - `name` (String): The name of the person to greet.
 * - `greeting` (String): An optional greeting phrase that overrides the `defaultGreeting` if provided.
 *
 * The inner function should use the `defaultGreeting` from the closure scope if no `greeting` is given.
 *
 * Example:
 * const casualGreet = greetingGenerator();
 * console.log(casualGreet('Alice')); // "Hello, Alice!"
 *
 * const formalGreet = greetingGenerator('Good day');
 * console.log(formalGreet('Bob', 'Salutations')); // "Salutations, Bob!"
 * console.log(formalGreet('Charlie')); // "Good day, Charlie!"
 *
 * @param {string} [defaultGreeting="Hello"] - The default greeting phrase.
 * @return {Function} A new function that takes a name and an optional greeting to create a greeting message.
 */

function greetingGenerator(defaultGreeting = "Hello") {
  return function(name, greeting = defaultGreeting) {
    return `${greeting}, ${name}!`;
  };
}

/**
 * Exercise 4: Merge Arrays and Extract Elements
 *
 * Write a function named `mergeAndExtract` that takes two arrays as arguments and performs the following tasks:
 * - Merges both arrays into one using the spread operator.
 * - Uses destructuring to extract the first two elements and the remaining elements of the merged array.
 * - Returns an object with three properties: `first`, `second`, and `remaining`. The `first` and `second` properties
 *   should hold the first two elements of the merged array respectively, while the `remaining` property should be an
 *   array holding the rest of the elements.
 *
 * Example:
 * If the input arrays are [1, 2] and [3, 4, 5, 6], the function should return:
 * { first: 1, second: 2, remaining: [3, 4, 5, 6] }
 *
 * @param {Array} array1 - The first array to merge.
 * @param {Array} array2 - The second array to merge.
 * @return {Object} An object with properties `first`, `second`, and `remaining`.
 */

function mergeAndExtract(array1, array2) {
  const mergedArray = [...array1, ...array2];
  const [first, second, ...remaining] = mergedArray;
  return { first, second, remaining };
}

/**
 * Exercise 5: Alternating Harmonic Series Calculation
 *
 * Implement a function named `calculateAlternatingHarmonic` that computes the sum of the
 * first n terms of the alternating harmonic series. The series is defined as:
 * 1 - 1/2 + 1/3 - 1/4 + ... +/- 1/n
 *
 * The function should use recursion to calculate the series sum, with a strong emphasis on
 * utilizing tail recursion for optimization.
 *
 * Parameters:
 * - `n` (Number): A positive integer representing the number of terms in the series to sum.
 *
 * Returns:
 * - The sum of the first n terms of the alternating harmonic series as a Number.
 *
 * Example:
 * calculateAlternatingHarmonic(4) should return 0.5833333333333333,
 * as the calculation is 1 - 1/2 + 1/3 - 1/4.
 *
 * @param {number} n - The number of terms to include in the sum.
 * @param {number} accumulator - The accumulator for tail recursion, initial call should pass 0.
 * @param {number} index - The current index for tail recursion, initial call should pass 1.
 * @return {number} The sum of the alternating harmonic series up to n terms.
 */

function calculateAlternatingHarmonic(n, accumulator = 0, index = 1) {
  if (n < 1) return accumulator;
  const term = index % 2 === 0 ? -1 / index : 1 / index;
  return calculateAlternatingHarmonic(n - 1, accumulator + term, index + 1);
}

// Export the function for testing
module.exports = {
  accountGenerator,
  distributeTips,
  greetingGenerator,
  mergeAndExtract,
  calculateAlternatingHarmonic,
};
