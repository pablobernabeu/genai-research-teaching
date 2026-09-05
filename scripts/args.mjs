// A number from the command line, or a clear complaint. parseInt on a bad value gives
// NaN, which used to reach the page as 'NaN copies' on a print slip, or as an invalid
// CSS declaration the browser dropped without a word.

export function num(value, flag) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) {
    console.error(`${flag} needs a positive number, not ${JSON.stringify(value)}.`);
    process.exit(1);
  }
  return n;
}
