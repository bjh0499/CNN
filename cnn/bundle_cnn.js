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
  alert("start");
  for (let key in changes) {
    alert(String(key));
  }
  alert("end");

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
    alert(`${run}...`);
    changeBlockElement(blockList, run);
  } catch (err) {
    onError(err);
  }
}

(async () => {
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
})();
