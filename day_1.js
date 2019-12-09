// Question: https://adventofcode.com/2019/day/1
// Input file: https://adventofcode.com/2019/day/1/input

// Run this code on browser's console

// Part 1
let modules = document.querySelector('pre').innerText.split('\n').filter(m => m !== '')

function calculateFuel(mass) {
  return Math.floor(Number(mass) / 3) - 2;
}

modules.map(m => calculateFuel(m)).reduce((total, m) => total + m);


// Part 2
function calculateIncludingFuel(mass) {
  let total = 0;
  while (true) {
    mass = calculateFuel(mass);
    if (mass > 0) {
      total += mass;
    } else {
      break;
    }
  }
  return total;
}

modules.map(m => calculateIncludingFuel(m)).reduce((total, m) => total + m);
