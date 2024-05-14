// oneLinerFunctions.js

// Returns an array containing only the even numbers from the input array of numbers.
function filterEvens(numbers) {
    return numbers.filter(n => n % 2 === 0);
  }
  
  // Returns the sum of the squares of all numbers in the input array using the reduce() method.
  function sumOfSquares(numbers) {
    return numbers.reduce((sum, num) => sum + num * num, 0);
  }
  
  // Returns the longest word in an array of words. If there are multiple with the same length, return the first.
  function findLongestWord(words) {
    return words.reduce((longest, word) => word.length > longest.length ? word : longest, "");
  }
  
  // Takes a string and returns the string with the first letter of each word capitalized using the map(), split(), and join() methods.
  function capitalizeWords(sentence) {
    return sentence.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  
  // Checks whether all elements in the values array satisfy a given condition.
  function areAllTrue(values, predicate) {
    return values.every(predicate);
  }
  
  // Simulates fetching product data based on a given id. Utilizes a Promise.
  function asyncFetchProduct(id) {
    return new Promise((resolve, reject) => {
      if (id > 0) {
        resolve({ id, product: "Product Name", price: 99.99 });
      } else {
        reject(new Error("Invalid product ID"));
      }
    });
  }
  
  // Uses a regular expression to find all email addresses in a given piece of text and returns them as an array.
  function extractEmails(text) {
    return text.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/g) || [];
  }
  
  // Removes all duplicate values from an array using filter() and indexOf().
  function removeDuplicates(array) {
    return array.filter((item, index) => array.indexOf(item) === index);
  }
  
  // Returns an object where each key is a word and each value is the number of times that word appears in the string.
  function countWords(sentence) {
    return sentence.split(' ').reduce((acc, word) => {
      word = word.toLowerCase();
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
  }
  
  // Flattens an array of arrays into a single array using the reduce() and concat() methods.
  function flattenArray(arrays) {
    return arrays.reduce((flat, current) => flat.concat(current), []);
  }
  
  module.exports = { filterEvens, sumOfSquares, findLongestWord, capitalizeWords, areAllTrue, asyncFetchProduct, extractEmails, removeDuplicates, countWords, flattenArray };
  

