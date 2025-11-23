import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const formInput = this._popupForm.querySelectorAll(".modal__form-input");
    const inputValues = {};
    formInput.forEach(function (Input) {
      inputValues[Input.name] = Input.value;
    });
    return inputValues;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    const formElement = this._popupForm;

    this.formSubmit = (event) => {
      event.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    };

    formElement.addEventListener("submit", this.formSubmit);
  }
}

/* for index.js
const newCardPopup = new PopupWithForm("#profile-edit-modal", () => {});
newCardPopup.open();
newCardPopup.close(); */
