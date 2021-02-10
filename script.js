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
    
    for(i = 0; i < myLibrary.length; i++) {
        myLibrary[i].dataBook = i;
        console.log(myLibrary)
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

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container')
        bookCard.appendChild(buttonContainer)

        const readButton = document.createElement('button');
        readButton.classList.add('read-button');
        readButton.textContent = 'Read';
        readButton.setAttribute('data-book', `${i}`)

        const notReadButton = document.createElement('button');
        notReadButton.classList.add('not-read-button');
        notReadButton.textContent = 'Not Read';
        notReadButton.setAttribute('data-book', `${i}`)
        
        if(myLibrary[i].readIt === true) {
            buttonContainer.appendChild(readButton)
        }
        else {
            buttonContainer.appendChild(notReadButton)
        }

        readButton.addEventListener('click', () => {
            if(readButton.textContent === 'Read') {
                readButton.classList.remove('read-button')
                readButton.classList.add('not-read-button');
                readButton.textContent = 'Not Read';
                for(i = 0; i < myLibrary.length; i++) {
                    if(myLibrary[i].readIt === true) {
                        myLibrary[readButton.getAttribute('data-book')].readIt = false;
                        let completedBooks = myLibrary.filter(a => a.readIt === true);
                        bookCompletedText.textContent = 'Completed Books: ' + completedBooks.length;
                        console.log(myLibrary)
            
                    }
                }
                
            }
            else {
                readButton.classList.add('read-button');
                readButton.classList.remove('not-read-button')
                readButton.textContent = 'Read';
                for(i = 0; i < myLibrary.length; i++) {
                    if(myLibrary[i].readIt === false) {
                        myLibrary[readButton.getAttribute('data-book')].readIt = true;
                        let completedBooks = myLibrary.filter(a => a.readIt === true);
                        bookCompletedText.textContent = 'Completed Books: ' + completedBooks.length;
            
                    }
                }
            }
        })
        notReadButton.addEventListener('click', () => {
            if(notReadButton.textContent === 'Read') {
                notReadButton.classList.remove('read-button')
                notReadButton.classList.add('not-read-button');
                notReadButton.textContent = 'Not Read';
                for(i = 0; i < myLibrary.length; i++) {
                    if(myLibrary[i].readIt === true) {
                        myLibrary[notReadButton.getAttribute('data-book')].readIt = false;
                        let completedBooks = myLibrary.filter(a => a.readIt === true);
                        bookCompletedText.textContent = 'Completed Books: ' + completedBooks.length;
                        console.log(myLibrary)
            
                    }
                }
                
                
                
            }
            else {
                notReadButton.classList.add('read-button');
                notReadButton.classList.remove('not-read-button')
                notReadButton.textContent = 'Read';
                for(i = 0; i < myLibrary.length; i++) {
                    if(myLibrary[i].readIt === false) {
                        myLibrary[notReadButton.getAttribute('data-book')].readIt = true;
                        let completedBooks = myLibrary.filter(a => a.readIt === true);
                        bookCompletedText.textContent = 'Completed Books: ' + completedBooks.length;
            
                    }
                }
            }
        })
       
        
        
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('data-book', `${i}`)
        deleteButton.value = `${deleteButton.getAttribute('data-book')}`
        console.log()
        //when delete button is clicked, it removes the book from all relevent fields.
        deleteButton.addEventListener('click', () => {
            let click = deleteButton.value;
            click = Number(click)
            //if 
            myLibrary = myLibrary.filter(a => a.dataBook != click)
            let completedBooks = myLibrary.filter(a => a.readIt === true);
            //book and completed book count is updated
            bookCompletedText.textContent = 'Completed Books: ' + completedBooks.length;
            bookCountText.textContent = 'Books: ' + myLibrary.length;
            

           const allBooks = document.querySelectorAll(`[data-book="${deleteButton.value}"]`);
           //loops over all html elements with the same value as the delete button, then removes them.
           for(i = 0; i < allBooks.length; i++) {
               const oneBook = document.querySelector(`[data-book="${deleteButton.value}"]`);
                oneBook.remove();
           }

        })
        deleteButton.classList.add('delete-button');
        bookTitle.appendChild(deleteButton)


    }
    for(i = 0; i < myLibrary.length; i++) {
        

    }
}
loopThroughArray()

