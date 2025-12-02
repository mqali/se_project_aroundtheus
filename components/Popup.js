export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleOverlayEsc);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleOverlayEsc);
  }

  _handleEscClose() {
    this.close();
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (event) => {
      if (
        event.target === this._popupElement ||
        event.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });

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
