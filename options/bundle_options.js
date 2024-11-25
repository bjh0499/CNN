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

function createBlockObj(key, url, block, check) {
  const obj = {};
  obj[key] = {
    key,
    url,
    block,
    check,
  };
  return obj;
}

function onError(err) {
  console.error(err);
}

const sl = browser.storage.local;
const urlInputDOM = document.querySelector("#urlInput");
const elemInputDOM = document.querySelector("#elemInput");
const blockContainerDOM = document.querySelector("#blockContainer");

document.querySelector("#addBlockButton").addEventListener("click", addBlock);
document.querySelector("#deleteAllButton").addEventListener("click", deleteAll);

initialize();

function initialize() {
  sl.get(null).then((result) => {
    displayBlockList(result);
  }, onError);
  return;
}

function displayBlockList(blockList) {
  const arr = createBlockListArr(blockList);
  arr.sort((a, b) => a.key - b.key).forEach(addDiv);
}

function addBlock() {
  const url = urlInputDOM.value.trim();
  const block = elemInputDOM.value.trim();
  if (!url || !block) {
    alert("Empty value is not allowed");
    return;
  }

  const key = String(Date.now());
  const obj = createBlockObj(key, url, block, true);

  sl.set(obj).then(() => {
    addDiv(obj[key]);
  }, onError);
}

function addDiv(result) {
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
    sl.get(null).then((result) => {
      for (let key in result) {
        if (key === "run") {
          result[key] = false;
        } else {
          result[key].check = false;
        }
      }
      sl.set(result).then(() => {
        sl.clear().then(() => {
          sl.set({ run: false }).then(() => {
            blockContainerDOM.textContent = "";
          }, onError);
        }, onError);
      }, onError);
    }, onError);
  }
}

function deleteBlock(ev) {
  const parentNode = ev.target.parentNode;
  const key = String(parentNode.id);
  if (confirm("Are you sure deleting this block?")) {
    sl.get(key).then((result) => {
      result[key].check = false;
      sl.set(result).then(() => {
        sl.remove(key).then(() => {
          parentNode.remove();
        }, onError);
      }, onError);
    }, onError);
  }
}

function toggleBlock(ev) {
  const et = ev.target;
  const obj = createBlockObj(
    et.parentNode.id,
    et.nextSibling.textContent,
    et.nextSibling.nextSibling.textContent,
    et.checked
  );

  et.checked = !et.checked;
  sl.set(obj).then(() => {
    et.checked = !et.checked;
  }, onError);
}
