'use strict';
const bookCountText = document.querySelector('#bookCount');
const bookCompletedText = document.querySelector('#bookCompletedCount');
const bookTitleContainer = document.querySelector('#book-titles');
const bookCardContainer = document.querySelector('#main-container');
const addContainer = document.querySelector('#add-container');

const formSection = document.querySelector('.add-book-section');
const form = document.querySelector('.new-book-form');

const errorMessage = document.createElement('h4');
errorMessage.setAttribute('style', 'color: red; text-align: center;');
errorMessage.textContent = 'The Library already contains this book!';

var firebaseConfig = {
  apiKey: 'AIzaSyAQwET6RssBqpSN6q2lAWCBQUJMXqWuFRE',
  authDomain: 'javascript-library-d30d7.firebaseapp.com',
  projectId: 'javascript-library-d30d7',
  storageBucket: 'javascript-library-d30d7.appspot.com',
  messagingSenderId: '714567497522',
  appId: '1:714567497522:web:9d1912ac79fcd3523e492b',
  databaseURL:
    'https://javascript-library-d30d7-default-rtdb.europe-west1.firebasedatabase.app/',
  measurementId: 'G-TS9Q4SHFZY',
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
let database = firebase.database();

const dbRefObject = firebase.database().ref('myLibrary');
dbRefObject.on('value', (snap) => console.log(snap.val()));

function writeData(title, author, pages, readIt) {
  dbRefObject.once('value', addData);
  let book = {
    title: title,
    author: author,
    pages: pages,
    readIt: readIt,
  };
  if (title != '') {
    firebase.database().ref(`myLibrary`).push(book);
  }
  function addData(data) {
    let books = data.val();

    let keys = Object.keys(books);

    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];
      firebase
        .database()
        .ref('myLibrary/' + k)
        .update({ databook: i });
    }
  }
}

function deleteData(libraryDatabook) {
  dbRefObject.once('value', loopData);

  function loopData(data) {
    let books = data.val();
    let keys = Object.keys(books);
    console.log(keys);
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];
      let titles = books[k].title;
      let author = books[k].author;
      let databook = books[k].databook;
      if (databook === Number(libraryDatabook)) {
        let toDelete = firebase.database().ref('myLibrary/' + k);
        toDelete.remove();
      }
    }
  }
}

//array which stores book objects
let myLibrary = [];
let storedLibrary = [];

//book object constructor
class Book {
  constructor(title, author, pages, readIt) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readIt = readIt;
  }
}

function addBookToLibrary(title, author, pages, readIt) {
  const bookObject = new Book(title, author, pages, readIt);
  myLibrary.push(bookObject);
  addToLocalStorage();
}

