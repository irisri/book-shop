'use strict'

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHTML = books.map(book =>
        `<tr><th class="align-middle">${book.id}</td>
        <td class="align-middle" scope="row">${book.name}</td>
        <td class="align-middle">${book.price}</td>
        <div class="text-center">
        <td><button onclick="onRead('${book.id}')" class="rounded btn btn-primary mx-auto" data-trans="read">Read</button></td>
        <td><button onclick="onUpdate('${book.id}')" class="rounded btn btn-warning mx-auto" data-trans="update">Update</button></td>
        <td><button onclick="onRemoveBook('${book.id}')" class="rounded btn btn-danger mx-auto" data-trans="remove">Delete</button></td>
        </div>
        </tr>`);
    $('.book-list').html(strHTML.join(''));
    (!hasNext()) ? $('.next').addClass('invisible') : $('.next').removeClass('invisible'); 
    (!hasPrev()) ? $('.prev').removeClass('invisible') : $('.prev').addClass('invisible');
}

function onRead(bookId) {
    var book = getBookById(bookId);
    var elModalRead = $('.modal-read')
    elModalRead.modal('show');
    $('.modal-read h4').text(book.name);
    $('.price').text(book.price);
    $('.modal-read img').attr('src', book.img);
    var rateButtons = `<button onclick="onAddOrSubs('${bookId}', false)" class="rounded btn btn-secondary my-2 mx-2">-</button>
        <span class="rate">${book.rate}</span>
        <button onclick="onAddOrSubs('${bookId}', true)" class="rounded btn btn-secondary my-2 mx-2">+</button>`;
    $('.rate-container').html(rateButtons);
}

function onAddOrSubs(bookId, isAdd) {
    var rate = getBookById(bookId).rate;
    (isAdd) ? rate++ : rate--;
    if (rate > 10) return;
    if (rate < 0) return;
    updateRate(bookId, isAdd);
    $('.rate').html(rate);
}


function onUpdate(bookId) {
    var elModalUpdate = $('.modal-update');
    elModalUpdate.modal('show');
    $('.modal-update h5').text(getBookById(bookId).name);
    $('.save').attr('onclick', `onUpdatePrice('${bookId}')`);
}

function onUpdatePrice(bookId) {
    var price = $('.update-price').val();
    if (!price) return;
    updateBook(bookId, price);
    renderBooks()
    $('.modal-update').modal('hide');
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onAddBook() {
    var bookName = $('[name=book-name').val();
    var bookPrise = +$('[name=price]').val();
    if (!bookName || !bookPrise) {
        alert('You didn\'t enter something!');
        document.querySelector('[name=book-name').value = '';
        document.querySelector('[name=price').value = '';
        return;
    }
    addBook(bookName, bookPrise);
    $('[name=book-name').val('');
    $('[name=price]').val('')
    renderBooks();
}

function onSetLang(lang) {
    setLang(lang);
    (lang === 'he') ? $('body').addClass('rtl') : $('body').removeClass('rtl');
    doTrans();
}

function onNextPage() {
    nextPage();
    renderBooks();
}

function onPrevPage() {
    prevPage();
    renderBooks();
}
