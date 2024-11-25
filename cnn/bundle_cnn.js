function onError(err) {
  console.error(err);
}

const sl = browser.storage.local;

function changeBlockElement(blockList, run) {
  const arr = [];
  for (let key in blockList) {
    if (key === "run") {
      continue;
    }
    const obj = { key, ...blockList[key] };
    arr.push(obj);
  }

  for (let el of arr) {
    const URI = document.documentURI;
    if (URI.indexOf(el.url) >= 0) {
      try {
        document.querySelector(el.block).style.visibility =
          String(run) === "true" && String(el.check) === "true"
            ? "hidden"
            : "visible";
      } catch {}
    }
  }
}

function applyStorageChange(changes) {
  if (changes.run) {
    sl.get(null).then((result) => {
      changeBlockElement(result, changes.run.newValue);
    }, onError);
  } else {
    const newItems = {};

    for (let key in changes) {
      if (key === "run") {
        continue;
      }
      newItems[key] = changes[key].newValue;
    }

    sl.get("run").then((result) => {
      changeBlockElement(newItems, result.run);
    }, onError);
  }
}

sl.get(null).then((result) => {
  const run = result.run;
  if (result.run === undefined) {
    sl.set({ run: false }).then(() => true, onError);
  }

  changeBlockElement(result, run);
}, onError);

browser.storage.onChanged.addListener(applyStorageChange);
