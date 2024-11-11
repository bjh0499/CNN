async function saveOptions(e) {
  e.preventDefault();
  await browser.storage.sync.set({
    url: document.querySelector("#url").value,
    block: document.querySelector("#block").value,
  });
}

async function restoreOptions() {
  let res = await browser.storage.managed.get("url");
  let url = res.url;
  res = await browser.storage.managed.get("block");
  let block = res.block;
  document.querySelector("#managed-data").innerText = `${url}, ${block}`;

  res = await browser.storage.sync.get("url");
  document.querySelector("#url").value = res.url || "URL";
  res = await browser.storage.sync.get("block");
  document.querySelector("#block").value = res.block || "Block Element";
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
