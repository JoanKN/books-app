/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
'use strict';

class BooksList {
  constructor() {
    this.template = Handlebars.compile(document.getElementById('template-book').innerHTML);
    this.booksList = document.querySelector('.books-list');
    this.filtersForm = document.querySelector('.filters');
    this.favoriteBooks = [];
    this.filters = [];

    this.render();
    this.initActions();
  }

  render() {
    for (const book of dataSource.books) {
      const rating = book.rating;
      const ratingWidth = rating * 10;
      const ratingBgc = this.determineRatingBgc(rating);

      book.ratingWidth = ratingWidth;
      book.ratingBgc = ratingBgc;

      const generatedHTML = this.template(book);
      const element = document.createElement('li');
      element.innerHTML = generatedHTML;

      const bookImage = element.querySelector('.book__image');
      bookImage.setAttribute('data-id', book.id);

      this.booksList.appendChild(element.firstElementChild);
    }
  }

  initActions() {
    this.booksList.addEventListener('dblclick', (event) => {
      event.preventDefault();
      const image = event.target.closest('.book__image');
      if (image && this.booksList.contains(image)) {
        const bookId = image.getAttribute('data-id');
        const isFavorite = this.favoriteBooks.includes(bookId);

        if (isFavorite) {
          image.classList.remove('favorite');
          this.favoriteBooks.splice(this.favoriteBooks.indexOf(bookId), 1);
        } else {
          image.classList.add('favorite');
          this.favoriteBooks.push(bookId);
        }
      }
    });

    this.filtersForm.addEventListener('click', (event) => {
      const clickedElement = event.target;

      if (
        clickedElement.tagName === 'INPUT' &&
        clickedElement.type === 'checkbox' &&
        clickedElement.name === 'filter'
      ) {
        const value = clickedElement.value;

        if (clickedElement.checked) {
          if (!this.filters.includes(value)) {
            this.filters.push(value);
          }
        } else {
          const index = this.filters.indexOf(value);
          if (index !== -1) {
            this.filters.splice(index, 1);
          }
        }

        this.filterBooks();
      }
    });
  }

  filterBooks() {
    for (const book of dataSource.books) {
      let shouldBeHidden = false;

      for (const filter of this.filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      const bookImage = document.querySelector(`.book__image[data-id="${book.id}"]`);
      if (bookImage) {
        if (shouldBeHidden) {
          bookImage.classList.add('hidden');
        } else {
          bookImage.classList.remove('hidden');
        }
      }
    }
  }

  determineRatingBgc(rating) {
    if (rating < 6) {
      return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    } else if (rating >= 6 && rating <= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      return 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
    } else {
      return '';
    }
  }
}

// 🔥 Tylko jedna linijka poza klasą:
const app = new BooksList();
