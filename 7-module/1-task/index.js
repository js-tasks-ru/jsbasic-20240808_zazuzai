import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.elem = this.render();

    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    this.updateArrows();

    this.addEventListeners();
  }

  render() {
    const ribbon = document.createElement('div');
    ribbon.classList.add('ribbon');

    ribbon.innerHTML = `
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <div class="ribbon__inner">
        ${this.categories.map(category => `
          <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
        `).join('')}
      </div>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `;

    return ribbon;
  }

  addEventListeners() {
    this.arrowRight.addEventListener('click', () => {
      this.ribbonInner.scrollBy(350, 0);
    });

    this.arrowLeft.addEventListener('click', () => {
      this.ribbonInner.scrollBy(-350, 0);
    });

    this.ribbonInner.addEventListener('scroll', () => this.updateArrows());

    this.ribbonInner.addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.classList.contains('ribbon__item')) {
        this.selectCategory(event.target);
      }
    });
  }

  selectCategory(item) {
    const activeItem = this.elem.querySelector('.ribbon__item_active');
    if (activeItem) {
      activeItem.classList.remove('ribbon__item_active');
    }

    item.classList.add('ribbon__item_active');

    const categoryId = item.dataset.id;
    this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
      detail: categoryId,
      bubbles: true
    }));
  }

  updateArrows() {
    let scrollLeft = this.ribbonInner.scrollLeft;
    let scrollWidth = this.ribbonInner.scrollWidth;
    let clientWidth = this.ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft === 0) {
      this.arrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowLeft.classList.add('ribbon__arrow_visible');
    }

    if (scrollRight < 1) {
      this.arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowRight.classList.add('ribbon__arrow_visible');
    }
  }
}
