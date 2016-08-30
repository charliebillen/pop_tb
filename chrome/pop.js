(function () {
    var debits = document.querySelectorAll('input[name*=debit]'),
        credits = document.querySelectorAll('input[name*=credit]'),
        event = new Event('change', { 'bubbles': true }),
        l = debits.length - 1,
        lastCredit = credits[l],
        total = 0,
        value = 0;

    for (var i = 0; i < l; i++) {
        value = Math.floor(Math.random() * 1000 + 1);
        total += value;
        debits[i].value = value;
    }

    lastCredit.value = total;
    lastCredit.dispatchEvent(event);

    window.scrollTo(0, document.body.scrollHeight);
})();
