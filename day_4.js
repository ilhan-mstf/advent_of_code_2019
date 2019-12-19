function getDigitsAsArray(number) {
  let digits = [];
  let divisor = 10;
  
  while (true) {
    digits.push(number % divisor);
    number = Math.floor(number / divisor);
    if (number === 0) {
      break;
    }
  }

  return digits.reverse();
}

function digitsAreEqualOrIncreasing(digits) {
  let prev = digits[0];
  
  for (let i = 1, ii = digits.length; i != ii; i++) {
    if (digits[i] < prev) {
      return false;
    }
    prev = digits[i];
  }
  
  return true;
}

function thereAreSameAdjecentDigits(digits) {
  let prev = digits[0];
  
  for (let i = 1, ii = digits.length; i != ii; i++) {
    if (digits[i] == prev) {
      return true;
    }
    prev = digits[i];
  }
  
  return false;
}

function findPossibilities() {
  let possible = 0;
  
  for (let i = 244444; i <= 788999; i++) {
    let digits = getDigitsAsArray(i);
    if (digitsAreEqualOrIncreasing(digits) 
      && thereAreSameAdjecentDigits(digits)) {
      possible++;
    }
  }

  return possible;
}

//getDigitsAsArray(1231231);
//findPossibilities();

function getFreqMap(digits) {
  let freqMap = {};
  
  digits.forEach(digit => {
    if (!freqMap[digit]) {
      freqMap[digit] = 0;
    }
    freqMap[digit] += 1;
  });

  return freqMap;
}

function havingAtLeastOneTwoSameAdjacentGroup(freqMap) {
  for (const [key, freq] of Object.entries(freqMap)) {
    if (freq === 2) {
      return true;
    }
  }

  return false;
}

function findPossibilitiesOfPart2() {
  let possible = 0;
  
  for (let i = 244444; i <= 788999; i++) {
    let digits = getDigitsAsArray(i);
    if (digitsAreEqualOrIncreasing(digits) 
      && thereAreSameAdjecentDigits(digits)
      && havingAtLeastOneTwoSameAdjacentGroup(getFreqMap(digits))) {
      possible++;
    }
  }

  return possible;
}

console.log(havingAtLeastOneTwoSameAdjacentGroup(getFreqMap(getDigitsAsArray(112233))));
console.log(havingAtLeastOneTwoSameAdjacentGroup(getFreqMap(getDigitsAsArray(123444))));
console.log(havingAtLeastOneTwoSameAdjacentGroup(getFreqMap(getDigitsAsArray(111122))));

findPossibilitiesOfPart2();
