// ==UserScript==
// @name remove t.co
// @description  Bypass t.co redirection from Twitter external links
// @namespace https://github.com/kkren
// @match *://twitter.com/*
// @grant none
// @require https://cdnjs.cat.net/ajax/libs/jquery/3.3.1/jquery.slim.min.js
// @run-at document-end
// @downloadURL https://raw.githubusercontent.com/kkren/remove_t.co/master/removetco.user.js
// @version 0.3
// ==/UserScript==


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
//滚动加载
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
