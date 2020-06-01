'use strict'

var gBooks = _createBooks();

function _createBooks() {
    var books = loadFromStorage('books');
    if (!books || !books.length) {
        var booksNameImg = [
            ['Ender\'s Game', 'img/Ender\'s Game.jpg'],
            ['Dune', 'img/Dune.jpg'],
            ['Good Omens', 'img/Good Omens.jpg']
        ];
        books = booksNameImg.map(book => _createBook(book[0], book[1]));
        saveToStorage('books', books);
    }
    return books;
}

function _createBook(txt, url, price = getRandomIntInclusive(50, 100)) {
    if (!price) price ;
    return {
        id: makeId(),
        name: txt,
        price: price,
        img: url,
        rate: 0
    }
}

function getBooks() {
    return gBooks;
}

function removeBook(bookId) {
    var bookIndex = _getBookIndex(bookId);
    if (bookIndex < 0) return
    gBooks.splice(bookIndex, 1);
    saveToStorage('books', gBooks)
}

function addBook(name, price) {
    var book = _createBook(name, makeId(), price);
    gBooks.unshift(book);
    saveToStorage('books', gBooks);
}

function updateBook(bookId, bookPrice) {
    var book = _getBookById(bookId);
    // var bookIndex = getBookIndex(bookId);
    book.price = bookPrice;
    // gBooks[bookIndex];
    saveToStorage('books', gBooks);
}

function updateRate(bookId, isAdd) {
    (isAdd) ? _getBookById(bookId).rate++ : _getBookById(bookId).rate--;
    saveToStorage('books', gBooks);
}

function _getBookById(bookId) {
    var book = gBooks.find(book => book.id === bookId);
    return book;
}

function _getBookIndex(bookId) {
    return gBooks.findIndex(book => book.id === bookId)
}