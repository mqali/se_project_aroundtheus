import FormValidator from "../../components/FormValidator";
import Card from "../../components/Card";
import { initialCards, validationSettings } from "../utils/utils";
import "../pages/index.css";
import Popup from "../../components/Popup.js";

/* prettier-ignore */

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
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const previewPopup = document.querySelector(".js-preview-modal");
const previewImage = previewPopup.querySelector(".modal__preview-image");
const previewTitle = previewPopup.querySelector(".modal__title");

const addFormElement = addCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addFormElement);
addFormValidator.enableValidation();

function closeProfileModal() {
  closePopup(profileEditModal);
}
function closeCardModal() {
  closePopup(addCardModal);
}
function closePopUp() {
  closePopup(previewPopup);
}

function openModal() {
  openPopup(addCardModal);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", openPreviewModal);
  const cardElement = card.getView();
  cardListEl.prepend(cardElement);
}

const editProfilePopup = new PopupWithForm(
  "#edit-profile-modal",
  handleFormSubmit
);
const imagePopup = new PopupWithImage("#image-modal");

profileEditButton.addEventListener("click", function () {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editFormValidator.resetValidation();
  openPopup(profileEditModal);
});

const profileCloseButton = document.querySelector("#modal-exit-button");
const addCardCloseButton = addCardModal.querySelector(".modal__close");
const cardTitleInput = addCardFormElement.querySelector(".modal__card-title");
const cardUrlInput = addCardFormElement.querySelector(".modal__card-url");
const previewModalCloseButton = previewPopup.querySelector(".modal__close");

function handleAddCardFormsubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  cardTitleInput.value = "";
  cardUrlInput.value = "";
  addFormValidator.resetValidation();
  closeCardModal(addCardModal);
}

function openPreviewModal(imageSrc, imageAlt, cardTitle) {
  previewImage.src = imageSrc;
  previewImage.alt = imageAlt;
  previewTitle.textContent = cardTitle;
  openPopup(previewPopup);
}

profileCloseButton.addEventListener("click", function () {
  closeProfileModal();
});

previewModalCloseButton.addEventListener("click", function () {
  closePopUp();
});

profileEditForm.addEventListener("submit", function (edit) {
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

addCardModal.addEventListener("click", handleCardModalOverlay);

function handleCardModalOverlay(event) {
  if (event.target === addCardModal) {
    closePopup(addCardModal);
  }
}

profileEditModal.addEventListener("click", handleProfileModalOverlay);

function handleProfileModalOverlay(event) {
  if (event.target === profileEditModal) {
    closePopup(profileEditModal);
  }
}

previewPopup.addEventListener("click", handleImageModalOverlay);

function handleImageModalOverlay(event) {
  if (event.target === previewPopup) closePopup(previewPopup);
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
