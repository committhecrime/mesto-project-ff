// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;



// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');



// @todo: Функция создания карточки
function createCard(cardArray) {
  
  cardArray.forEach(element => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);


    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');


    cardImage.src = element.link;
    console.log(cardImage)
    cardImage.alt = element.name;
    cardTitle.textContent = element.name; 
    

    deleteCard(cardElement);
    renderCards(cardElement);
  });
  
}

createCard(initialCards);

// @todo: Функция удаления карточки

function deleteCard(cardElement) {
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function(e){
    cardElement.remove();
  });
}

// @todo: Вывести карточки на страницу
function renderCards(cardElement) {
  cardContainer.append(cardElement);
}

