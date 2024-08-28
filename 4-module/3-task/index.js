function highlight(table) {
  const rows = table.querySelectorAll('tbody tr');

  rows.forEach(row => {
    const statusCell = row.querySelector('td[data-available]');
    const genderCell = row.querySelector('td:nth-child(3)');
    const ageCell = row.querySelector('td:nth-child(2)');

    if (statusCell) {
      if (statusCell.dataset.available === 'true') {
        row.classList.add('available');
      } else if (statusCell.dataset.available === 'false') {
        row.classList.add('unavailable');
      }
    } else {
      row.setAttribute('hidden', '');
    }

    if (genderCell) {
      if (genderCell.textContent === 'm') {
        row.classList.add('male');
      } else if (genderCell.textContent === 'f') {
        row.classList.add('female');
      }
    }

    if (ageCell) {
      if (parseInt(ageCell.textContent) < 18) {
        row.style.textDecoration = 'line-through';
      }
    }
  });


}
