import { cardImagePopUp, cardPopUpCaption, cardTemplate, onDelete } from "../index.js";
import { openModal } from "./modal";
import { cardPopUp } from "../index.js";

function createSingleCard(card, deleteCard, likeCard, openCard, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const like = cardElement.querySelector(".card__like-button");
  const likeElement = document.querySelector(".card__like-number");


  
  cardElement.id = card._id;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  let likes = card.likes;

 
  
  function deleteCard() {
    cardElement.remove();
  };
/*
  function checkCardLikes () {
    return likes.some((like) => like._id === userId);
  }


    const setLikeStatus = () => {
      const isLiked = checkCardLikes();
      if (isLiked) {
        like.classList.add("card__like-button_is-active");
      } else {
        like.classList.remove("card__like-button_is-active");
      }
      likeElement.textContent = likes.length;
    };

    setLikeStatus();

    */

  likeCard(cardElement);
  openCard(cardElement);


    function checkDeleteButton() {
      if(card.hasOwnProperty("owner")){
        if (card.owner._id !== userId) {
        deleteButton.style.visibility = "hidden";
      }
      }
    }

  checkDeleteButton();

  deleteButton.addEventListener('click', () => {
    onDelete(card._id, deleteCard)
  })


  return cardElement;
}

function deleteCard(cardElement) {
  
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
