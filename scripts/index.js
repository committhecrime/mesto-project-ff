// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list')
// @todo: Функция создания карточки


function createSingleCard(card, deleteCard){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  deleteCard(cardElement);
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

