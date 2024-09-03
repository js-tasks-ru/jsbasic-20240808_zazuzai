function hideSelf() {
  let btnHidden = document.querySelectorAll('.hide-self-button');

  btnHidden.forEach(button => {
    button.addEventListener('click', () => {
      button.hidden = true;
    });
  });

}
