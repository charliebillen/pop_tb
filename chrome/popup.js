window.onload = function () {
  const form = document.getElementById("form");
  const btnPopTB = document.getElementById("btn_pop_tb_run");
  const btnClearTB = document.getElementById("btn_clear_tb");
  const rngDensity = document.getElementById("rngDensity");
  const rngDensityOutput = document.getElementById("rngDensityOutput");
  const densityFriendlyOutput = document.getElementById("densityFriendlyOutput");

  densityFriendlyOutput.innerHTML = friendlyDensity(rngDensity.value);

  rngDensity.addEventListener('input', function () {
    rngDensityOutput.innerHTML = this.value + '%';
    densityFriendlyOutput.innerHTML = friendlyDensity(this.value)
  });

  btnPopTB.addEventListener('click', function () {
    chrome.tabs.getSelected(null, function (tab) {
      const postingType = document.querySelector('input[name="postingType"]:checked').value,
        includeBF = document.getElementById("chkIncludeBF").checked,
        minValue = document.getElementById("numMinValue").value,
        maxValue = document.getElementById("numMaxValue").value,
        density = document.getElementById("rngDensity").value;

      const params = {"postingType": postingType, "includeBF": includeBF, "minValue": minValue, "maxValue": maxValue, "density": density};

      chrome.tabs.sendMessage(tab.id, {action: "populateTB", params: params}, function () {
        window.close();
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
    if (event.target.type === 'number') {
      const numericValue = parseInt(event.target.value);
      event.target.value = (isNaN(numericValue)) ? event.target.defaultValue : numericValue;
    }

    const errorPanel = document.getElementById("errorPanel");
    const minValueInput = document.getElementById('numMinValue');
    const minValue = parseInt(minValueInput.value);
    const maxValueInput = document.getElementById('numMaxValue');
    const maxValue = parseInt(maxValueInput.value);
    const btnPopTB = document.getElementById("btn_pop_tb_run");
    const msgArray = [];

    //reset error state
    removeErrorState(minValueInput);
    removeErrorState(maxValueInput);

    // Validate the form
    if (maxValue < minValue) {
      msgArray.push("Maximum value cannot be less than the minimum value.");
      addErrorState(maxValueInput);
    }

    if (minValue > parseInt(minValueInput.max)) {
      msgArray.push("Minimum value cannot be greater than " + minValueInput.max + ".");
      addErrorState(minValueInput);
    }

    if (minValue < parseInt(minValueInput.min)) {
      msgArray.push("Minimum value cannot be less than " + minValueInput.min + ".");
      addErrorState(minValueInput);
    }

    if (maxValue > parseInt(maxValueInput.max)) {
      msgArray.push("Maximum value cannot be greater than " + maxValueInput.max + ".");
      addErrorState(maxValueInput);
    }

    if (maxValue < parseInt(maxValueInput.min)) {
      msgArray.push("Maximum value cannot be less than " + maxValueInput.min + ".");
      addErrorState(maxValueInput);
    }

    btnPopTB.disabled = msgArray.length > 0;
    errorPanel.innerHTML = bullet(msgArray);
    errorPanel.style.display = (msgArray.length > 0) ? 'block' : 'none';
  }, true);

  function friendlyDensity(densityValue) {
    const intDensity = parseInt(densityValue);
    if (intDensity === 1) { return "the bare minimum" }
    if (intDensity <= 10) { return "hardly any" }
    if (intDensity <= 40) { return "just a few" }
    if (intDensity <= 60) { return "about half" }
    if (intDensity <= 75) { return "a reasonable amount" }
    if (intDensity < 100) { return "quite a lot" }
    return "As many as possible";
  }

  function removeErrorState(inputControl) {
    inputControl.closest('.ui-control').classList.remove('error-state');
  }

  function addErrorState(inputControl) {
    inputControl.closest('.ui-control').classList.add('error-state');
  }

  function bullet(msgArray) {
    if (msgArray.length === 0) {
      return '';
    }

    let i, msgString = "<ul>";
    for (i = 0; i < msgArray.length; i++) {
      msgString += "<li>" + msgArray[i] + "</li>";
    }
    return "<div class='error-icon-container'><span class='error-icon'></span></div><span class='error-content'>" + msgString + "</ul></span>";
  }
};
