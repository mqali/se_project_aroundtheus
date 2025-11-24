import FormValidator from "../../components/FormValidator";
import Card from "../../components/Card";
import { initialCards, validationSettings } from "../utils/utils";
import "../pages/index.css";
import PopupWithImage from "../../components/PopupWithImage";
import Section from "../../components/Section.js";
import UserInfo from "../../components/UserInfo.js";
import PopupWithForm from "../../components/PopupWithForm.js";
/* prettier-ignore */

const profileEditForm = document.querySelector("#profile-edit-form");
const addFormElement = document.querySelector("#add-card-form");
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

const cardListEl = document.querySelector(".cards__list");

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
  cardListEl.prepend(cardElement);
}

const PopupImage = new PopupWithImage(".js-preview-modal");
PopupImage.setEventListeners();

function newPopup(link, name, alt) {
  PopupImage.open({ link, name, alt });
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
  addCardPopup.close(); // Add this line
});

addCardPopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();

  // Manually populate the form fields
  const nameInput = profileEditForm.querySelector('input[name="title"]');
  const jobInput = profileEditForm.querySelector('input[name="description"]');

  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.job;

  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