function loopThroughArray() {
  //if there is no title, the book object is removed from array
  myLibrary = myLibrary.filter((a) => a.title !== '');
  //containers are reset so duplicates aren't made in the loop
  bookTitleContainer.querySelectorAll('*').forEach((n) => n.remove());
  bookCardContainer.querySelectorAll('*').forEach((n) => n.remove());
  bookCountText.textContent = 'Books: ' + myLibrary.length;
  //completedBooks contains all the books which have been read.
  let completedBooks = myLibrary.filter((a) => a.readIt === true);
  bookCompletedText.textContent = 'Completed Books: ' + completedBooks.length;
  let bookTitleArray = myLibrary.map((a) => a.title);
  let bookAuthorArray = myLibrary.map((a) => a.author);
  let bookPagesArray = myLibrary.map((a) => a.pages);

  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].dataBook = i;

    //following code adds elements to page.
    const bookTitle = document.createElement('h4');
    bookTitle.textContent = bookTitleArray[i];
    bookTitle.setAttribute('data-book', `${i}`);
    bookTitleContainer.appendChild(bookTitle);

    const bookCard = document.createElement('div');
    bookCard.classList.add('card');
    bookCardContainer.appendChild(bookCard);

    bookCard.setAttribute('data-book', `${i}`);

    const cardTitleContainer = document.createElement('div');
    cardTitleContainer.classList.add('card-title-container');
    bookCard.appendChild(cardTitleContainer);

    const cardTitleDiv = document.createElement('div');
    cardTitleDiv.classList.add('card-title-div');
    cardTitleContainer.appendChild(cardTitleDiv);

    const cardTitle = document.createElement('h4');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = 'Title: ' + bookTitleArray[i];
    cardTitleDiv.appendChild(cardTitle);

    const deleteButtonDiv = document.createElement('div');
    deleteButtonDiv.classList.add('card-delete-div');
    cardTitleContainer.appendChild(deleteButtonDiv);

    const bookCardBottom = document.createElement('div');
    bookCardBottom.classList.add('card-bottom');
    bookCardBottom.textContent = 'Author: ' + bookAuthorArray[i];
    bookCard.appendChild(bookCardBottom);

    const cardPages = document.createElement('div');
    cardPages.classList.add('card-pages');
    cardPages.textContent = bookPagesArray[i] + ' Pages';
    bookCard.appendChild(cardPages);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    bookCard.appendChild(buttonContainer);

    const readButton = document.createElement('button');
    readButton.classList.add('read-button');
    readButton.textContent = 'Read';
    readButton.setAttribute('data-book', `${i}`);

    if (myLibrary[i].readIt === true) {
      buttonContainer.appendChild(readButton);
      readButton.classList.remove('not-read-button');
      readButton.classList.add('read-button');
      readButton.textContent = 'Read';
    } else {
      buttonContainer.appendChild(readButton);
      readButton.classList.remove('read-button');
      readButton.classList.add('not-read-button');
      readButton.textContent = 'Not Read';
    }

    readButton.addEventListener('click', () => {
      //when button is clicked, if statement checks whether the text content of the button is 'Read' or 'Not read'
      if (readButton.textContent === 'Read') {
        readButton.classList.remove('read-button');
        readButton.classList.add('not-read-button');
        //If the text content is 'read', when clicked the button's class will be replaced with 'not-read-button' and the text content will be changed to not read.
        readButton.textContent = 'Not Read';
        for (i = 0; i < myLibrary.length; i++) {
          if (myLibrary[i].readIt === true) {
            //if the book object is has a property of readIt set to true, when the button is clicked it'll be set to false and the completed books array is updated.
            myLibrary[readButton.getAttribute('data-book')].readIt = false;
            let completedBooks = myLibrary.filter((a) => a.readIt === true);
            bookCompletedText.textContent =
              'Completed Books: ' + completedBooks.length;
            //changes value in localstorage to false;
            obj = JSON.parse(
              localStorage.getItem(
                `myLibrary${readButton.getAttribute('data-book')}`,
              ),
            );
            obj.readIt = false;
            localStorage.setItem(
              `myLibrary${readButton.getAttribute('data-book')}`,
              JSON.stringify(obj),
            );
          }
        }
      } else {
        readButton.classList.add('read-button');
        readButton.classList.remove('not-read-button');
        readButton.textContent = 'Read';
        for (i = 0; i < myLibrary.length; i++) {
          if (myLibrary[i].readIt === false) {
            myLibrary[readButton.getAttribute('data-book')].readIt = true;
            let completedBooks = myLibrary.filter((a) => a.readIt === true);
            bookCompletedText.textContent =
              'Completed Books: ' + completedBooks.length;
            obj = JSON.parse(
              localStorage.getItem(
                `myLibrary${readButton.getAttribute('data-book')}`,
              ),
            );
            obj.readIt = true;
            localStorage.setItem(
              `myLibrary${readButton.getAttribute('data-book')}`,
              JSON.stringify(obj),
            );
          }
        }
      }
    });

    const cardDeleteButton = document.createElement('button');
    cardDeleteButton.classList.add('card-delete');
    cardDeleteButton.setAttribute('data-book', `${i}`);
    deleteButtonDiv.appendChild(cardDeleteButton);

    cardDeleteButton.addEventListener('click', deleteBooks);

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('data-book', `${i}`);
    deleteButton.value = `${deleteButton.getAttribute('data-book')}`;
    console.log();
    //when delete button is clicked, it removes the book from all relevent fields.
    deleteButton.addEventListener('click', deleteBooks);
    function deleteBooks() {
      let click = deleteButton.value;
      click = Number(click);

      myLibrary = myLibrary.filter((a) => a.dataBook != click);
      let completedBooks = myLibrary.filter((a) => a.readIt === true);
      //book and completed book count is updated
      bookCompletedText.textContent =
        'Completed Books: ' + completedBooks.length;
      bookCountText.textContent = 'Books: ' + myLibrary.length;
      //deleted from local storage
      delete localStorage[`myLibrary${deleteButton.value}`];

      deleteData(deleteButton.value);
      const allBooks = document.querySelectorAll(
        `[data-book="${deleteButton.value}"]`,
      );
      //loops over all html elements with the same value as the delete button, then removes them.
      for (i = 0; i < allBooks.length; i++) {
        const oneBook = document.querySelector(
          `[data-book="${deleteButton.value}"]`,
        );
        oneBook.remove();
      }
    }
    deleteButton.classList.add('delete-button');
    bookTitle.appendChild(deleteButton);
  }
}
function addToLocalStorage() {
  for (let i = 0; i < myLibrary.length; i++) {
    //array item is converted to string so it can be stored in localStorage
    localStorage.setItem(`myLibrary${i}`, JSON.stringify(myLibrary[i]));
    storedLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  }
}
loopThroughArray();
const submitButton = document.createElement('button');
submitButton.classList.add('submit-button');
form.appendChild(submitButton);

