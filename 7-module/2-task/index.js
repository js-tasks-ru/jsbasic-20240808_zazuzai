import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {

    this.modalElement = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <span>&times;</span>
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);

    this.keydownHandler = this.onKeyDown.bind(this);
  }

  open() {

    document.body.appendChild(this.modalElement);
    document.body.classList.add('is-modal-open');

    this.modalElement.querySelector('.modal__close').addEventListener('click', () => this.close());
    document.addEventListener('keydown', this.keydownHandler);
  }

  close() {
    if (this.modalElement) {

      this.modalElement.remove();

      document.body.classList.remove('is-modal-open');

      document.removeEventListener('keydown', this.keydownHandler);
    }
  }

  setTitle(title) {
    const titleElement = this.modalElement.querySelector('.modal__title');
    if (titleElement) {
      titleElement.textContent = title;
    } else {
      throw new Error('Element with class "modal__title" not found');
    }
  }

  setBody(node) {
    const bodyElement = this.modalElement.querySelector('.modal__body');
    if (bodyElement) {
      bodyElement.innerHTML = '';
      bodyElement.appendChild(node);
    } else {
      throw new Error('Element with class "modal__body" not found');
    }
  }

  onKeyDown(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }
}
