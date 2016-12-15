window.onload = function () {
  var form = document.getElementById("form");
  var btnPopTB = document.getElementById("btn_pop_tb_run");
  var btnClearTB = document.getElementById("btn_clear_tb");

  btnPopTB.addEventListener('click', function () {
    chrome.tabs.getSelected(null, function (tab) {
      var postingType = document.querySelector('input[name="postingType"]:checked').value,
          includeBF = document.querySelector('input[name="includeBF"]').checked,
          minValue = document.querySelector('input[name="minValue"]').value,
          maxValue = document.querySelector('input[name="maxValue"]').value;

      var params = {"postingType": postingType, "includeBF": includeBF, "minValue": minValue, "maxValue": maxValue};

      chrome.tabs.sendMessage(tab.id, {action: "populateTB", params: params}, function () {
      });
    });
  });

  btnClearTB.addEventListener('click', function () {
    chrome.tabs.getSelected(null, function (tab) {
      chrome.tabs.sendMessage(tab.id, {action: "clearTB"}, function () {
      });
    });
  });

  form.addEventListener("blur", function (event) {
    if (event.target.type == 'number') {
      var numericValue = parseInt(event.target.value);
      event.target.value = (isNaN(numericValue)) ? event.target.defaultValue : numericValue;
    }

    var errorPanel = document.getElementById("errorPanel");
    var minValueInput = document.querySelector('input[name="minValue"]');
    var minValue = parseInt(minValueInput.value);
    var maxValueInput = document.querySelector('input[name="maxValue"]');
    var maxValue = parseInt(maxValueInput.value);
    var btnPopTB = document.getElementById("btn_pop_tb_run");
    var msgArray = [];

    // Validate the form
    if (maxValue < minValue) {
      msgArray.push("Maximum value cannot be less than the minimum value.");
    }

    if (minValue > parseInt(minValueInput.max)) {
      msgArray.push("Minimum value cannot be greater than " + minValueInput.max + ".");
    }

    if (minValue < parseInt(minValueInput.min)) {
      msgArray.push("Minimum value cannot be less than " + minValueInput.min + ".");
    }

    if (maxValue > parseInt(maxValueInput.max)) {
      msgArray.push("Maximum value cannot be greater than " + maxValueInput.max + ".");
    }

    if (maxValue < parseInt(maxValueInput.min)) {
      msgArray.push("Maximum value cannot be less than " + maxValueInput.min + ".");
    }

    btnPopTB.disabled = msgArray.length > 0;
    errorPanel.innerHTML = bullet(msgArray);
    errorPanel.style.display = (msgArray.length > 0) ? 'block' : 'none';
  }, true);

  function bullet(msgArray) {
    if (msgArray.length == 0) {
      return '';
    }

    var i, msgString = "<ul>";
    for (i = 0; i < msgArray.length; i++) {
      msgString += "<li>" + msgArray[i] + "</li>";
    }
    return msgString + "</ul>";
  }
};
