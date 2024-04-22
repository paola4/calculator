// We create a class for the stack
class Stack {
  // The stack has three properties, the first node, the last node and the stack size
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

  remove() {
    if (this.items.length == 0) {
      return "Underflow";
    }
    this.size--;
    return this.items.shift();
  }
  getTop() {
    return this.items[this.items.length - 1];
  }

  getBottom() {
    return this.items[0];
  }

  size() {
    return this.size;
  }

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

// TO DO: Figure out how to make it so that, after an error, it will work if the next value is a number
// but will continue to give an error if the following sequence is an operator followed by anumber.
function getInput() {
  const stack = new Stack();
  let a = null;
  let b = null;

  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      let type = button.className;

      const input = { value: button.textContent, type: type };

      // Conditions if the selected button is for a number
      if (type == "number") {
        console.log("A number was selected", input);
        // Case 1: No previous button selected
        if (stack.isEmpty()) {
          stack.push(input);
        } else if (
          numbers &&
          numbers[0] === "Error" &&
          stack.getTop().value === "="
        ) {
          console.log("YES");
          console.log(stack.getTop().type);
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
      }
      // Conditions if the selected button is for an operator
      else if (type == "operator") {
        console.log("An operator was selected", input);
        // Case 1: No previous button selected
        if (stack.isEmpty()) {
          console.log("Empty stack");
          numbers.push(0);
        }
        // Case 2: Previous button was for a number
        else if (stack.getTop().type == "number") {
          console.log("Number type after an operator");
          // Concatenate all the digits on the stack
          let number = "";
          while (stack.size !== 0) {
            number += stack.remove().value;
          }
          numbers.push(number);
          // Push the new operator on the stack
          stack.push(input);
        }
        // Case 3: Previous button was for an operator
        else if (stack.getTop().type == "operator") {
          console.log("Operator type after an operator");
          // Remove the previous operators; want only the current selection

          while (stack.size !== 0) {
            stack.pop();
          }

          stack.push(input);
        }

        // If two complete numbers have been entered, attempt to perform the requested operation
        if (numbers.length == 2) {
          console.log(
            "Two numbers entered: ",
            numbers,
            " and one operator: ",
            operator
          );
          if (numbers[0] == "Error" || numbers[1] == "Error") {
            numbers = ["Error"];
          } else {
            let a = parseFloat(numbers[0]);
            let b = parseFloat(numbers[1]);

            let result = operate(operator, a, b);
            console.log("RESULT: ", result);
            numbers = [result];
          }
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
