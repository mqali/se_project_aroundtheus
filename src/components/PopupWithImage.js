import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(data) {
    const imagePopup = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    const imageTitle = this._popupElement.querySelector(".modal__title");
    imagePopup.src = data.link;
    imagePopup.alt = data.name;
    imageTitle.textContent = data.name;
    super.open();
  }
}
