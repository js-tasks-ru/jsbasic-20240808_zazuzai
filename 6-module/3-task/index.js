import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlideIndex = 0;

    this.elem = this.render();
    this.initCarousel();
  }

  render() {
    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left" style="display: none;">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">
          ${this.slides.map(slide => this.renderSlide(slide)).join('')}
        </div>
      </div>
    `);

    return carousel;
  }

  renderSlide(slide) {
    return `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
  }

  initCarousel() {
    const carouselInner = this.elem.querySelector('.carousel__inner');
    const rightArrow = this.elem.querySelector('.carousel__arrow_right');
    const leftArrow = this.elem.querySelector('.carousel__arrow_left');

    rightArrow.addEventListener('click', () => this.moveSlide(1));

    leftArrow.addEventListener('click', () => this.moveSlide(-1));

    this.updateArrows();

    this.elem.addEventListener('click', (event) => {
      const button = event.target.closest('.carousel__button');
      if (button) {
        const slideId = button.closest('.carousel__slide').dataset.id;
        const addEvent = new CustomEvent('product-add', {
          detail: slideId,
          bubbles: true
        });
        this.elem.dispatchEvent(addEvent);
      }
    });
  }

  moveSlide(direction) {
    const carouselInner = this.elem.querySelector('.carousel__inner');
    const slideWidth = carouselInner.offsetWidth;

    this.currentSlideIndex += direction;
    const offset = -this.currentSlideIndex * slideWidth;

    carouselInner.style.transform = `translateX(${offset}px)`;

    this.updateArrows();
  }


  updateArrows() {
    const rightArrow = this.elem.querySelector('.carousel__arrow_right');
    const leftArrow = this.elem.querySelector('.carousel__arrow_left');

    if (this.currentSlideIndex === 0) {
      leftArrow.style.display = 'none';
    } else {
      leftArrow.style.display = '';
    }

    if (this.currentSlideIndex === this.slides.length - 1) {
      rightArrow.style.display = 'none';
    } else {
      rightArrow.style.display = '';
    }
  }
}
