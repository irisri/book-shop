'use strict'

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHTML = books.map(book =>
        `<tr><td>${book.id}</td><td>${book.name}</td><td>${book.price}</td>
        <td><button onclick="onRead('${book.id}')">Read</button></td>
        <td><button onclick="onUpdate('${book.id}')">Update</button></td>
        <td><button onclick="onRemoveBook('${book.id}')">Delete</button></td>
        </tr>`);
    document.querySelector('.book-list').innerHTML = strHTML.join('');
}

function onRead(bookId) {
    var book = _getBookById(bookId);
    var elModal = document.querySelector('.modal');
    elModal.querySelector('h4').innerHTML = book.name;
    elModal.querySelector('.price').innerHTML = book.price;
    elModal.querySelector('img').setAttribute('src', book.img);
    var rateButtons = `<button onclick="onAddOrSubs('${bookId}', false)">-</button>
        <span class="rate">${book.rate}</span>
        <button onclick="onAddOrSubs('${bookId}', true)">+</button>
        <div><button onclick="onCloseModal()">Close</button></div>`;
    elModal.querySelector('.rate-container').innerHTML = rateButtons;
    elModal.hidden = false;
}

function onCloseModal() {
    return document.querySelector('.modal').hidden = true;
}

function onAddOrSubs(bookId, isAdd) {
    var rate = _getBookById(bookId).rate;
    (isAdd) ? rate++ : rate--;
    if (rate > 10) return;
    if (rate < 0) return;
    updateRate(bookId, isAdd);
    document.querySelector('.rate').innerHTML = rate;
}


function onUpdate(bookId) {
    // onUpdateBook(bookId);
    var price = prompt('Enter new price');
    if (!price) return;
    updateBook(bookId, price);
    renderBooks()
}

// function onUpdateBook(bookId) {
//     var price = prompt('Enter new price');
//     if(!price) return;
//     updateBook(bookId, price);
//     renderBooks();
// }

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onAddBook() {
    var bookName = document.querySelector('[name=book-name').value;
    var bookPrise = +document.querySelector('[name=price]').value;
    if (!bookName || !bookPrise) {
        alert('You didn\'t enter something!');
        document.querySelector('[name=book-name').value = '';
        document.querySelector('[name=price').value = '';
        return;
    }
    addBook(bookName, bookPrise);
    renderBooks();
}

