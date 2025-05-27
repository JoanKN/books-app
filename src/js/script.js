/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';
// Pobieranie referencji do szablonu i listy książek
const template = document.getElementById('template-book').innerHTML;
const booksList = document.querySelector('.books-list');

// Kompilacja szablonu Handlebars
const templateFunction = Handlebars.compile(template);

// Funkcja renderująca książki
function render() {
  // Iteracja po wszystkich książkach
  for (const book of dataSource.books) {
    // Generowanie HTML na podstawie szablonu i danych książki
    const generatedHTML = templateFunction(book);

    // Tworzenie elementu DOM
    const element = document.createElement('li');
    element.innerHTML = generatedHTML;

    // Dodanie wygenerowanego elementu do listy
    booksList.appendChild(element.firstElementChild);
  }
}

// Wywołanie funkcji renderującej
render();
}