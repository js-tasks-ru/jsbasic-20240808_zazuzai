export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = this._createSlider();
    this._initSlider();
  }

  _createSlider() {
    const slider = document.createElement('div');
    slider.classList.add('slider');

    slider.innerHTML = `
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps"></div>
    `;

    const stepsContainer = slider.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement('span');
      if (i === this.value) {
        step.classList.add('slider__step-active');
      }
      stepsContainer.appendChild(step);
    }

    return slider;
  }

  _initSlider() {
    this.elem.addEventListener('click', (event) => this._onClick(event));
    this._updateSliderUI();
  }

  _onClick(event) {
    const sliderRect = this.elem.getBoundingClientRect();
    const clickPosition = event.clientX - sliderRect.left;
    const relativeClickPosition = clickPosition / this.elem.offsetWidth;
    const segments = this.steps - 1;
    const approximateValue = relativeClickPosition * segments;
    const newValue = Math.round(approximateValue);

    this.value = newValue;

    this._updateSliderUI();

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  _updateSliderUI() {
    const valuePercents = (this.value / (this.steps - 1)) * 100;

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    const sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.textContent = this.value;

    const steps = this.elem.querySelectorAll('.slider__steps span');
    steps.forEach((step, index) => {
      step.classList.toggle('slider__step-active', index === this.value);
    });
  }
}
