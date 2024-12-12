import createBlockListArr from "../util/createBlockListArr";
import onError from "../util/onError";

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
