'use strict'

var gCurrLang = 'en';

var gTrans = {
    h1: {
        en: 'Welcome to my Book Shop',
        he: 'ברוכים הבאים לחנות הספרים שלי'
    },
    titleTh: {
        en: 'Title',
        he: 'כותרת'
    },
    priceTh: {
        en: 'Prise',
        he: 'מחיר'
    },
    actionTh: {
        en: 'Action',
        he: 'פעולות'
    },
    read: {
        en: 'Read',
        he: 'פרט'
    },
    update: {
        en: 'Update',
        he: 'עדכן'
    },
    remove: {
        en: 'Delete',
        he: 'מחק'
    },
    add: {
        en: 'Add',
        he: 'הוסף'
    }
}

function doTrans() {
    var els = $('[data-trans]');
    for (var i = 0; i < els.length; i++) {
        var el = els[i]
        var transKey = el.dataset.trans;
        var trans = getTrans(transKey);
        el.innerText = trans
    }
}

function getTrans(transKey) {
    if(!gTrans[transKey]) return 'UNKNOWN';
    var transMap = gTrans[transKey];
    var trans = transMap[gCurrLang];
    if(!trans) trans = transMap['en'];
    return trans;
}

function setLang(lang) {
    gCurrLang = lang;
}