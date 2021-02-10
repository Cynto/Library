const bookCountText = document.querySelector('#bookCount');
const bookCompletedText = document.querySelector('#bookCompletedCount');
const bookTitleContainer = document.querySelector('#book-titles');
const bookCardContainer = document.querySelector('#main-container')
//array which stores book objects
let myLibrary = [];


//book object constructor
function Book(title, author, pages, readIt) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readIt = readIt;
}

function addBookToLibrary(title, author, pages, readIt) {
    
    const bookObject =  new Book(title, author, pages, readIt);
    myLibrary.push(bookObject);
}
addBookToLibrary('Harry Potter', 'JK Rowling', 500, true);
addBookToLibrary('Harry Potter 2', 'JK Rowling', 500, false);

function loopThroughArray() {
    bookCountText.textContent = 'Books: ' + myLibrary.length;
    //completedBooks contains all the books which have been read.
    let completedBooks = myLibrary.filter(a => a.readIt === true);
    bookCompletedText.textContent = 'Completed Books: ' + completedBooks.length;
    let bookTitleArray = myLibrary.map(a => a.title);
    let bookAuthorArray = myLibrary.map(a => a.author);
    let bookPagesArray = myLibrary.map(a => a.pages);
    console.log(bookPagesArray)
    for(i = 0; i < myLibrary.length; i++) {
        
        const bookTitle = document.createElement('h4');
        bookTitle.textContent = bookTitleArray[i]
        bookTitle.setAttribute('data-book', `${i}`)
        bookTitleContainer.appendChild(bookTitle);

        const bookCard = document.createElement('div');
        bookCard.classList.add('card');
        bookCardContainer.appendChild(bookCard);
        
        bookCard.setAttribute('data-book', `${i}`)

        const bookCardTitle = document.createElement('div');
        bookCardTitle.classList.add('card-title');
        bookCardTitle.textContent = bookTitleArray[i]
        bookCard.appendChild(bookCardTitle)

        const bookCardBottom = document.createElement('div');
        bookCardBottom.classList.add('card-bottom');
        bookCard.appendChild(bookCardBottom)

        const cardBottomLeft = document.createElement('div');
        cardBottomLeft.classList.add('card-bottom-left');
        cardBottomLeft.textContent = bookAuthorArray[i]
        bookCardBottom.appendChild(cardBottomLeft)

        const cardBottomRight = document.createElement('div');
        cardBottomRight.classList.add('card-bottom-right');
        cardBottomRight.textContent = bookPagesArray[i] + ' Pages'
        bookCardBottom.appendChild(cardBottomRight)

        const books = document.querySelector(`[data-book="${i}"]`)
        console.log(books)
        const deleteButton = document.createElement('button');
        //when delete button is clicked, it removes the book from all relevent fields.
        deleteButton.addEventListener('click', () => {
            console.log(bookTitleArray)
            books.remove();
            console.log(books)
            myLibrary.splice(myLibrary[i], 1);
            bookTitleArray.splice(bookTitleArray[i], 1);
            console.log(myLibrary)
            let completedBooks = myLibrary.filter(a => a.readIt === true);
            bookCompletedText.textContent = 'Completed Books: ' + completedBooks.length;

            bookTitleContainer.removeChild(bookTitle)
            bookCountText.textContent = 'Books: ' + myLibrary.length;
            bookCompletedText.textContent = 'Completed Books: ' + completedBooks.length;

        })
        deleteButton.classList.add('delete-button');
        bookTitle.appendChild(deleteButton)


    }
    for(i = 0; i < myLibrary.length; i++) {
        

    }
}
loopThroughArray()

