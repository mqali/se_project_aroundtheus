export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
  }

  _handleEscClose() {
    this.close();
  }

  setEventListeners() {
    const closeButton = this._popupElement.querySelector(".modal__close");
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    }

    // Handle overlay click
    this._handleOverlayClick = (event) => {
      if (event.target === this._popupElement) {
        this.close();
      }
    };
    this._popupElement.addEventListener("click", this._handleOverlayClick);

    // Handle Escape key
    this._handleOverlayEsc = (event) => {
      if (event.key === "Escape") {
        this._handleEscClose();
      }
    };
    document.addEventListener("keydown", this._handleOverlayEsc);
  }
}
