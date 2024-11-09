(function () {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function cnn() {
    document.querySelector("#cbox_module").style.visibility = "hidden";
  }

  function reset() {
    document.querySelector("#cbox_module").style.visibility = "visible";
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "cnn") {
      cnn();
    } else {
      reset();
    }
  });
})();
