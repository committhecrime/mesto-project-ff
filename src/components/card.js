import {cardImagePopUp, cardPopUpCaption} from '../index.js'
import { openModal } from './modal';
import { cardPopUp } from '../index.js';

function deleteCard(cardElement) {
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function(){
    cardElement.remove();
  });
}

function likeCard(cardElement) {
  const like = cardElement.querySelector('.card__like-button')
  like.addEventListener('click', function(){
    console.log(cardElement)
    like.classList.toggle('card__like-button_is-active');
  });
}

function openCard (cardElement) {
  const openButton = cardElement.querySelector('.card__image');
  openButton.addEventListener('click', function(e) {
    cardImagePopUp.src = e.target.src;
    cardPopUpCaption.textContent = e.target.alt;

    openModal(cardPopUp);
  })
}


export {deleteCard, likeCard, openCard};