let states = document.querySelector("pre").innerText.split(",").map(state => Number(state));
states[1] = 12
states[2] = 2

function sum(states, index) {
  states[states[index + 3]] = states[states[index + 1]] + states[states[index + 2]]
}

function multiply(states, index) {
  states[states[index + 3]] = states[states[index + 1]] * states[states[index + 2]]
}

function calculateGravity(states) {
  let index = 0;
  let operator;

  while (true) {
    operator = states[index];
    if (operator === 1) {
      sum(states, index)
    } else if (operator === 2) {
      multiply(states, index)
    } else if (operator === 99) {
      break;
    } else {
      throw Error("Unhandled operator " + operator);
    }
    index +=4;
    console.log(states);
  }
  return states[0];
}

// Part 1
calculateGravity(states);

// Part 2
states = document.querySelector("pre").innerText.split(",").map(state => Number(state));

// Difference between goal and first run 19690720 - 3562624 = 16128096
// When states[1] increased to 13 from 12, the output increases 230400

// When diff / increase of first index will give us the value of first index
// 16128096 / 230400 = 70.00041666666667
// states[1] += 70
// When you run it with updated states[1] value should be 19690624
// diff between goal and final state is 19690720 - 19690624 = 96
// states[2] += 96 
