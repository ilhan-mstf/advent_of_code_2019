// Question: https://adventofcode.com/2019/day/1
// Input file: https://adventofcode.com/2019/day/1/input

// Run this code on browser's console
let modules = document.querySelector("pre").innerText.split('\n').filter(m => m !== "")
modules.map(m => Math.floor(Number(m) / 3) - 2).reduce((total, m) => total + m)
