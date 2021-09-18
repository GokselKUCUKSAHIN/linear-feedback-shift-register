function createRegister(size = 32) {
  return [...Array(size)].map(_ => 0 + (Math.random() > 0.5));
}

function shiftRight(register, feed = 0) {
  register.shift();
  register.push(feed);
}

function xor(register) {
  return register[0] ^ register[1];
}

function xor2(register) {
  return xor(register) ^ register[2];
}

function xor3(register) {
  return xor2(register) ^ register[3];
}

function xor4(register) {
  return xor3(register) ^ register[4];
}

function bitStringToNumber(bitstring) {
  const n = bitstring.length - 1;
  let sum = 0;
  for (let i = n, p = 0; i >= 0; i--, p++) {
    sum += bitstring[i] * Math.pow(2, p);
  }
  return sum;
}

function createLFSRGenerator(bitCount = 64) {
  const maxValue = Math.pow(2, bitCount);
  const register = createRegister(bitCount);
  return function () {
    const value = bitStringToNumber(register) / maxValue;
    shiftRight(register, xor4(register));
    return value;
  }
}


// DEMO
/*
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
*/

// DEMO 2
const limit = 500_000;
const rand = createLFSRGenerator(128);
let sum = 0;
for (let i = 0; i < limit; i++) {
  sum += rand();
}
console.log(sum / limit);