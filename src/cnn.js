import createBlockListArr from "../util/createBlockListArr";
import onError from "../util/onError";

const sl = browser.storage.local;

function changeBlockElement(blockList, run) {
  const arr = createBlockListArr(blockList);

  for (let el of arr) {
    const URI = document.documentURI;
    if (URI.indexOf(el.url) >= 0) {
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
  if (window.hasRun) {
    return;
  }

  window.hasRun = true;

  try {
    const result = await sl.get(null);
    const run = result.run;

    if (result.run === undefined) {
      await sl.set({ run: false });
    }

    changeBlockElement(result, run);
  } catch (err) {
    onError(err);
  }

  browser.storage.onChanged.addListener(applyStorageChange);

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "test") {
      console.log("TEST");
    }
  });
})();
