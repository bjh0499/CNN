const sl = browser.storage.local;

function onError(error) {
  console.log(error);
}

function changeBlockElement(blockList, run) {
  const arr = [];
  for (let key in blockList) {
    if (key === "run" || key === "modify") {
      continue;
    }
    const obj = { key, ...blockList[key] };
    arr.push(obj);
  }

  console.log(arr);
  for (let el of arr) {
    const URI = document.documentURI;
    if (URI.indexOf(el.url) >= 0) {
      document.querySelector(el.block).style.visibility =
        run && el.block ? "hidden" : "visible";
    }
  }
}

function applyStorageChange(changes, area) {
  if (changes.run) {
    sl.get(null).then((result) => {
      changeBlockElement(result, changes.run.newValue);
    }, onError);
  } else {
    const newItems = {};

    for (let key in changes) {
      if (key === "run" || key === "modify") {
        continue;
      }
      newItems[key] = changes[key].newValue;
    }

    sl.get("run").then((result) => {
      changeBlockElement(newItems, result.run);
    }, onError);
  }
}

sl.get(null).then((res1) => {
  const run = res1.run;
  if (res1.run === undefined) {
    sl.set({ run: false, modify: Date.now() }).then(() => {
      sl.get("run").then((res2) => {
        if (res2.run === undefined) {
          alert("Error occurred in writing to local storage");
        }
      }, onError);
    }, onError);
  }

  changeBlockElement(res1, run);
}, onError);

browser.storage.onChanged.addListener(applyStorageChange);
