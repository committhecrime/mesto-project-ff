import { initialCards } from './scripts/cards';
import './pages/index.css';
import  { toggleLikeClass } from './card';



const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки


function createSingleCard(card, deleteCard){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  deleteCard(cardElement);

  likeButton.addEventListener('click', function() {
    toggleLikeClass(likeButton);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function(){
    cardElement.remove();
  });
}


function renderCard(cards) {
  cards.forEach(card => cardContainer.append(createSingleCard(card, deleteCard)));
}

renderCard(initialCards);

document.addEventListener('click', function(evt){
console.log(evt.target);
})



function openPopUp(popup) { 
  popup.classList.add('popup_is-opened');
}
function closePopUp(popup) { popup.classList.remove('popup_is-opened');}

const editButton = document.querySelector('.profile__edit-button');
const editPopUp = document.querySelector('.popup_type_edit');
const newCardButton = document.querySelector('.profile__add-button');
const newCardPopUp = document.querySelector('.popup_type_new-card');
const cardButtons = document.querySelectorAll('.card__image');
const cardPopUp = document.querySelector('.popup_type_image');
const deletePopUp = document.querySelectorAll('.popup__close');


editButton.addEventListener('click', function(){
  openPopUp(editPopUp);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})

newCardButton.addEventListener('click', function(){
  openPopUp(newCardPopUp);
})

cardButtons.forEach(card => {
  card.addEventListener('click', function(e) {
    const cardImagePopUp = document.querySelectorAll('.popup__image');
    const cardPopUpCaption = document.querySelectorAll('.popup__caption');
    
    cardImagePopUp.forEach(card => {
        card.src = e.target.src;
    })

    cardPopUpCaption.forEach(caption => {
      caption.textContent = e.target.alt;
    })

    openPopUp(cardPopUp);
  })
})

deletePopUp.forEach(e => {
  e.addEventListener('click', function() {
    closePopUp(e.parentElement.parentElement);
  })
})


document.addEventListener('click', function(e){
  if(!e.target.classList.contains('popup_is-opened')){
    closePopUp(e.target);
  }
});



const formElement = document.forms[0];// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name')// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_type_description')// Воспользуйтесь инструментом .querySelector()
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    
    
    // Получите значение полей jobInput и nameInput из свойства value
    const name = nameInput.value;
    const job = jobInput.value;

    
    // Выберите элементы, куда должны быть вставлены значения полей
    
    profileName.textContent = name;
    profileJob.textContent = job;
    // Вставьте новые значения с помощью textContent
    closePopUp(formElement.closest('.popup'))

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);


const formElementAdd = document.forms[1];
// Находим поля формы в DOM
const linkInput = document.querySelector('.popup__input_type_url')// Воспользуйтесь инструментом .querySelector()
const cardNameInput = document.querySelector('.popup__input_type_card-name')// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmitAdd(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const cardLink = linkInput.value;
    const cardName = cardNameInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const newCard = {
      name: cardName,
      link: cardLink,
    }


    initialCards.push(newCard);
    const newRenderCard = createSingleCard(newCard, deleteCard)
    cardContainer.prepend(newRenderCard)

    linkInput.value = '';
    cardNameInput.value = '';

    closePopUp(formElementAdd.closest('.popup'))


    const cardImage = document.querySelector('.card__image');
  

    cardImage.addEventListener('click', function(e){
      
      const cardImagePopUp = document.querySelector('.popup__image');
      const cardPopUpCaption = document.querySelector('.popup__caption');
 
      cardImagePopUp.src = e.target.src;
      cardPopUpCaption.textContent = e.target.alt;


      openPopUp(cardPopUp);
    })
    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementAdd.addEventListener('submit', handleFormSubmitAdd);

