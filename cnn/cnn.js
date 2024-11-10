(function () {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function cnn() {
    const URI = document.documentURI;
    if (
      URI.indexOf("n.news.naver.com") >= 0 ||
      URI.indexOf("comic.naver.com/webtoon/detail") >= 0
    ) {
      document.querySelector("#cbox_module").style.visibility = "hidden";
    } else if (URI.indexOf("mozilla.org") >= 0) {
      document.querySelector("#outer-wrapper").style.visibility = "hidden";
    }
  }

  function reset() {
    const URI = document.documentURI;
    if (
      URI.indexOf("n.news.naver.com") >= 0 ||
      URI.indexOf("comic.naver.com/webtoon/detail") >= 0
    ) {
      document.querySelector("#cbox_module").style.visibility = "visible";
    } else if (URI.indexOf("mozilla.org") >= 0) {
      document.querySelector("#outer-wrapper").style.visibility = "visible";
    }
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "cnn") {
      cnn();
    } else {
      reset();
    }
  });
})();
