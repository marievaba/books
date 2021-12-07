const form = document.querySelector('form');
form.addEventListener('submit', addBook);

//const bookList = document.querySelector('td');
//bookList.addEventListener('click', deleteBook);

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

    books.forEach(function(book) {
        const bookList = document.querySelector('tbody');

        let row = bookList.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
    
        cell1.innerHTML = book.title;
        cell2.innerHTML = book.author;
        cell3.innerHTML = book.isbn;
        cell4.appendChild(createDeleteButton());
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
            const bookRowElement = event.target.parentElement.parentElement;
            let title = bookRowElement.cells[0].innerHTML.slice(0, -1);
            bookRowElement.remove();
            console.log(title);
            removeBookFromStorageByTitle(title);
        }
    }
}

function removeBookFromStorageByTitle(title) {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.forEach(function(book, bookIndex) {
        if(book.title === title) {
            books.splice(bookIndex, 1);
        }
    })
    localStorage.setItem('books', JSON.stringify(books));
}

function addBook(event) {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    const bookList = document.querySelector('tbody');

    let row = bookList.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    cell1.innerHTML = title;
    cell2.innerHTML = author;
    cell3.innerHTML = isbn;
    cell4.appendChild(createDeleteButton());

    let book = {title: title, author: author, isbn: isbn};

    addBookToLocalStorage(book);

    // refresh input field
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}

function addBookToLocalStorage(book) {
    let books;
    if(localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

function createDeleteButton() {
    const btnLink = document.createElement('a');
    btnLink.className = 'secondary-content';
    btnLink.appendChild(document.createTextNode('X'));
    btnLink.setAttribute('href', '#');
    btnLink.addEventListener('click', deleteBook);
    return btnLink;
}
