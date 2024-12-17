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

async function initialize() {
  blockContainerInitialize();

  try {
    const result = await sl.get(null);
    displayBlockList(result);
  } catch (err) {
    onError(err);
  }
}

function blockContainerInitialize() {
  const div = document.createElement("div");
  div.className = "blockList";

  const checkHeaderDiv = document.createElement("div");
  const urlHeaderDiv = document.createElement("div");
  const blockHeaderDiv = document.createElement("div");
  const delButtonHeaderDiv = document.createElement("div");

  checkHeaderDiv.textContent = "Block Check";
  urlHeaderDiv.textContent = "URL";
  blockHeaderDiv.textContent = "Block Element";
  delButtonHeaderDiv.textContent = "Remove";

  div.append(checkHeaderDiv, urlHeaderDiv, blockHeaderDiv, delButtonHeaderDiv);
  for (const childDiv of div.childNodes) {
    childDiv.classList.add("padding-5", "divHeader");
  }

  blockContainerDOM.append(div);
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

  const checkDiv = document.createElement("div");
  const check = document.createElement("input");
  const urlDiv = document.createElement("div");
  const blockDiv = document.createElement("div");
  const delButtonDiv = document.createElement("div");
  const delButton = document.createElement("button");

  div.id = result.key;
  div.className = "blockList";

  urlDiv.textContent = result.url;
  blockDiv.textContent = result.block;

  check.type = "checkbox";
  check.checked = result.check;
  check.addEventListener("change", (ev) => toggleBlock(ev));
  checkDiv.append(check);

  delButton.addEventListener("click", (ev) => deleteBlock(ev));
  delButton.textContent = "Remove";
  delButtonDiv.append(delButton);

  div.append(checkDiv, urlDiv, blockDiv, delButtonDiv);
  for (const childDiv of div.childNodes) {
    childDiv.classList.add("padding-5", "divCell");
  }

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
        blockContainerInitialize();
      }, time * 4);
    } catch (err) {
      onError(err);
    }
  }
}

async function deleteBlock(ev) {
  const parentNode = ev.target.parentNode.parentNode;
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
