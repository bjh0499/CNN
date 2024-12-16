function createBlockListArr(blockList) {
  const arr = [];
  for (let key in blockList) {
    if (key === "run") {
      continue;
    }
    const obj = { key, ...blockList[key] };
    arr.push(obj);
  }

  return arr;
}

function onError(err) {
  console.error(err);
}

const sl = browser.storage.local;

function applyVisibilityStyle(arr, run) {
  for (let el of arr) {
    const URI = document.documentURI;
    if (el.url && URI.indexOf(el.url) >= 0) {
      try {
        const blockEl = document.querySelector(el.block);
        if (blockEl) {
          blockEl.style.visibility =
            String(run) === "true" && String(el.check) === "true"
              ? "hidden"
              : "visible";
        }
      } catch (err) {}
    }
  }
}

function changeBlockElement(blockList, run) {
  applyVisibilityStyle(createBlockListArr(blockList), run);
}

async function applyStorageChange(changes) {
  const newItems = {};

  if (!changes.run) {
    for (let key in changes) {
      if (key === "run") {
        continue;
      }
      newItems[key] = changes[key].newValue;
    }
  }

  try {
    const result = await sl.get(changes.run ? null : "run");
    const blockList = changes.run ? result : newItems;
    const run = changes.run ? changes.run.newValue : result.run;

    if (changes.run) {
      const URI = document.documentURI;
      for (let key in result) {
        el = result[key];
        if (el.url && URI.indexOf(el.url) < 0) {
          result[key] = undefined;
        }
      }
    }
    changeBlockElement(blockList, run);
  } catch (err) {
    onError(err);
  }
}

(async () => {
  let result, run;
  try {
    result = await sl.get(null);
    run = result.run;
    const URI = document.documentURI;
    console.log(URI);

    if (run === undefined) {
      await sl.set({ run: false });
    }

    for (let key in result) {
      el = result[key];
      if (el.url && URI.indexOf(el.url) < 0) {
        result[key] = undefined;
      }
    }

    changeBlockElement(result, run);
  } catch (err) {
    onError(err);
  }

  browser.storage.onChanged.addListener(applyStorageChange);

  // https://stackoverflow.com/questions/17986020/chrome-extension-javascript-to-detect-dynamically-loaded-content
  function blockForNewElement(records, observer) {
    applyVisibilityStyle(createBlockListArr(result), run);
  }

  const observer = new MutationObserver(blockForNewElement);
  observer.observe(document.querySelector("body"), {
    childList: true,
    subtree: true,
  });
})();
