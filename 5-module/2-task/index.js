function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  let textDiv = document.getElementById('text');

  button.addEventListener('click', () => {
    textDiv.hidden = !textDiv.hidden;
  });

}
