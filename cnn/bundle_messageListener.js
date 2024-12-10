function createBlockObj(key, url, block, check) {
  const obj = {};
  obj[key] = {
    key,
    url,
    block,
    check,
  };
  return obj;
}

function onError(err) {
  console.error(err);
}

(function () {
  if (window.hasRun) {
    return;
  }

  const body = document.querySelector("body");
  const MOUSE_VISITED_CLASSNAME = "crx_mouse_visited";
  let prevDOM = null;

  async function handleClick(ev) {
    ev.stopImmediatePropagation();
    ev.preventDefault();

    body.removeEventListener("click", handleClick);
    body.removeEventListener("mouseover", inspector);

    if (prevDOM != null) {
      prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);

      const arr = [];

      let selector;

      if (String(prevDOM.id) === "") {
        DOMsearch(body, prevDOM, arr);

        selector = "body";

        while (arr.length) {
          selector += ` > :nth-child(${arr.pop()})`;
        }
      } else {
        selector = `#${prevDOM.id}`;
      }

      if (confirm(`Are you sure to block this element? ${selector}`)) {
        try {
          const sl = browser.storage.local;
          const parsedUrl = new URL(window.location.href);
          const obj = createBlockObj(
            String(Date.now()),
            parsedUrl.origin,
            selector,
            true
          );
          await sl.set(obj);
        } catch (err) {
          onError(err);
        }
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
      if (DOMsearch(childDom, target, arr)) {
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
