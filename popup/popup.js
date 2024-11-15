function listenForClicks() {
  document.addEventListener("click", (e) => {
    function cnn() {
      browser.storage.local.set({ run: true }).then(() => {
        browser.storage.local.get("run").then((result) => {
          const run = result.run;
          if (run === undefined) {
            alert("Error occurred in writing to local storage");
          }

          alert(run);
        }, reportError);
      }, reportError);
    }

    function reset() {
      browser.storage.local.set({ run: false }).then(() => {
        browser.storage.local.get("run").then((result) => {
          const run = result.run;
          if (run === undefined) {
            alert("Error occurred in writing to local storage");
          }

          alert(run);
        }, reportError);
      }, reportError);
    }

    function reportError(error) {
      console.error(`Could not clear page: ${error}`);
    }

    if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
      return;
    }

    if (e.target.type === "reset") {
      reset();
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
  .executeScript({ file: "/cnn/test.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