const addButton = document.createElement('button');
addButton.classList.add('add-button');

addContainer.appendChild(addButton);

addButton.addEventListener('click', () => {
  formSection.setAttribute('style', 'visibility: visible');

  submitButton.addEventListener('click', () => {
    let bookTitleArray = myLibrary.map((a) => a.title);
    bookTitleArray = bookTitleArray.map((a) => a.toLowerCase());
    //when submit button is clicked, values of fields are put in variables which are then put in addBookToLibrary function
    let bookTitle = document.getElementById('book-title').value;
    bookTitle = bookTitle.trim();
    let bookAuthor = document.getElementById('book-author').value;
    bookAuthor = bookAuthor.trim();
    let bookPages = document.getElementById('book-pages').value;
    bookPages = Number(bookPages);
    let bookRead = '';
    //if statement checks which radio button is checked.
    if (document.getElementById('true').checked) {
      bookRead = true;
    } else if (document.getElementById('false').checked) {
      bookRead = false;
    }
    if (
      (bookTitle && bookAuthor && bookPages && bookRead === true) ||
      bookRead === false
    ) {
    }
    console.log(typeof bookTitle);
    console.log(bookTitleArray);
    console.log(!bookTitleArray.includes(bookTitle));
    if (!bookTitleArray.includes(bookTitle.toLowerCase())) {
      formSection.setAttribute('style', 'visibility: hidden');
      addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
      writeData(bookTitle, bookAuthor, bookPages, bookRead);
      document.getElementById('book-title').value = '';
      document.getElementById('book-author').value = '';
      document.getElementById('book-pages').value = '';
    } else {
      form.appendChild(errorMessage);
    }
    //values are then reset.

    loopThroughArray();
  });
});

const closeFormButton = document.querySelector('.close-form');

closeFormButton.addEventListener('click', () => {
  formSection.setAttribute('style', 'visibility: hidden');
  document.getElementById('book-title').value = '';
  document.getElementById('book-author').value = '';
  document.getElementById('book-pages').value = '';
  form.removeChild(errorMessage);
  document.getElementById('true').checked = false;
  document.getElementById('false').checked = false;
});

formSection.addEventListener('click', closeForm);

function closeForm(e) {
  console.log(e.target.toString());
  if (e.target.toString() === '[object HTMLElement]') {
    formSection.setAttribute('style', 'visibility: hidden');
  }
}

//loops over localStorage and creates bookObjects which are then pushed to the myLibrary array;
for (let i = 0; i < localStorage.length; i++) {
  storedLibrary = JSON.parse(localStorage.getItem(`myLibrary${i}`));

  if (storedLibrary != null && storedLibrary.title != '') {
    const bookObject = new Book(
      storedLibrary.title,
      storedLibrary.author,
      storedLibrary.pages,
      storedLibrary.readIt,
    );
    myLibrary.push(bookObject);
  }
}
function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}
hasDuplicates(myLibrary);

loopThroughArray();
console.log(localStorage);
