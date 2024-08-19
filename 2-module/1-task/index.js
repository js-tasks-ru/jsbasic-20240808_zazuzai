function sumSalary(salaries) {
  let sum = 0;

  for (let key in salaries) {
    let salary = salaries[key];

    if (typeof salary === 'number' && isFinite(salary)) {
      sum += salary;
    }
  }

  return sum;
}
