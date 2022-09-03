let mylibrary = [];

const addBookFormButton = document.getElementById('add').addEventListener('click', bookFormModal)
const addBookFormModal = document.getElementById('book-form-container')
const closeBookForm = document.getElementById('close-button').addEventListener('click', closeForm)
const openFormOverlay = document.getElementById('overlay')
const addBookForm = document.getElementById('book-form')
const addBookButton = document.getElementById('add-book').addEventListener('click', addBookToLibrary)
const bookLibrary = document.getElementById('books')

// inputs

const bookTitle = document.getElementById('book-title')
const bookAuthor = document.getElementById('book-author')
const bookPages = document.getElementById('book-pages')
const bookRead = document.querySelector('input[name="book-read"]:checked')
//const bookRead = document.querySelector('input[name="book-read"]')

function bookFormModal(){
    addBookFormModal.classList.add('open');
    openFormOverlay.classList.add('open-form');
}

function closeForm(){
    addBookForm.reset();
    addBookFormModal.classList.remove('open');
    openFormOverlay.classList.remove('open-form');
    
}

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.addToLibrary = showLibrary;

function addBookToLibrary(){
    if (bookTitle.checkValidity() == true && bookAuthor.checkValidity() == true &&
        bookPages.checkValidity() == true){
            let read
            if(bookRead.checked.valueOf() == false){
                read = false
            } else {
                read = true
            }
            mylibrary.push(
                new Book(
                    bookTitle.value, 
                    bookAuthor.value, 
                    bookPages.value,
                    read,
                    )
            )
            mylibrary[mylibrary.length - 1].addToLibrary();
            closeForm()
    }
    
}

function showLibrary(){
    const bookCard = document.createElement('div')
    bookLibrary.appendChild(bookCard)
    bookCard.classList.add('book-card')
    const bookCardTitle = document.createElement('p')
    bookCard.appendChild(bookCardTitle)
    bookCardTitle.textContent = this.title
    const bookCardAuthor = document.createElement('p')
    bookCard.appendChild(bookCardAuthor)
    bookCardAuthor.textContent = this.author
    const bookCardPages = document.createElement('p')
    bookCard.appendChild(bookCardPages)
    bookCardPages.textContent = this.pages
    const bookCardRead = document.createElement('p')
    bookCard.appendChild(bookCardRead)
    if (this.read == false){
        bookCardRead.textContent = "Not read yet."
    } else if(this.read == true) {
        bookCardRead.textContent = "Already read."
    }
    
}