const news = Array.of(...document.getElementsByClassName("news__container"));
const backdrop = document.getElementsByClassName("backdrop")[0];
const dialog = document.getElementsByTagName("dialog")[0];
const closeBtn = document.getElementsByClassName("news-dialog__close")[0];
const nav = document.getElementsByClassName("nav")[0];

for (let i = 0; i < news.length; i++) {
  news[i].addEventListener("click", () => {
    nav.classList.add("scroll-down");
    backdrop.classList.add("active");
    document.body.classList.add("no-scroll");
  });
}

dialog.addEventListener("click", (e) => {
  e.stopPropagation();
});

const closeDialog = (e) => {
  e.stopPropagation();
  backdrop.classList.remove("active");
  nav.classList.remove("scroll-down");
  document.body.classList.remove("no-scroll");
};

closeBtn.addEventListener("click", (e) => {
  // e.stopPropagation();
  closeDialog(e);
});

backdrop.addEventListener("click", (e) => {
  // e.stopPropagation();
  closeDialog(e);
});
