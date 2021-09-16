function createRegister(size = 32) {
  return [...Array(size)].map(_ => 1 * (Math.random() > 0.5));
}

function shiftRight(register) {
  const xor = register[0] ^ register[1];
  register.shift();
  register.push(xor);
}

function bitStringToNumber(bitstring) {
  const n = bitstring.length - 1;
  let sum = 0;
  for (let i = n, p = 0; i >= 0; i--, p++) {
    sum += bitstring[i] * Math.pow(2, p);
  }
  return sum;
}

function createLFSRGenerator(bitCount = 64){
  const maxValue = Math.pow(2, bitCount);
  const register = createRegister(bitCount);
  return function() {
    const value = bitStringToNumber(register) / maxValue;
    shiftRight(register);
    return value; 
  }
}

// DEMO

const bitCount = 512;
const maxValue = Math.pow(2, bitCount);
const len = 100_000;
const register = createRegister(bitCount);
let sum = 0;
for (let i = 0; i < len; i++) {
  sum += bitStringToNumber(register) / maxValue;
  shiftRight(register);
}
console.log(sum / len); // Should be ~0.5

// DEMO 2

const rand = createLFSRGenerator();
let sum = 0;
for (let i = 0; i < 100_000; i++) {
  sum += rand();
}
console.log(sum / 100_000)