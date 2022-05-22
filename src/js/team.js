let loadedImageStream = 0;
const teamWrap = document.getElementsByClassName("team__wrap")[0];
const teamWrapCards = document.getElementsByClassName("team__wrap__cards")[0];
const loadMoreBtn = document.getElementsByClassName("team__cta")[0];
const teamUrl = "https://challenge-api.view.agentur-loop.com/api.php?";

let activeTeamFilter = "";
const teamFilters = document.getElementsByClassName("team__filters")[0];

const memberLimit = 5;
let loadedMembers = 0;
let lastMembersNumber = 0;
let page = 1;

teamFilters.addEventListener("click", (e) => {
  switch (e.composedPath()[0].innerHTML) {
    case "Show All": {
      changeFilter("");
      break;
    }
    case "Trim": {
      changeFilter("trim");
      break;
    }
    case "Tactic": {
      changeFilter("tactic");
      break;
    }
    case "Helmsmann": {
      changeFilter("helmsman");
      break;
    }
    default:
      break;
  }
});

function changeFilter(selected) {
  if (activeTeamFilter !== selected) {
    // Change active class on filters
    const filters = Array.of(...teamFilters.children);
    for (let i = 0; i < filters.length; i++) {
      if (selected == filters[i].dataset.filter) {
        filters[i].classList.add("active");
      } else {
        filters[i].classList.remove("active");
      }
    }
    // Reset Vars
    activeTeamFilter = selected;
    page = 1;
    teamWrapCards.textContent = "";
    loadedImageStream = 0;
    // Enable Load More
    document.getElementsByClassName("team__cta")[0].disabled = false;
    loadInitialTeam();
  }
}

function updateTeamWrapHeight() {
  teamWrap.style.height = `${teamWrapCards.getBoundingClientRect().height}px`;
}

const returnUrl = () => {
  return `
  ${teamUrl}
  page=${page}
  &limit=${memberLimit}
  ${activeTeamFilter !== "" ? "&duty=" + activeTeamFilter : ""}`;
};

const loadInitialTeam = () => {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", returnUrl(), true);

  xhr.onload = function () {
    if (xhr.status == 200) {
      appendNewMembers(JSON.parse(this.responseText).data);
    }
  };

  xhr.send();
};

const appendNewMembers = (data) => {
  loadedMembers += data.data.length;
  lastMembersNumber = data.data.length;

  for (let i = 0; i < data.data.length; i++) {
    // Create Card Element
    const newCard = document.createElement("div");
    newCard.setAttribute("class", "team__wrap__card loading");

    // Create Image Element
    const newImage = document.createElement("img");
    newImage.setAttribute("src", data.data[i].image);

    // Create Details Wrap
    const newDetailsWrap = document.createElement("div");
    newDetailsWrap.setAttribute("class", "team__wrap__card__details");

    // Member name (H3)
    const newName = document.createElement("h3");
    newName.setAttribute("class", "accent");
    newName.innerHTML = data.data[i].name;

    // Member Paragraph (p)
    const para = document.createElement("p");
    para.setAttribute("class", "dark");
    para.innerHTML = "A smooth sea never made a skilled sailor";

    // Add Details To New Card
    newDetailsWrap.append(newName, para);
    newCard.append(newImage, newDetailsWrap);

    // Mouseover logic for each card
    newCard.addEventListener("mouseover", (e) => {
      const card = e.composedPath()[1];
      const teamWrapEnd = teamWrapCards.getBoundingClientRect().right;
      const cardEnd = card.getBoundingClientRect().right;
      const cardWidth = card.getBoundingClientRect().width;

      if (cardEnd + cardWidth <= teamWrapEnd) {
        card.classList.add("open-right");
      } else {
        card.classList.add("open-left");
      }
    });

    // Mouseleave remove class
    newCard.addEventListener("mouseleave", (e) => {
      const card = e.composedPath()[0];
      card.classList.remove("open-left");
      card.classList.remove("open-right");
    });

    newImage.addEventListener("load", () => {
      handleLoadedImage();
    });

    teamWrapCards.appendChild(newCard);
  }
};

const handleLoadedImage = () => {
  loadedImageStream++;
  if (loadedImageStream === lastMembersNumber) {
    loadedImageStream = 0;

    updateTeamWrapHeight();
    const cards = Array.of(...document.getElementsByClassName("loading"));

    for (let i = 0; i < lastMembersNumber; i++) {
      setTimeout(() => {
        cards[i].classList.remove("loading");
        cards[i].classList.add("loaded");
      }, i * 100);
    }
  } else return null;
};

// Load More
loadMoreBtn.addEventListener("click", () => {
  page++;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", returnUrl(), true);

  xhr.onload = function () {
    if (xhr.status == 200) {
      const data = JSON.parse(this.responseText).data;

      if (data.meta.pagination.total_pages == data.meta.pagination.current_page)
        document.getElementsByClassName("team__cta")[0].disabled = true;

      appendNewMembers(data);
    }
  };

  xhr.send();
});

loadInitialTeam();
