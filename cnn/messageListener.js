(function () {
  if (window.hasRun) {
    return;
  }

  const body = document.querySelector("body");

  function test2(ev) {
    ev.stopImmediatePropagation();
    ev.preventDefault();

    body.removeEventListener("click", test2);
    body.removeEventListener("mouseover", test3);
  }

  function test3(ev) {
    if (ev.target.id === "cnnSelector") {
      return;
    }

    const prevCnnSelector = document.querySelector("#cnnSelector");
    if (prevCnnSelector) {
      prevCnnSelector.remove();
    }

    console.log(ev.target);
  }

  function test() {
    body.addEventListener("click", test2, true);
    body.addEventListener("mouseover", test3);
  }

  window.hasRun = true;

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "test") {
      test();
    }
  });
})();
