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
    if (key === "run") {
      continue;
    }
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
    key: key,
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
  console.log(result);
  const div = document.createElement("div");

  const check = document.createElement("input");
  const urlDiv = document.createElement("div");
  const blockDiv = document.createElement("div");
  const delButton = document.createElement("button");

  div.id = result.key;
  div.className = "blockList";

  urlDiv.textContent = result.url;
  blockDiv.textContent = result.block;

  check.type = "checkbox";
  check.checked = result.check;
  check.addEventListener("change", (ev) => toggleBlock(ev));

  delButton.addEventListener("click", (ev) => deleteBlock(ev));

  div.append(check, urlDiv, blockDiv, delButton);
  blockContainerDOM.append(div);
}

function deleteAll() {
  if (confirm("Are you sure deleting all block list?")) {
    sl.clear().then(() => {
      blockContainerDOM.textContent = "";
    }, onError);
  }
  return;
}

function deleteBlock(ev) {
  const key = ev.target.parentNode.id;
  if (confirm("Are you sure deleting this block?")) {
    console.log(key);
    sl.remove(String(key)).then(() => {
      ev.target.parentNode.remove();
    }, onError);
  }
  return;
}

function toggleBlock(ev) {
  const et = ev.target;
  console.log(et);
  et.checked = !et.checked;
  const key = String(et.parentNode.id);
  const obj = {};
  obj[key] = {
    key,
    url: et.nextSibling.textContent,
    block: et.nextSibling.nextSibling.textContent,
    check: !et.checked,
  };

  sl.set(obj).then(() => {
    sl.get(key).then((result) => {
      if (!result[key]) {
        alert("Error occurred in storage access");
        return;
      }

      et.checked = !et.checked;
    }, onError);
  }, onError);
  return;
}
