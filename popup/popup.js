function listenForClicks() {
  document.addEventListener("click", (e) => {
    function cnn(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "cnn",
      });
    }

    function reset(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "reset",
      });
    }

    function reportError(error) {
      console.error(`Could not clear page: ${error}`);
    }

    if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
      return;
    }

    if (e.target.type === "reset") {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(reset)
        .catch(reportError);
    } else {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(cnn)
        .catch(reportError);
    }
  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute CNN content script: ${error.message}`);
}

browser.tabs
  .executeScript({ file: "/cnn/cnn.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
