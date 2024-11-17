import createBlockListArr from "../util/createBlockListArr";
import createBlockObj from "../util/createBlockObj";
import onError from "../util/onError";

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

  const obj = createBlockObj(String(Date.now()), url, block, true);

  sl.set(obj).then(() => {
    addDiv(result[key]);
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
    // TODO: 모든 요소를 활성화
    sl.clear().then(() => {
      sl.set({ run: false }).then(() => {
        blockContainerDOM.textContent = "";
      }, onError);
    }, onError);
  }
}

function deleteBlock(ev) {
  const parentNode = ev.target.parentNode;
  const key = parentNode.id;
  if (confirm("Are you sure deleting this block?")) {
    // TODO: 삭제하려는 요소를 활성화
    sl.remove(String(key)).then(() => {
      parentNode.remove();
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
