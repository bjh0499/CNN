(function () {
  if (window.hasRun) {
    return;
  }

  const body = document.querySelector("body");
  let tmp;

  function test2(ev) {
    ev.stopImmediatePropagation();
    ev.preventDefault();
    console.log(tmp);

    body.removeEventListener("click", test2);
    body.removeEventListener("mouseover", test3);

    const prevCnnSelector = document.querySelector("#cnnSelector");
    if (prevCnnSelector) {
      prevCnnSelector.remove();
    }
  }

  function test3(ev) {
    if (ev.target.id === "cnnSelector") {
      return;
    }

    const prevCnnSelector = document.querySelector("#cnnSelector");
    if (prevCnnSelector) {
      prevCnnSelector.remove();
    }

    const rect = ev.target.getBoundingClientRect();
    console.log(ev.target);
    console.log(rect);
    tmp = ev.target;

    const cnnSelector = document.createElement("div");
    cnnSelector.id = "cnnSelector";
    cnnSelector.style.position = "fixed";
    cnnSelector.style.width = `${rect.width}px`;
    cnnSelector.style.height = `${rect.height}px`;
    cnnSelector.style.left = `${rect.left}px`;
    cnnSelector.style.top = `${rect.top}px`;
    cnnSelector.style.zIndex = "100";
    cnnSelector.style.backgroundColor = "red";
    body.append(cnnSelector);

    setTimeout(() => {
      cnnSelector.remove();
    }, 100);
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
