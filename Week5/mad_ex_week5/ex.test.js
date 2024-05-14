/**
 * @file ex.test.js
 * @description Test suite for Week 5 exercises of the Mobile Application Development
 *              course. This file contains test cases that validate the correctness of
 *              the code written in the exercises. The tests are designed to assess
 *              the functionality of the implemented solutions against specified
 *              requirements and scenarios.
 * @author Larry Wen
 * @created [27/04/2024]
 *
 * NOTE: This file is not intended to be modified by the students. Alterations to this
 * test suite may result in inaccurate assessments of the exercise solutions.
 */

const {
  createAccount,
  Person,
  Car,
  ElectricCar,
  createShoppingCart,
} = require("./questions");

describe("Question 1: Account Management Function", () => {
  let account;

  beforeEach(() => {
    // Initialize a new account before each test case
    account = createAccount("Sample Account", 100);
  });

  test("deposit adds to balance and records transaction correctly", () => {
    const depositResult = account.deposit(50);
    expect(depositResult).toBe("OK");
    expect(account.checkAccount().balance).toBe(150);
    expect(account.checkAccount().transactions).toContainEqual({
      action: "deposit",
      amount: 50,
    });
  });

  test("withdraw subtracts from balance and records transaction, handling overdraw correctly", () => {
    const withdrawSuccess = account.withdraw(20);
    expect(withdrawSuccess).toBe("OK");
    expect(account.checkAccount().balance).toBe(80);
    expect(account.checkAccount().transactions).toContainEqual({
      action: "withdraw",
      amount: 20,
    });

    const withdrawFail = account.withdraw(200);
    expect(withdrawFail).toBe("Withdraw over balance");
    // Ensure balance hasn't changed after failed withdrawal
    expect(account.checkAccount().balance).toBe(80);
  });

  test("checkAccount returns current balance and transaction history", () => {
    // Perform a series of account operations
    account.deposit(100);
    account.withdraw(50);

    const accountStatus = account.checkAccount();
    expect(accountStatus.balance).toBe(150);
    expect(accountStatus.transactions).toEqual([
      { action: "open", amount: 100 },
      { action: "deposit", amount: 100 },
      { action: "withdraw", amount: 50 },
    ]);
  });
});

describe("Question 2: Implementing Getters and Setters", () => {
  const person = Person("john", 25);

  test("Test Initial Name and Age.", () => {
    // Test initial values
    expect(person.getName).toBe("John");
    expect(person.getAge).toBe(25);
  });
  test("After setter functin, new Name is capitalized and new Age is validated", () => {
    // Update and validate name
    person.setName = "jane";
    expect(person.getName).toBe("Jane");

    // Update and validate age
    person.setAge = 30;
    expect(person.getAge).toBe(30);

    // Attempt to set invalid age
    console.log = jest.fn(); // Mock console.log for testing
    person.setAge = -5;
    expect(console.log).toHaveBeenCalledWith("Invalid age provided");
    expect(person.getAge).toBe(30); // Age should not update
  });
});

describe("Question 3: Using Classes in JavaScript", () => {
  test("Car getInfo method returns correct information", () => {
    const myCar = new Car("Toyota", "Corolla", 2020);
    expect(myCar.getInfo()).toBe("Toyota Corolla 2020");
  });

  test("ElectricCar getBatteryInfo method returns correct battery level", () => {
    const myElectricCar = new ElectricCar("Tesla", "Model S", 2019, 85);
    expect(myElectricCar.getBatteryInfo()).toBe("Battery level at 85%");
  });

  test("ElectricCar getInfo method returns extended information including battery level", () => {
    const myElectricCar = new ElectricCar("Nissan", "Leaf", 2018, 75);
    expect(myElectricCar.getInfo()).toBe("Nissan Leaf 2018 with 75% battery");
  });
});

describe("Question 4: Array Prototype Extension for JSON Operations", () => {
  test("serialize method correctly converts array to JSON string", () => {
    const arr = [1, 2, "test", { key: "value" }];
    expect(arr.serialize()).toBe('[1,2,"test",{"key":"value"}]');
  });

  test("deserialize method correctly populates array from JSON string", () => {
    const json = '[1,2,"test",{"key":"value"}]';
    const arr = [];
    arr.deserialize(json);
    expect(arr).toEqual([1, 2, "test", { key: "value" }]);
  });

  test("deserialize method replaces existing array contents", () => {
    const arr = [1, 2, 3];
    const json = '["a","b","c"]';
    arr.deserialize(json);
    expect(arr).toEqual(["a", "b", "c"]);
  });
});

describe("Question 5: Shopping Cart Functionality with Direct Access Getters", () => {
  let cart;

  beforeEach(() => {
    // Initialize a new shopping cart before each test case
    cart = createShoppingCart();
  });

  test("totalPrice and itemNumber getters update correctly", () => {
    cart.addItem(1, "Apple", 0.99);
    cart.addItem(2, "Banana", 0.59);
    cart.addItem(1, "Apple", 0.99); // Quantity of Apple should now be 2

    expect(cart.totalPrice).toBeCloseTo(2.57);
    expect(cart.itemNumber).toBe(3);

    cart.removeItem(1); // Quantity of Apple should decrease to 1

    expect(cart.totalPrice).toBeCloseTo(1.58);
    expect(cart.itemNumber).toBe(2);
  });

  test("addItem correctly adds and updates items", () => {
    cart.addItem(1, "Apple", 0.99);
    cart.addItem(2, "Banana", 0.59);
    cart.addItem(1, "Apple", 0.99); // Adding the same item should update the quantity

    const { items } = cart.check();
    expect(items).toEqual([
      { id: 1, name: "Apple", price: 0.99, quantity: 2 },
      { id: 2, name: "Banana", price: 0.59, quantity: 1 },
    ]);
  });

  test("removeItem correctly removes or decreases quantity of items", () => {
    cart.addItem(1, "Apple", 0.99);
    cart.addItem(1, "Apple", 0.99);
    cart.removeItem(1); // Should decrease quantity to 1

    const { items } = cart.check();
    expect(items).toEqual([{ id: 1, name: "Apple", price: 0.99, quantity: 1 }]);

    cart.removeItem(1); // Should remove the item completely
    expect(cart.check().items).toEqual([]);
  });

  test("check returns correct item number and total price", () => {
    cart.addItem(1, "Apple", 0.99);
    cart.addItem(2, "Banana", 0.59);
    const { itemNumber, total } = cart.check();

    expect(itemNumber).toBe(2);
    expect(total).toBeCloseTo(1.58);
  });
});
