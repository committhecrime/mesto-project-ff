import { cardImagePopUp, cardPopUpCaption, cardTemplate } from "../index.js";
import { openModal } from "./modal";
import { cardPopUp } from "../index.js";

function createSingleCard(card, deleteCard, likeCard, openCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  deleteCard(cardElement);
  likeCard(cardElement);
  openCard(cardElement);

  return cardElement;
}

function deleteCard(cardElement) {
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });
}

function likeCard(cardElement) {
  const like = cardElement.querySelector(".card__like-button");
  like.addEventListener("click", function () {
    like.classList.toggle("card__like-button_is-active");
  });
}

function openCard(cardElement) {
  const openButton = cardElement.querySelector(".card__image");
  openButton.addEventListener("click", function (e) {
    cardImagePopUp.src = e.target.src;
    cardImagePopUp.alt = e.target.alt;
    cardPopUpCaption.textContent = e.target.alt;

    openModal(cardPopUp);
  });
}

export { deleteCard, likeCard, openCard, createSingleCard };
