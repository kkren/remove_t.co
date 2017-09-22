// ==UserScript==
// @name remove t.co
// @description  Bypass t.co redirection from Twitter external links
// @namespace https://github.com/kkren
// @match *://twitter.com/*
// @grant none
// @require https://cdn.bootcss.com/jquery/2.1.4/jquery.min.js
// @run-at document-end
// @downloadURL https://raw.githubusercontent.com/kkren/remove_t.co/master/removetco.user.js
// @version 0.3
// ==/UserScript==
// function async_load() {
//   var s = document.createElement("script");
//   s.type = "text/javascript";
//   s.async = true;
//   s.src = "https://cdn.bootcss.com/jquery/2.1.4/jquery.min.js";
//   var x = document.getElementsByTagName("script")[0];
//   x.parentNode.insertBefore(s, x);
// }

function replace() {
  var i = 0;
  var urls = $("[href*='t.co']").length;
  for (; i < urls; i++) {
    if ($("[href*='t.co']").eq(i).attr("data-expanded-url") != undefined) {
      var expanded = $("[href*='t.co']").eq(i).attr("data-expanded-url");
    } else {
      var expanded = $("[href*='t.co']").eq(i).attr("title");
    }
    $("[href*='t.co']").eq(i).attr("href", expanded);
  }
}
//异步加载
// if (window.attachEvent) window.attachEvent("onload", async_load);
// else window.addEventListener("load", async_load, false);

mo = new MutationObserver(function(allmutations) {
  //alert();
  replace();
});
var targets = document.body;
mo.observe(targets, {
  'childList': true,
  'characterData': true,
  'subtree': true
});
replace();
