/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');

    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th>Удалить</th>
      </tr>
    `;
    this.elem.appendChild(thead);

    const tbody = document.createElement('tbody');
    rows.forEach((row) => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button class="remove-btn">[X]</button></td>
      `;

      tr.querySelector('.remove-btn').addEventListener('click', () => {
        tr.remove();
      });

      tbody.appendChild(tr);
    });

    this.elem.appendChild(tbody);
  }
}
