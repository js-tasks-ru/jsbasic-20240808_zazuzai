function factorial(n) {
  let result = 1;

  if (n === 0) {
      return 1;
  }

  for (let i = 2; i <= n; i++) {
      result *= i;
  }

  return result;
}
