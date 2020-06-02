'use strict'

var gBooks = _createBooks();
const PAGE_SIZE = 3;
var gPageIdx = 0;

function getBooks() {
    var startIndex = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIndex, startIndex + PAGE_SIZE);
}

function _createBooks() {
    var books = loadFromStorage('books');
    if (!books || !books.length) {
        var booksNameImg = [
            'Ender\'s Game',
            'Dune',
            'Good Omens',
            'The Hitchhiker\'s Guide to the Galaxy',
            'The Shadow of the Wind'
        ];
        books = booksNameImg.map(book => _createBook(book));
        saveToStorage('books', books);
    }
    return books;
}

function _createBook(txt, url, price = getRandomIntInclusive(50, 100)) {
    if (!price) price;
    return {
        id: makeId(),
        name: txt,
        price: price,
        img: `img/${txt}.jpg`,
        rate: 0
    }
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
    var book = getBookById(bookId);
    book.price = bookPrice;
    saveToStorage('books', gBooks);
}

function updateRate(bookId, isAdd) {
    (isAdd) ? getBookById(bookId).rate++ : getBookById(bookId).rate--;
    saveToStorage('books', gBooks);
}

function getBookById(bookId) {
    var book = gBooks.find(book => book.id === bookId);
    return book;
}

function _getBookIndex(bookId) {
    return gBooks.findIndex(book => book.id === bookId)
}

function nextPage() {
    gPageIdx++;
}

function prevPage() {
    gPageIdx--;
}

function hasNext() {
    return (gPageIdx + 1) * PAGE_SIZE < gBooks.length
}

function hasPrev() {
    return gPageIdx === 0; 
}