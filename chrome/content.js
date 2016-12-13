chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "populateTB") {
    clear();
    populateTrialBalance(request.params);
  }
  if (request.action == "clearTB") {
    clear();
  }
});

function populateTrialBalance(params) {
  var postingType = params.postingType,
      includeBF = params.includeBF,
      minValue = params.minValue,
      maxValue = params.maxValue;

  var range = maxValue - minValue,
      postTo = 'debit',
      account_name,
      isBF = false,
      total = 0,
      value = 0;

  var event = new Event('change', {'bubbles': true}),
      inputRows = document.querySelectorAll('tr.odd, tr.even'),
      inputRowCount = inputRows.length - 1,
      lastInputRow = inputRows[inputRowCount],
      inputField;

  for (var i = 0; i < inputRowCount; i++) {
    account_name = inputRows[i].querySelector('span.nominal_account_name').innerText;
    isBF = account_name.toLowerCase().includes('brought forward');
    if (!includeBF && isBF) {
      continue;
    }

    postTo = creditOrDebit(postingType);
    value = Math.floor(Math.random() * range + minValue);
    inputField = inputRows[i].querySelector('input[name*=' + postTo + ']');
    (postTo == 'debit') ? total += value : total -= value;
    inputField.value = value;
  }

  postTo = (total <= 0) ? 'debit' : 'credit';
  inputField = lastInputRow.querySelector('input[name*=' + postTo + ']');
  inputField.value = Math.abs(total);
  inputField.dispatchEvent(event);

  window.scrollTo(0, document.body.scrollHeight);
}

function clear() {
  var event = new Event('change', {'bubbles': true}),
      inputRows = document.querySelectorAll('tr.odd, tr.even');
  for (var i = 0; i < inputRows.length; i++) {
    inputRows[i].querySelector('input[name*=credit]').value = '';
    inputRows[i].querySelector('input[name*=debit]').value = '';
  }
  inputRows[0].querySelector('input[name*=credit]').dispatchEvent(event);
}

function creditOrDebit(postingType) {
  if (postingType == "creditOnly") {
    return 'credit';
  }
  if (postingType == "debitOnly") {
    return 'debit';
  }
  return (Math.floor(Math.random() * 2) == 0) ? 'credit' : 'debit';
}
