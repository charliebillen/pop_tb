chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        // When a page contains a tb form...
        new chrome.declarativeContent.PageStateMatcher({
          css: ["form.UIForm.trial-balance"]
        })
      ],
      // ... show the page action.
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
