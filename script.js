let mylibrary = [];

const addBookFormButton = document.getElementById('add').addEventListener('click', bookFormModal)
const addBookFormModal = document.getElementById('book-form-container')
const closeBookForm = document.getElementById('close-button').addEventListener('click', closeForm)
const openFormOverlay = document.getElementById('overlay')
const addBookForm = document.getElementById('book-form')
const addBookButton = document.getElementById('add-book')
const addBookButtonEvent = document.getElementById('add-book').addEventListener('click', addBookToLibrary)
const bookLibrary = document.getElementById('books')

// inputs

const bookTitle = document.getElementById('book-title')
const bookAuthor = document.getElementById('book-author')
const bookPages = document.getElementById('book-pages')
const bookRead = document.querySelector('input[name="book-read"]')

bookTitle.addEventListener('keyup', verifyTitle)

bookAuthor.addEventListener('keyup', verifyAuthor)

bookPages.addEventListener('keyup', verifyPages)

openFormOverlay.addEventListener('click',
    function(event){
        if(event.target.matches(".close-button") || !event.target.closest(".book-form-container")){
            closeForm()
        }
    },
    false    
)

function verifyTitle(){
    if(bookTitle.value == '' || bookTitle.value == null){
        bookTitle.classList.add('invalid-field')
        return false
    } else {
        bookTitle.classList.remove('invalid-field')
        return true
    }
}

function verifyAuthor(){
    if (bookAuthor.value == '' || bookAuthor.value == null){
        bookAuthor.classList.add('invalid-field')
        return false
    } else {
        bookAuthor.classList.remove('invalid-field')
        return true
    }
}

function verifyPages(){
    if (bookPages.value == '' || bookPages.value == null || 
        bookPages.value > 10000 || bookPages.value < 1){
        bookPages.classList.add('invalid-field')
        return false
    } else {
        bookPages.classList.remove('invalid-field')
        return true
    }
}

function disableAddButton(){
    if (bookTitle.classList.contains('ivalid-field') ||
        bookAuthor.classList.contains('invalid-field') ||
        bookPages.classList.contains('invalid-field')){
        addBookButton.disabled = true
    } else {
        addBookButton.disabled = false
    }
}

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

function validateForm(){
    // verifyTitle()
    // verifyAuthor()
    // verifyPages()

    if (verifyTitle() == false)
        return false
    if(verifyAuthor() == false)
        return false
    if(verifyPages() == false)
        return false

    return true
}

function addBookToLibrary(){
    if(validateForm() == false){
        return
    }
    
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
                    read
                    )
            )
            createCard(mylibrary.length - 1);
            closeForm()
    }
    
}

function createCard(index){
    const bookCard = document.createElement('div')
    bookLibrary.appendChild(bookCard)
    bookCard.classList.add('book-card')
    bookCard.setAttribute('id', index)

    const bookCardTitle = document.createElement('p')
    bookCard.appendChild(bookCardTitle)
    bookCardTitle.textContent = mylibrary[index].title

    const bookCardAuthor = document.createElement('p')
    bookCard.appendChild(bookCardAuthor)
    bookCardAuthor.textContent = mylibrary[index].author

    const bookCardPages = document.createElement('p')
    bookCard.appendChild(bookCardPages)
    bookCardPages.textContent = mylibrary[index].pages

    const bookCardRead = document.createElement('p')
    bookCard.appendChild(bookCardRead)
    bookCardRead.textContent = getReadStatus(index)
    
    const bookCardReadButton = document.createElement('button')
    bookCard.appendChild(bookCardReadButton)
    if (mylibrary[index].read == true){
        bookCardReadButton.textContent = "Unread"
        bookCardReadButton.style.backgroundColor = 'green'
    } else {
        bookCardReadButton.textContent = "Read"
        bookCardReadButton.style.backgroundColor = 'lightblue'
    }

    bookCardReadButton.addEventListener('click', (e) => { 
        changeBookReadStatus(index)
        if (mylibrary[index].read == true) {
            bookCardReadButton.textContent = "Unread"
            bookCardReadButton.style.backgroundColor = 'green'
        } else {
            bookCardReadButton.textContent = "Read"
            bookCardReadButton.style.backgroundColor = 'lightblue'
        }
        bookCardRead.textContent = getReadStatus(index)
    } )

    const bookCardRemoveBookButton = document.createElement('button')
    bookCard.appendChild(bookCardRemoveBookButton)
    bookCardRemoveBookButton.textContent = "Remove Book"
    bookCardRemoveBookButton.style.backgroundColor = 'red'
    bookCardRemoveBookButton.style.color = 'white'
    bookCardRemoveBookButton.addEventListener('click', () => {
        removeBook(bookCardRemoveBookButton.closest('.book-card').id)
    })
}

function changeBookReadStatus(index){
    if (mylibrary[index].read == false){
        mylibrary[index].read = true
    } else {
        mylibrary[index].read = false
    }
}

function getReadStatus(index){
    if (mylibrary[index].read == false){
        return "Not read yet."
    } else {
        return "Already read."
    }
}

function removeBook(index){
    document.getElementById(index).remove()
    mylibrary.splice(index, 1)
    updateID()
}

function updateID(){
    const cards = document.getElementsByClassName('book-card')
    for (i = 0; i < cards.length; i++){
        cards.item(i).id = i
    }
}
