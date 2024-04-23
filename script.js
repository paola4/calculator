class Stack {
  // The stack has two properties, the items in the stack and the stack size
  constructor() {
    this.items = [];
    this.size = 0;
  }
  // The push method receives a value and adds it to the "top" of the stack
  push(val) {
    this.items.push(val);
    this.size++;
  }
  // The pop method eliminates the element at the "top" of the stack and returns its value
  pop() {
    if (this.items.length == 0) {
      return "Underflow";
    }
    this.size--;
    return this.items.pop();
  }
  // The remove method eliminated the element at the "bottom" of the stack and returns its value
  remove() {
    if (this.items.length == 0) {
      return "Underflow";
    }
    this.size--;
    return this.items.shift();
  }
  // Returns the element at the "top" of the stack
  getTop() {
    return this.items[this.items.length - 1];
  }
  // Returns the element at the "bottom" of the stack
  getBottom() {
    return this.items[0];
  }
  // Returns the size of the stack
  size() {
    return this.size;
  }
  // Returns true if the stack is currently empty
  isEmpty() {
    return this.size === 0;
  }
}

// Basic Math Operator Functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  if (a === "Error" || b === "Error") {
    return "Error";
  }
  switch (operator) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "x":
      return multiply(a, b);
      break;
    case "/":
      if (b === 0) {
        return "Error"; // Catch division by zero
      }
      return divide(a, b);
      break;
  }
}
let numbers = [];
let operator = null;

// getInput() processes each button click on the calculator
function getInput() {
  const stack = new Stack();
  let current_number = "";

  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      let type = button.className;
      const input = { value: button.textContent, type: type };
      // Condition if the selected button is for the clear button
      if (type == "clear") {
        console.log("Clear button was selected");
        while (stack.size !== 0) {
          stack.pop();
        }
        numbers = [];
        operator = null;
        document.getElementById("display").textContent = 0;
      }
      // Conditions if the selected button is for a number
      if (type == "number") {
        console.log("A number was selected", input);

        // Case 1: No previous button selected
        if (stack.isEmpty()) {
          stack.push(input);
        }
        // Case 2: A number is entered immediately after an error (permitted)
        else if (
          numbers &&
          numbers[0] === "Error" &&
          stack.getTop().value === "="
        ) {
          while (stack.size !== 0) {
            stack.pop();
          }
          numbers = [];
          stack.push(input);
        }

        // Case 2: Previous button was for an operator
        else if (stack.getTop().type == "operator") {
          operator = stack.pop().value;
          stack.push(input);
        } else {
          stack.push(input);
        }
        current_number += input.value;
        document.getElementById("display").textContent = current_number;
      }
      // Conditions if the selected button is for an operator
      else if (type == "operator") {
        console.log("An operator was selected", input);
        // Case 1: No previous button selected
        if (stack.isEmpty()) {
          numbers.push(0);
        }
        // Case 2: Previous button was for a number
        else if (stack.getTop().type == "number") {
          // Concatenate all the digits on the stack
          let number = "";
          while (stack.size !== 0) {
            number += stack.remove().value;
          }
          numbers.push(number);
          current_number = "";
          // Push the new operator on the stack
          stack.push(input);
        }
        // Case 3: Previous button was for an operator
        else if (stack.getTop().type == "operator") {
          // Remove the previous operators; want only the current selection
          while (stack.size !== 0) {
            stack.pop();
          }
          stack.push(input);
        }

        // If two complete numbers have been entered, attempt to perform the requested operation
        if (numbers.length == 2) {
          if (numbers[0] == "Error" || numbers[1] == "Error") {
            numbers = ["Error"];
          } else {
            let a = parseFloat(numbers[0]);
            let b = parseFloat(numbers[1]);

            let result = operate(operator, a, b);
            numbers = [result];
          }
          // Display the result
          document.getElementById("display").textContent = numbers[0];
        }
      }
      console.log("Stack size: ", stack.size);
      console.log("Current Stack: ", stack.items);
      console.log("numbers: ", numbers);
      console.log("operator: ", operator);
    });
  });
}

getInput();
