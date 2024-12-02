(function () {
  if (window.hasRun) {
    return;
  }

  function test2(ev) {
    ev.stopImmediatePropagation();
    ev.preventDefault();
    document.querySelector("body").removeEventListener("click", test2);
  }

  function test() {
    document.querySelector("body").addEventListener("click", test2, true);
  }

  window.hasRun = true;

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "test") {
      test();
    }
  });
})();
