class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._alt = cardData.alt;
    this._handleImageClick = handleImageClick;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._button.addEventListener("click", () => {
      this._button.classList.toggle("card__like-button_active");
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._element.remove();
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._link, this._name, this._alt);
    });
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();

    const likeButton = this._element.querySelector(".card__like-button");
    this._button = likeButton;

    const deleteCard = this._element.querySelector(".card__trash-button");
    this._cardDeleteButton = deleteCard;

    const cardImage = this._element.querySelector(".card__image");
    this._cardImageElement = cardImage;

    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._alt;

    this._setEventListeners();
    return this._element;
  }
}

export default Card;
