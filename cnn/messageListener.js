(function () {
  if (window.hasRun) {
    return;
  }

  const body = document.querySelector("body");
  const MOUSE_VISITED_CLASSNAME = "crx_mouse_visited";
  let prevDOM = null;

  function handleClick(ev) {
    ev.stopImmediatePropagation();
    ev.preventDefault();

    body.removeEventListener("click", handleClick);
    body.removeEventListener("mouseover", inspector);

    if (prevDOM != null) {
      prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);

      const arr = [];

      DOMsearch(body, prevDOM, arr, 0);

      let selector = `body:nth-child(${arr.pop()})`;

      while (arr.length) {
        selector += ` :nth-child(${arr.pop()})`;
      }

      prevDOM = null;
    }
  }

  function DOMsearch(dom, target, arr, level) {
    const childDomList = dom.children;
    let idx = 1;

    if (dom === target) {
      return true;
    }

    for (let childDom of childDomList) {
      if (DOMsearch(childDom, target, arr, level + 1)) {
        arr.push(idx);
        return true;
      }

      idx++;
    }

    return false;
  }

  function inspector(ev) {
    // https://stackoverflow.com/questions/4445102/google-chrome-extension-highlight-the-div-that-the-mouse-is-hovering-over
    const srcElement = ev.srcElement;

    if (prevDOM != srcElement) {
      if (prevDOM != null) {
        prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);
      }

      srcElement.classList.add(MOUSE_VISITED_CLASSNAME);
      prevDOM = srcElement;
    }
  }

  function test() {
    body.addEventListener("click", handleClick, true);
    body.addEventListener("mouseover", inspector);
  }

  window.hasRun = true;

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "test") {
      test();
    }
  });
})();
