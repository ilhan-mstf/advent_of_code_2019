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

function getArgsConsideringModes(opts) {
  if (!opts.parameterModes) {
    opts.parameterModes = [0, 0];
  }

  let arg1 = opts.parameterModes[1] ? opts.states[opts.index + 1] : opts.states[opts.states[opts.index + 1]];
  let arg2 = opts.parameterModes[0] ? opts.states[opts.index + 2] : opts.states[opts.states[opts.index + 2]];

  return [arg1, arg2];
}

function sum(opts) {
  let args = getArgsConsideringModes(opts);

  opts.states[opts.states[opts.index + 3]] = args[0] + args[1];
  opts.index += 4;
  return opts;
}

function multiply(opts) {
  let args = getArgsConsideringModes(opts);

  opts.states[opts.states[opts.index + 3]] = args[0] * args[1];
  opts.index += 4;
  return opts;
}

function read(opts) {
  opts.states[opts.states[opts.index + 1]] = 5;
  opts.index += 2;
  return opts;
}

function print(opts) {
  let args = getArgsConsideringModes(opts);

  console.log(args[0]);
  opts.index += 2;
  return opts;
}

function jumpIfTrue(opts) {
  let args = getArgsConsideringModes(opts);
  
  if (args[0] !== 0) {
    opts.index = args[1];
  } else {
    opts.index += 3;
  }

  return opts;
}

function jumpIfFalse(opts) {
  let args = getArgsConsideringModes(opts);
  
  if (args[0] === 0) {
    opts.index = args[1];
  } else {
    opts.index += 3;
  }

  return opts;
}

function lessThan(opts) {
  let args = getArgsConsideringModes(opts);

  opts.states[opts.states[opts.index + 3]] = args[0] < args[1] ? 1 : 0;

  opts.index += 4;
  return opts;
}

function equals(opts) {
  let args = getArgsConsideringModes(opts);

  opts.states[opts.states[opts.index + 3]] = args[0] === args[1] ? 1 : 0;

  opts.index += 4;
  return opts;
}

function parseOperator(opts) {
  opts.operator = opts.states[opts.index];
  opts.parameterModes = [];
    
  if (opts.operator > 99) {
    opts.parameterModes = getDigitsAsArray(opts.operator);
    if (opts.parameterModes.length == 3) {
      opts.parameterModes.unshift(0);
    }
    opts.operator = opts.parameterModes[opts.parameterModes.length - 1];
  }

  return opts;
}

function handleOperator(opts) {
  if (opts.operator === 1) {
    sum(opts);
  } else if (opts.operator === 2) {
    multiply(opts);
  } else if (opts.operator === 3) {
    read(opts);
  } else if (opts.operator === 4) {
    print(opts);
  } else if (opts.operator === 5) {
    jumpIfTrue(opts);
  } else if (opts.operator === 6) {
    jumpIfFalse(opts);
  } else if (opts.operator === 7) {
    lessThan(opts);
  } else if (opts.operator === 8) {
    equals(opts);
  } else if (opts.operator === 99) {
    console.log("halt");
    opts.halt = true;
  } else {
    throw Error("Unhandled operator " + opts.operator);
  }
  return opts;
}

function calculateGravity(states) {
  let opts = {
    index: 0,
    operator: 0,
    parameterModes: [],
    states: states,
    halt: false
  }

  while (!opts.halt) {
    parseOperator(opts);
    handleOperator(opts);
  }

  return opts.states[0];
}

//calculateGravity([3,0,4,0,99]);
calculateGravity([3,225,1,225,6,6,1100,1,238,225,104,0,1102,91,92,225,1102,85,13,225,1,47,17,224,101,-176,224,224,4,224,1002,223,8,223,1001,224,7,224,1,223,224,223,1102,79,43,225,1102,91,79,225,1101,94,61,225,1002,99,42,224,1001,224,-1890,224,4,224,1002,223,8,223,1001,224,6,224,1,224,223,223,102,77,52,224,1001,224,-4697,224,4,224,102,8,223,223,1001,224,7,224,1,224,223,223,1101,45,47,225,1001,43,93,224,1001,224,-172,224,4,224,102,8,223,223,1001,224,1,224,1,224,223,223,1102,53,88,225,1101,64,75,225,2,14,129,224,101,-5888,224,224,4,224,102,8,223,223,101,6,224,224,1,223,224,223,101,60,126,224,101,-148,224,224,4,224,1002,223,8,223,1001,224,2,224,1,224,223,223,1102,82,56,224,1001,224,-4592,224,4,224,1002,223,8,223,101,4,224,224,1,224,223,223,1101,22,82,224,1001,224,-104,224,4,224,1002,223,8,223,101,4,224,224,1,223,224,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,8,226,677,224,102,2,223,223,1005,224,329,1001,223,1,223,1007,226,226,224,1002,223,2,223,1006,224,344,101,1,223,223,108,226,226,224,1002,223,2,223,1006,224,359,1001,223,1,223,107,226,677,224,102,2,223,223,1006,224,374,101,1,223,223,8,677,677,224,102,2,223,223,1006,224,389,1001,223,1,223,1008,226,677,224,1002,223,2,223,1006,224,404,101,1,223,223,7,677,677,224,1002,223,2,223,1005,224,419,101,1,223,223,1108,226,677,224,1002,223,2,223,1005,224,434,101,1,223,223,1108,226,226,224,102,2,223,223,1005,224,449,1001,223,1,223,107,226,226,224,102,2,223,223,1005,224,464,101,1,223,223,1007,677,677,224,102,2,223,223,1006,224,479,101,1,223,223,1007,226,677,224,102,2,223,223,1005,224,494,1001,223,1,223,1008,226,226,224,1002,223,2,223,1005,224,509,1001,223,1,223,1108,677,226,224,1002,223,2,223,1006,224,524,1001,223,1,223,108,677,677,224,1002,223,2,223,1005,224,539,101,1,223,223,108,226,677,224,1002,223,2,223,1005,224,554,101,1,223,223,1008,677,677,224,1002,223,2,223,1006,224,569,1001,223,1,223,1107,677,677,224,102,2,223,223,1005,224,584,1001,223,1,223,7,677,226,224,102,2,223,223,1005,224,599,1001,223,1,223,8,677,226,224,1002,223,2,223,1005,224,614,1001,223,1,223,7,226,677,224,1002,223,2,223,1006,224,629,101,1,223,223,1107,677,226,224,1002,223,2,223,1005,224,644,1001,223,1,223,1107,226,677,224,102,2,223,223,1006,224,659,1001,223,1,223,107,677,677,224,1002,223,2,223,1005,224,674,101,1,223,223,4,223,99,226]);

// Part 2
//calculateGravity([3,9,8,9,10,9,4,9,99,-1,8]);
//calculateGravity([3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]);
