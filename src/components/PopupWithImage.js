import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    this._imageTitle = this._popupElement.querySelector(".modal__title");
  }

  open(data) {
    this._imagePopup.src = data.link;
    this._imagePopup.alt = data.name;
    this._imageTitle.textContent = data.name;
    super.open();
  }
}
