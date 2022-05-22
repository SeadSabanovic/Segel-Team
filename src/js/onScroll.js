const nav = document.getElementsByClassName("nav")[0];
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    nav.classList.remove("scroll-down");
    nav.classList.remove("fill");
  } else {
    nav.classList.add("fill");
  }

  if (currentScroll > lastScroll) {
    nav.classList.add("scroll-down");
  }

  if (currentScroll < lastScroll) {
    nav.classList.remove("scroll-down");
  }

  lastScroll = currentScroll;
});
