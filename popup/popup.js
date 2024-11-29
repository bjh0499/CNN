const sl = browser.storage.local;

function listenForClicks() {
  document.addEventListener("click", (e) => {
    function cnn() {
      sl.set({ run: true }).then(() => true, reportError);
    }

    function reset() {
      sl.set({ run: false }).then(() => true, reportError);
    }

    function commandTabs(tabs) {
      browser.tabs
        .sendMessage(tabs[0].id, {
          command: "test",
        })
        .then(() => true, reportError2);
    }

    function select() {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(commandTabs, reportError2);
    }

    function reportError(error) {
      console.error(`Could not clear page: ${error}`);
    }

    function reportError2(error) {
      console.error(`Could not command to page: ${error}`);
    }

    if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
      return;
    }

    if (e.target.type === "reset") {
      reset();
    } else if (e.target.id === "selectButton") {
      select();
    } else {
      cnn();
    }
  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute CNN content script: ${error.message}`);
}

browser.tabs
  .executeScript({ file: "/cnn/messageListener.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
