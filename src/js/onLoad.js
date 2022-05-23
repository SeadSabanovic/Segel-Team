document.addEventListener("DOMContentLoaded", () => {
  document.getElementsByTagName("body")[0].classList.add("loaded");
  setTimeout(() => {
    const loader = document.getElementsByClassName("loader")[0];
    // Reset scroll position
    window.scroll(0, 0);
    // Remove Loader
    loader.classList.add("leaving");
    setTimeout(() => loader.remove(), 300);
  }, 300);
});
