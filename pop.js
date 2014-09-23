(function () {
    var debits = document.querySelectorAll('input[name=debit]'),
        credits = document.querySelectorAll('input[name=credit]'),
        l = debits.length - 1;

    for (var i = 0; i < l; i++) {
        debits[i].value = 1;
    }

    credits[l].value = l;
})();
