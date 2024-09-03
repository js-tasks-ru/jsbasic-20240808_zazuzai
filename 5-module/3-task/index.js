function initCarousel() {

  const carouselInner = document.querySelector('.carousel__inner');
  const carouselArrows = {
    left: document.querySelector('.carousel__arrow_left'),
    right: document.querySelector('.carousel__arrow_right')
  };
  const slides = document.querySelectorAll('.carousel__slide');

  if (slides.length === 0) return;

  const slideWidth = slides[0].offsetWidth;
  let currentSlide = 0;

  function updateTransform() {
    carouselInner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }

  function updateArrows() {

    carouselArrows.left.style.display = currentSlide === 0 ? 'none' : '';

    carouselArrows.right.style.display = currentSlide === slides.length - 1 ? 'none' : '';
  }

  carouselArrows.left.addEventListener('click', () => {

    if (currentSlide > 0) {
      currentSlide -= 1;
      updateTransform();
      updateArrows();
    }
  });

  carouselArrows.right.addEventListener('click', () => {

    if (currentSlide < slides.length - 1) {
      currentSlide += 1;
      updateTransform();
      updateArrows();
    }
  });

  updateTransform();
  updateArrows();
}

initCarousel();
