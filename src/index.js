import { initialCards } from './scripts/cards';
import './pages/index.css';
import  { deleteCard, likeCard, openCard } from './components/card';
import { openModal, closeModal } from './components/modal';


const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');
export const cardImagePopUp = document.querySelector('.popup__image');
export const cardPopUpCaption = document.querySelector('.popup__caption');
const newCardButton = document.querySelector('.profile__add-button');
const formElement = document.forms[0];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const formElementAdd = document.forms[1];
const linkInput = document.querySelector('.popup__input_type_url');
const cardNameInput = document.querySelector('.popup__input_type_card-name');


function createSingleCard(card, deleteCard, likeCard, openCard){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
 

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;


  deleteCard(cardElement);
  likeCard(cardElement);
  openCard(cardElement)

  return cardElement;
}

function renderCard(cards) {
  cards.forEach(card => cardContainer.append(createSingleCard(card, deleteCard, likeCard, openCard)));
}

renderCard(initialCards);

const editButton = document.querySelector('.profile__edit-button');
const editPopUp = document.querySelector('.popup_type_edit');
const newCardPopUp = document.querySelector('.popup_type_new-card');
export const cardPopUp = document.querySelector('.popup_type_image');
const deletePopUp = document.querySelectorAll('.popup__close');

editButton.addEventListener('click', function(){
  openModal(editPopUp);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})

newCardButton.addEventListener('click', function(){
  openModal(newCardPopUp);
})

deletePopUp.forEach(e => {
  e.addEventListener('click', function() {
    closeModal(e.parentElement.parentElement);
  })
})

document.addEventListener('click', function(e){
  if(!e.target.classList.contains('popup__content')){
    closeModal(e.target);
  }
});

document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){
    closeModal(cardPopUp);
  }
})

function handleFormSubmit(evt) {
    evt.preventDefault(); 


    const name = nameInput.value;
    const job = jobInput.value;


    profileName.textContent = name;
    profileJob.textContent = job;
    
    
    closeModal(formElement.closest('.popup'))
}

function handleFormSubmitAdd(evt) {
    evt.preventDefault(); 
    

    const cardLink = linkInput.value;
    const cardName = cardNameInput.value;


    const newCard = {
      name: cardName,
      link: cardLink,
    }

    const newRenderCard = createSingleCard(newCard, deleteCard, likeCard, openCard)
    cardContainer.prepend(newRenderCard)

    formElementAdd.reset()

    closeModal(formElementAdd.closest('.popup'))


    const cardImage = document.querySelector('.card__image');
  

    cardImage.addEventListener('click', function(e){
 
      cardImagePopUp.src = e.target.src;
      cardImagePopUp.alt = e.target.alt;
      cardPopUpCaption.textContent = e.target.alt;


      openModal(cardPopUp);
    });
}

formElement.addEventListener('submit', handleFormSubmit);
formElementAdd.addEventListener('submit', handleFormSubmitAdd);
