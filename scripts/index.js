// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list')
// @todo: Функция создания карточки


function createSingleCard(card){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  function deleteCard(cardElement) {
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function(){
      cardElement.remove();
    });
  }
  // @todo: Вывести карточки на страницу
  function renderCard(cardElement) {
    cardContainer.append(cardElement);
  }

  deleteCard(cardElement);
  renderCard(cardElement);
}


function createCardsFromArray(cards) {
  cards.forEach(card => {
    createSingleCard(card);
  });
}

// @todo: Функция удаления карточки


createCardsFromArray(initialCards);