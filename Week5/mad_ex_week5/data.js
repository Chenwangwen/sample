/**
 * @file data.js
 *
 * @brief This file contains the data structures and initial datasets required for this week's exercises.
 *
 * It is crucial that you do not modify the contents of this file, as the test cases are dependent on its original state.
 * Any changes to this file may result in the failure of the exercises, regardless of the correctness of your solutions.
 *
 * @author Larry Wen
 * @date [18/03/2024]
 *
 * @note Please refer to the questions.js file for instructions on how to implement your solutions.
 */
const num = 3;

const students = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    GPA: 6.5,
    hobbies: ["coding", "chess"],
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    GPA: 5.4,
    hobbies: ["running", "swiming"],
  },
  {
    id: 3,
    name: "Charlie",
    email: "charlie@example.com",
    GPA: 4.8,
    hobbies: ["coding", "swimming"],
  },
  {
    id: 4,
    name: "Dave",
    email: "dave@example.com",
    GPA: 5.2,
    hobbies: ["coding"],
  },
  {
    id: 5,
    name: "Bill",
    email: "bill@example.com",
    GPA: 5.2,
    hobbies: ["coding", "swimming"],
  },
  {
    id: 6,
    name: "Alex",
    email: "alex@example.com",
    GPA: 6.2,
    hobbies: ["coding", "reading"],
  },
];

const selectStudents = [
  { name: "Alex", email: "alex@example.com" },
  { name: "Alice", email: "alice@example.com" },
  { name: "Bill", email: "bill@example.com" },
  {
    name: "Dave",
    email: "dave@example.com",
  },
];
module.exports = { num, students, selectStudents };
