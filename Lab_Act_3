// Laboratory Activity 3 - JavaScript Fundamentals 1
// ID Number: 2024-01-13788
// Base Number: 8

// -------------------
// Problem 1: Grade Calculator
// -------------------
function calculateGrade(score) {
    if (score >= 90 && score <= 100) return "A";
    else if (score >= 80) return "B";
    else if (score >= 70) return "C";
    else if (score >= 60) return "D";
    else return "F";
}

let score = 8 * 10 + 5; // 85
console.log("Problem 1: Grade Calculator");
console.log("Score:", score, "â†’ Grade:", calculateGrade(score));
console.log("");

// -------------------
// Problem 2: Star Pattern
// -------------------
showStars(10);

function showStars(rows) { 
  for (let row = 1; row <= rows; row++) {
    let pattern = ''; 
    for (let i = 0; i < row; i++)
      pattern += '*';
    console.log(pattern);
  }
}

// -------------------
// Problem 3: Prime Number Checker
// -------------------
function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

let numberToCheck = 8 + 10; // 18
console.log("Problem 3: Prime Checker");
console.log(numberToCheck, "is prime?", isPrime(numberToCheck));
console.log("");

// -------------------
// Problem 4: Multiplication Table
// -------------------
function multiplicationTable(n) {
    for (let i = 1; i <= 10; i++) {
        console.log(`${n} x ${i} = ${n * i}`);
    }
}

console.log("Problem 4: Multiplication Table of 8");
multiplicationTable(8);