(function () {
    var debits = document.querySelectorAll('input[name*=debit]'),
        credits = document.querySelectorAll('input[name*=credit]'),
        l = debits.length - 1,
        total = 0,
        value = 0;

    for (var i = 0; i < l; i++) {
        value = Math.floor(Math.random() * 1000 + 1);
        total += value;
        debits[i].value = value;
    }

    credits[l].value = total;

    window.scrollTo(0, document.body.scrollHeight);
})();
