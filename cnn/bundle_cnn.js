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

function changeBlockElement(blockList, run) {
  const arr = createBlockListArr(blockList);

  for (let el of arr) {
    const URI = document.documentURI;
    if (el.url && URI.indexOf(el.url) >= 0) {
      try {
        document.querySelector(el.block).style.visibility =
          String(run) === "true" && String(el.check) === "true"
            ? "hidden"
            : "visible";
      } catch (err) {}
    }
  }
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

    if (run === undefined) {
      await sl.set({ run: false });
    }

    changeBlockElement(result, run);
  } catch (err) {
    onError(err);
  }

  browser.storage.onChanged.addListener(applyStorageChange);

  function blockForNewElement(records, observer) {
    const arr = createBlockListArr(result);

    for (let el of arr) {
      console.log(el);
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

  const observer = new MutationObserver(blockForNewElement);
  observer.observe(document.querySelector("body"), {
    childList: true,
    subtree: true,
  });
})();
