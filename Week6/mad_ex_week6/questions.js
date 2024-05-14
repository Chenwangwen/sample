/**
 * @file questions.js
 * @description This file contains programming exercises for Week 6 of the
 *              Mobile Application Development course. It includes a series of
 *              JavaScript challenges that focus regular expression and fetch API.
 *
 *              Students are expected to write their code solutions within this
 *              file in the designated sections for each exercise. The provided
 *              exercises are designed to enhance understanding of basic JavaScript
 *              syntax and problem-solving skills within the context of web and
 *              mobile app development.
 *
 * @author Larry Wen
 * @created [27/04/2024]
 *
 * INSTRUCTIONS:
 * - Follow the prompts for each exercise and write your code in the specified
 *   areas.
 * - Run the provided tests after completing the exercises to check your work.
 * - Do not modify the structure of the file or the provided code snippets.
 * - Seek assistance if you encounter difficulty understanding the exercises or
 *   implementing the solutions.
 */

// Question 1: Using Regular Expression Function: `.test()`
// Implement the following functions that utilize regular expressions:
// 1. containDigit - Check if the input string contains at least one digit.
// 2. containCapital - Check if the input string contains at least one uppercase letter.
// 3. validPlate - Check if the input string is a valid license plate with the format: Three uppercase letters followed by three digits.

function containDigit(str) {
  const regex = /\d/;
  return regex.test(str);
}

function containCapital(str) {
  const regex = /[A-Z]/;
  return regex.test(str);
}

function validPlate(str) {
  const regex = /^[A-Z]{3}\d{3}$/;
  return regex.test(str);
}

// Question 2 Using Regular Expression Function `.match()`
// 1. findWordsWithVowels: Return all words containing vowels from a given string.
// 2. findWordsEndingWithDigit: Return all words that end with a digit.
// 3. findWordsWithPattern: Return words that start with [b, k, d, l] and end with 'e'
// [note]: All these questions are case-insensitive, and the returned words should be
// in lowercase. For instance, both "My" and "my" should return "my"
function findWordsWithVowels(str) {
  return str.toLowerCase().match(/\b\w*[aeiou]\w*\b/g) || []
  // const vowelsRegex = /[aeiou]/i;
  // return words.filter(word => vowelsRegex.test(word));
}

function findWordsEndingWithDigit(str) {
  const words = str.toLowerCase().match(/\b\w*\b/g);
  const digitEndRegex = /\d$/;
  return words.filter(word => digitEndRegex.test(word));
}

function findWordsWithPattern(str) {
  const words = str.toLowerCase().match(/\b\w*\b/g);
  const patternRegex = /^(b|k|d|l).*e$/i;
  return words.filter(word => patternRegex.test(word));
}


// Question 3: Format an array of product strings into an array of objects with 'id' and 'title' properties.
// The 'id' should be a camel-cased, lowercase version of the product name with special characters removed.
// The 'title' should capitalize each word for display, making it human-readable.
// Usage of Array's map function and the replace method with regular expressions is mandatory.
// Example:
// Input: ['shoes', "women's cloth"]
// Output: [
//    { id: 'shoes', title: 'Shoes' },
//    { id: 'womensCloth', title: "Women's Cloth" }
// ]
function formatProductNames(products) {
  return products.map(product => {
    const id = product.toLowerCase()
                      .replace(/[^a-z0-9\s]+/gi, '') 
                      .trim() 
                      .replace(/\s+(\w)/g, (match, p1) => p1.toUpperCase()) 
                      // .replace(/\s/g, '');

    const title = product.replace(/\b\w/g, char => char.toUpperCase())
                         .replace(/'\w/g, match => match.toLowerCase()); 

    return { id, title };
  });
}



// Question 4: Write an asynchronous function `getCategories` that retrieves a list of categories from the Fake Store API.
// The function should make a network request to 'https://fakestoreapi.com/products/categories' and return an array of category strings provided by the API.
// This function should use async/await for handling asynchronous operations.
// Note: you can find the api documents at: https://fakestoreapi.com/docs
async function getCategories() {
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const categories = await response.json();
    return categories;
  } catch (error) {   
    console.error('There was a problem with the fetch operation:', error);
    return [];  
  }
}

// Question 5: Write an asynchronous function `getGoodProducts` that retrieves products from a specified category with a rating equal to or higher than a given minimum.
// This function should take two parameters: `category` (a string) and `minRate` (a number).
// Make a network request to 'https://fakestoreapi.com/products/' and filter the results to include only those products that match the category and have a rating greater or equal to `minRate`.
// The function should return an array of objects, each containing 'id', 'rate', 'title', and 'price' of the product.
// You should use high order array function map and filter.
// Note: you can find the api documents at: https://fakestoreapi.com/docs
async function getGoodProducts(category, minRate) {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products = await response.json();

    const filteredProducts = products.filter(product => 
      product.category === category && product.rating.rate >= minRate
    ).map(product => ({
      id: product.id,
      rate: product.rating.rate,
      title: product.title,
      price: product.price
    }));

    return filteredProducts;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return []; 
  }
}


module.exports = {
  containDigit,
  containCapital,
  validPlate,
  findWordsWithVowels,
  findWordsEndingWithDigit,
  findWordsWithPattern,
  formatProductNames,
  getCategories,
  getGoodProducts,
};
