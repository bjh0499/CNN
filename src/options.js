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

async function initialize() {
  try {
    const result = await sl.get(null);
    displayBlockList(result);
  } catch (err) {
    onError(err);
  }
}

function displayBlockList(blockList) {
  const arr = createBlockListArr(blockList);
  arr.sort((a, b) => a.key - b.key).forEach(addDiv);
}

async function addBlock() {
  const url = urlInputDOM.value.trim();
  const block = elemInputDOM.value.trim();
  if (!url || !block) {
    alert("Empty value is not allowed");
    return;
  }

  const key = String(Date.now());
  const obj = createBlockObj(key, url, block, true);

  try {
    await sl.set(obj);
    addDiv(obj[key]);
  } catch (err) {
    onError(err);
  }
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

async function deleteAll() {
  if (confirm("Are you sure want to deleting all block list?")) {
    try {
      const result = await sl.get(null);
      let count = 0;

      for (let key in result) {
        if (key === "run") {
          result[key] = false;
        } else {
          count++;
          result[key].check = false;
        }
      }

      if (!count) {
        return;
      }

      const time = 10 + parseInt(count / 10);

      setTimeout(() => {
        sl.set(result);
      }, time);

      setTimeout(() => {
        sl.clear();
      }, time * 2);

      setTimeout(() => {
        sl.set({ run: false });
      }, time * 3);

      setTimeout(() => {
        blockContainerDOM.textContent = "";
      }, time * 4);
    } catch (err) {
      onError(err);
    }
  }
}

async function deleteBlock(ev) {
  const parentNode = ev.target.parentNode;
  const key = String(parentNode.id);
  if (confirm("Are you sure want to deleting this block?")) {
    try {
      result = await sl.get(key);
      result[key].check = false;
      await sl.set(result);
      await sl.remove(key);
      parentNode.remove();
    } catch (err) {
      onError(err);
    }
  }
}

async function toggleBlock(ev) {
  const et = ev.target;
  const obj = createBlockObj(
    et.parentNode.id,
    et.nextSibling.textContent,
    et.nextSibling.nextSibling.textContent,
    et.checked
  );

  try {
    await sl.set(obj);
  } catch (err) {
    onError(err);
    et.checked = !et.checked;
  }
}
