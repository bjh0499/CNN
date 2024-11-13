const sl = browser.storage.local;
const urlInputDOM = document.querySelector("#urlInput");
const elemInputDOM = document.querySelector("#elemInput");
const blockContainerDOM = document.querySelector("#blockContainer");

document.querySelector("#addBlockButton").addEventListener("click", addBlock);
document.querySelector("#deleteAllButton").addEventListener("click", deleteAll);

function onError(error) {
  console.log(error);
}

initialize();

function initialize() {
  sl.get(null).then((result) => {
    displayBlockList(result);
  }, onError);
  return;
}

function displayBlockList(blockList) {
  const arr = [];
  for (let key in blockList) {
    const obj = { key, ...blockList[key] };
    arr.push(obj);
  }

  arr.sort((a, b) => a.key - b.key).forEach(addDiv);
  return;
}

function addBlock() {
  const urlInputValue = urlInputDOM.value.trim();
  const elemInputValue = elemInputDOM.value.trim();
  if (!urlInputValue || !elemInputValue) {
    alert("Empty value is not allowed");
    return;
  }
  const key = String(Date.now());
  const obj = {};
  obj[key] = {
    url: urlInputValue,
    block: elemInputValue,
    check: true,
  };

  sl.set(obj).then(() => {
    sl.get(key).then((result) => {
      if (!result[key]) {
        alert("Error occurred in storage access");
        return;
      }

      addDiv(result[key]);
    }, onError);
  }, onError);

  return;
}

function addDiv(result) {
  const div = document.createElement("div");
  div.textContent = `${result.url} ${result.block} ${result.check}`;
  blockContainerDOM.append(div);
}

function deleteAll() {
  return;
}

function deleteBlock() {
  return;
}

function toggleBlock() {
  return;
}
