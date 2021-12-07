const form = document.querySelector('form');
form.addEventListener('submit', addBook);

const bookList = document.querySelector('ul');
bookList.addEventListener('click', deleteBook);

// const deleteBtn = document.querySelector('#delete-books');
// deleteBtn.addEventListener('click', delBooks);

document.addEventListener('DOMContentLoaded', getBooks);

function getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    console.log(books);
    books.forEach(function(book) {
        const bookList = document.querySelector('ul');
        const li = document.createElement('li');
        li.className = 'collection-item';
        const text = document.createTextNode(book);
        li.appendChild(text);
        const link = document.createElement('a');
        link.className = 'secondary-content';
        link.appendChild(document.createTextNode('X'));
        link.setAttribute('href', '#');
        li.appendChild(link);
        bookList.appendChild(li);
    })
}

function deleteBooks() {
    while (bookList.firstChild) {
        bookList.removeChild(bookList.firstChild);
    }
    removeAllStorage();
}

function removeAllStorage() {
    localStorage.removeItem('books');
}

function deleteBook(event) {
    if (event.target.textContent === 'X') {
        if (confirm('Do you really want to delete this book?')) {
            event.target.parentElement.remove();
            let book = event.target.parentElement.textContent.slice(0, -1);
            removeBookFromStorage(book);
        }
    }
}

function removeBookFromStorage(book) {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.forEach(function(bookFromLS, bookIndex) {
        if(bookFromLS === book) {
            books.splice(bookIndex, 1);
        }
    })
    localStorage.setItem('books', JSON.stringify(books));
}

function addBook(event) {
    const book = document.querySelector('#book').value;
    const bookList = document.querySelector('ul');
    const li = document.createElement('li');
    li.className = 'collection-item';
    const text = document.createTextNode(book);
    li.appendChild(text);
    const link = document.createElement('a');
    link.className = 'secondary-content';
    link.appendChild(document.createTextNode('X'));
    link.setAttribute('href', '#');
    li.appendChild(link);
    bookList.appendChild(li);
    bookStorage(book);
    document.querySelector('#book').value = '';
    event.preventDefault();
}

function bookStorage(book) {
    let books;
    if(localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}