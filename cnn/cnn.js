const sl = browser.storage.local;

function onError(error) {
  console.log(error);
}

function changeBlockElement(blockList, hidden) {
  const arr = [];
  for (let key in blockList) {
    if (key === "run") {
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
        hidden && el.block ? "hidden" : "visible";
    }
  }
}

sl.get(null).then((result) => {
  const run = result.run;
  if (run === undefined) {
    sl.set({ run: false }).then(() => {
      sl.get("run").then((result) => {
        const run = result.run;
        if (run === undefined) {
          alert("Error occurred in writing to local storage");
        }
      }, onError);
    }, onError);
  }

  changeBlockElement(result, run);
}, onError);
