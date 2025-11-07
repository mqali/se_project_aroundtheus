/* prettier-ignore */

const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
  },

    {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
  },

      {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
  },

     {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
  },

      {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
  }
];

const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditform = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const previewPopup = document.querySelector(".js-preview-popup");
const previewImage = previewPopup.querySelector(".popup__preview-image");
const previewTitle = previewPopup.querySelector(".popup__title");
const closeButton = previewPopup.querySelector(".popup__close");

function closeProfileModal() {
  profileEditModal.classList.remove("modal__opened");
}
function closeCardModal() {
  addCardModal.classList.remove("modal__opened");
}
function closePopUp() {
  previewPopup.classList.remove("popup__opened");
}

function openModal() {
  addCardModal.classList.add("modal__opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const previewImageModalWindow = document.querySelector(".js-preview-popup");
  const cardImage = cardElement.querySelector(".card__image");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__trash-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardImageEl.addEventListener("click", function () {
    openPreviewModal(cardImageEl.src, cardImageEl.alt, cardTitleEl.textContent);
  });
  return cardElement;
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal__opened");
});

const profileCloseButton = document.querySelector("#modal-exit-button");
const addCardCloseButton = addCardModal.querySelector("#modal-exit-button");
const cardTitleInput = addCardFormElement.querySelector(".modal__card-title");
const cardUrlInput = addCardFormElement.querySelector(".modal__card-url");
const popUpCloseButton = document.querySelector(".popup__close");

function handleAddCardFormsubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeCardModal(addCardModal);
}

function openPreviewModal(imageSrc, imageAlt, cardTitle) {
  previewImage.src = imageSrc;
  previewImage.alt = imageAlt;
  previewTitle.textContent = cardTitle;
  const modal = document.querySelector(".js-preview-popup");
  modal.classList.add("popup__opened");
  console.log("Class added:", modal.classList.contains("popup__opened"));
}

profileCloseButton.addEventListener("click", function () {
  closeProfileModal();
});

popUpCloseButton.addEventListener("click", function () {
  closePopUp();
});

profileEditform.addEventListener("submit", function (edit) {
  edit.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeProfileModal();
});

addCardFormElement.addEventListener("submit", handleAddCardFormsubmit);

addNewCardButton.addEventListener("click", () => openModal());
addCardCloseButton.addEventListener("click", () => closeCardModal());

initialCards.forEach(function (cardData) {
  renderCard(cardData, cardListEl);
});

const removeCard = document.getElementById("add-card-modal");
removeCard.addEventListener("click", handleCard);

function handleCard(event) {
  if (event.target === removeCard) removeCard.classList.remove("modal__opened");
}

const removeProfile = document.getElementById("profile-edit-modal");
removeProfile.addEventListener("click", handleProfile);

function handleProfile(event) {
  if (event.target === removeProfile)
    removeProfile.classList.remove("modal__opened");
}

const removeImage = document.getElementById("preview-zoom");
removeImage.addEventListener("click", handleImage);

function handleImage(event) {
  if (event.target === removeImage)
    removeImage.classList.remove("popup__opened");
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") previewPopup.classList.remove("popup__opened");
});

function handleEscKey() {
  if (modalPreviews) {
  }
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const modalPreviews = document.querySelector(".modal__opened");
    if (modalPreviews) {
      modalPreviews.classList.remove("modal__opened");
    }
  }
});
