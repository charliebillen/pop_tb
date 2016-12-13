window.onload = function () {
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
  })
};
