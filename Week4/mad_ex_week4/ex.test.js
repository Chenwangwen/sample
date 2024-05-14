/**
 * @file ex.test.js
 * @description Test suite for Week 4 exercises of the Mobile Application Development
 *              course. This file contains test cases that validate the correctness of
 *              the code written in the exercises. The tests are designed to assess
 *              the functionality of the implemented solutions against specified
 *              requirements and scenarios.
 * @author Larry Wen
 * @created [18/03/2024]
 *
 * NOTE: This file is not intended to be modified by the students. Alterations to this
 * test suite may result in inaccurate assessments of the exercise solutions.
 */
const fs = require("fs");

const {
  processData,
  createStudentFile,
  loadUserData,
  fetchUserDetails,
  checkState,
} = require("./questions");

const { students, selectStudents } = require("./data");

jest.setTimeout(500);

describe("Exercise 1: Callback Function in Asynchronous JavaScript with Error Handling", () => {
  test("calls back with an error for invalid data", (done) => {
    const start = Date.now();
    processData("this contains error", (err, result) => {
      const end = Date.now();
      const delta = end - start;
      try {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe("process data error");
        expect(result).toBeUndefined();
        expect(delta).toBeGreaterThanOrEqual(100);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  test("processes valid data asynchronously", (done) => {
    const start = Date.now();
    processData("valid data", (err, result) => {
      const end = Date.now();
      const delta = end - start;
      try {
        expect(err).toBeNull();
        expect(result).toBe("VALID DATA");
        expect(delta).toBeGreaterThanOrEqual(100);
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});

// Helper function to delete a file if it exists, used for cleanup
const deleteFileIfExists = (filename) => {
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
  }
};

describe("Exercise 2: Student File Creation with Validation in Node.js", () => {
  const filename = "tomSawyer.txt";
  const studentName = "Tom Sawyer";
  const studentInfo = {
    firstName: "Tom",
    surName: "Sawyer",
    age: 10,
    hobby: ["Eating", "Adventure"],
  };

  // Cleanup before each test
  beforeEach(() => {
    deleteFileIfExists(filename);
  });

  // Cleanup after all tests
  afterAll(() => {
    deleteFileIfExists(filename);
  });

  test("successfully creates a file when all conditions are met", (done) => {
    createStudentFile(studentName, studentInfo, (err) => {
      expect(err).toBeNull();
      // Check file content
      const content = fs.readFileSync(filename, "utf8");
      expect(content).toContain("Name: Tom Sawyer");
      expect(content).toContain("Age: 10");
      expect(content).toContain("Hobby: Eating, Adventure");
      done();
    });
  });

  test("returns an error if the file already exists", (done) => {
    // Create a file before test
    fs.writeFileSync(filename, "Initial content");
    createStudentFile(studentName, studentInfo, (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("File exists");
      done();
    });
  });

  test("returns an error if firstName and surName do not match the studentName", (done) => {
    const wrongInfo = { ...studentInfo, firstName: "Mark", surName: "Twain" };
    createStudentFile(studentName, wrongInfo, (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("Wrong Information");
      done();
    });
  });
});

describe("Exercise 3: Using Promises in Asynchronous JavaScript", () => {
  test("successfully fetches user data for a valid ID with a delay", () => {
    const start = Date.now();
    return loadUserData(1).then((data) => {
      const end = Date.now();
      const delta = end - start;
      expect(delta).toBeGreaterThanOrEqual(100); // Check for at least 100ms delay
      expect(data).toEqual({ id: 1, name: "John Doe" });
    });
  });

  test("fails to fetch user data for an invalid ID with a delay", () => {
    const start = Date.now();
    return loadUserData(-1).catch((error) => {
      const end = Date.now();
      const delta = end - start;
      expect(delta).toBeGreaterThanOrEqual(100); // Check for at least 100ms delay
      expect(error.message).toBe("Invalid user ID");
    });
  });
});

describe("Exercise 4: Fetching Data with Async/Await", () => {
  test("successfully fetches user details for a valid ID with a delay", async () => {
    const start = Date.now();
    const userDetails = await fetchUserDetails(1);
    const end = Date.now();
    const delta = end - start;

    expect(delta).toBeGreaterThanOrEqual(100); // Check for at least 100ms delay
    expect(userDetails).toEqual({ id: 1, name: "Jane Doe" });
  });

  test("throws an error for an invalid ID with a delay", async () => {
    const start = Date.now();
    await expect(fetchUserDetails(-1)).rejects.toThrow("Invalid user ID");
    const end = Date.now();
    const delta = end - start;

    expect(delta).toBeGreaterThanOrEqual(100); // Ensure delay is accounted for
  });
});

describe("Exercise 5: Check Tic-Tac-Toe Game State", () => {
  test('returns "X to play" for an empty board', () => {
    expect(checkState(["", "", "", "", "", "", "", "", ""])).toBe("X to play");
  });

  test('returns "O to play" when it is O\'s turn', () => {
    expect(checkState(["X", "", "", "", "", "", "", "", ""])).toBe("O to play");
  });

  test('returns "X wins" for X winning condition', () => {
    expect(checkState(["X", "X", "X", "", "", "", "", "", ""])).toBe("X wins");
    expect(checkState(["X", "", "", "X", "", "", "X", "", ""])).toBe("X wins"); // Diagonal win
  });

  test('returns "O wins" for O winning condition', () => {
    expect(checkState(["O", "O", "O", "", "", "", "", "", ""])).toBe("O wins");
    expect(checkState(["", "", "O", "", "O", "", "O", "", ""])).toBe("O wins"); // Column win
  });

  test('returns "It is a tie" for a tied game', () => {
    expect(checkState(["X", "O", "X", "X", "O", "O", "O", "X", "X"])).toBe(
      "It is a tie"
    );
  });
});
