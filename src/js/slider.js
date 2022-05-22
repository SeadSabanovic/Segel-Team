const next = document.getElementsByClassName("next")[0];
const prev = document.getElementsByClassName("prev")[0];
const slideWrap = document.querySelector(".custom-slider__wrap");
const gap = 64;
currentSlide = 0;

next.addEventListener("click", () => {
  if (currentSlide == 2) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  slideWrap.style.transform = `translate3d(calc((-100% * ${currentSlide}) - (${
    currentSlide * gap
  }px)), 0, 0)`;
});

prev.addEventListener("click", () => {
  if (currentSlide == 0) {
    currentSlide = 2;
  } else {
    currentSlide--;
  }
  slideWrap.style.transform = `translate3d(calc((-100% * ${currentSlide}) - (${
    currentSlide * gap
  }px)), 0, 0)`;
});
