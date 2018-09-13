chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "populateTB") {
    clear();
    populateTrialBalance(request.params);
  }
  if (request.action === "clearTB") {
    clear();
  }
});

function populateTrialBalance(params) {
  const includeBF = params.includeBF,
    minValue = params.minValue,
    maxValue = params.maxValue,
    postingType = params.postingType,
    density = parseInt(params.density),
    range = maxValue - minValue + 1,
    event = new Event('change', {'bubbles': true});

  let postTo = 'debit',
    total = 0,
    value = 0;

  let inputRows = [].slice.call(document.querySelectorAll('tr.odd, tr.even'));
  const lastInputRow = inputRows.pop();

  let inputField;

  if (!includeBF) {
    inputRows = inputRows.filter(checkNotBF);
  }

  if (density < 100) {
    shuffleArray(inputRows);
    let rowsToFill = Math.floor(inputRows.length * (density / 100));
    inputRows = inputRows.slice(0, rowsToFill);
  }

  inputRows.forEach(function (inputRow) {
    postTo = creditOrDebit(postingType);
    value = Math.floor(Math.random() * range) + parseInt(minValue);
    inputField = inputRow.querySelector('input[name*=' + postTo + ']');
    (postTo === 'debit') ? total += value : total -= value;
    inputField.value = value;
  });

  postTo = (total <= 0) ? 'debit' : 'credit';
  inputField = lastInputRow.querySelector('input[name*=' + postTo + ']');
  inputField.value = Math.abs(total);
  inputField.dispatchEvent(event);

  document.querySelector('button.save').focus();
}

function clear() {
  const event = new Event('change', {'bubbles': true}),
    inputRows = document.querySelectorAll('tr.odd, tr.even');
  for (let i = 0; i < inputRows.length; i++) {
    inputRows[i].querySelector('input[name*=credit]').value = '';
    inputRows[i].querySelector('input[name*=debit]').value = '';
  }
  inputRows[0].querySelector('input[name*=credit]').dispatchEvent(event);
}

function creditOrDebit(postingType) {
  if (postingType === "creditOnly") {
    return 'credit';
  }
  if (postingType === "debitOnly") {
    return 'debit';
  }
  return (Math.floor(Math.random() * 2) === 0) ? 'credit' : 'debit';
}

function checkNotBF(inputRow) {
  let account_name = inputRow.querySelector('span.nominal_account_name').innerText;
  return !account_name.toLowerCase().includes('brought forward');
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
