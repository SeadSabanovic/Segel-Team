const nav = document.getElementsByClassName("nav")[0];
const hamburger = document.getElementsByClassName("nav__menu-toggle")[0];
const backdrop = document.getElementsByClassName("nav__backdrop")[0];
console.log(backdrop);
let navActive = false;

//Toggle Mobile Nav
hamburger.addEventListener("click", () => {
  navActive = !navActive;
  hamburger.classList.toggle("active");
  if (navActive) {
    nav.classList.add("mobile-active");
    document.body.classList.add("no-scroll");
  } else closeMobile();
});

const closeMobile = () => {
  console.log("ran");
  nav.classList.remove("mobile-active");
  document.body.classList.remove("no-scroll");
  hamburger.classList.remove("active");
  navActive = false;
};

backdrop.addEventListener("click", (e) => {
  e.stopPropagation();
  closeMobile();
});
