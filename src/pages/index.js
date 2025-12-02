/* prettier-ignore */

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { initialCards, validationSettings } from "../utils/utils";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

const profileEditForm = document.querySelector("#profile-edit-form");
const addFormElement = document.querySelector("#add-card-form");
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addFormElement);
addFormValidator.enableValidation();

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", newPopup);
  const cardElement = card.getView();
  section.addItem(cardElement);
}

const popupImage = new PopupWithImage(".js-preview-modal");
popupImage.setEventListeners();

function newPopup(link, name, alt) {
  popupImage.open({ link, name, alt });
}

const userInfo = new UserInfo({
  profileName: ".profile__title",
  profileJob: ".profile__description",
});

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);
section.renderItems();

// Profile Edit Popup
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (inputData) => {
    userInfo.setUserInfo({
      name: inputData.title,
      job: inputData.description,
    });
    profileEditPopup.close();
  }
);
profileEditPopup.setEventListeners();

// Add Card Popup
const addCardPopup = new PopupWithForm("#add-card-modal", (inputData) => {
  const cardData = {
    name: inputData.title,
    link: inputData.link,
  };

  renderCard(cardData);

  addFormElement.reset();
  addFormValidator.resetValidation();
  addCardPopup.close();
});

addCardPopup.setEventListeners();

// Manually populate the form fields
const nameInput = profileEditForm.querySelector('input[name="title"]');
const jobInput = profileEditForm.querySelector('input[name="description"]');

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();

  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.job;

  editFormValidator.resetValidation();

  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
