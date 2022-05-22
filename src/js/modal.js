const news = Array.of(...document.getElementsByClassName("news__container"));
const backdrop = document.getElementsByClassName("backdrop")[0];
const dialog = document.getElementsByTagName("dialog")[0];
console.log(dialog);

for (let i = 0; i < news.length; i++) {
  news[i].addEventListener("click", () => {
    // Animate Backdrop & Dialog
    /* const backdrop = document.createElement("div");
    backdrop.classList.add("backdrop");

    const dialog = document.createElement("dialog");
    dialog.classList.add("news-dialog");
    dialog.open = true;

    backdrop.appendChild(dialog);
    document.body.classList.add("no-scroll");
    document.body.appendChild(backdrop); */
  });
}

dialog.addEventListener("click", (e) => {
  e.stopPropagation();
});

backdrop.addEventListener("click", () => {
  backdrop.remove();
});

const closeDialog = () => {};

const openDialog = () => {};
