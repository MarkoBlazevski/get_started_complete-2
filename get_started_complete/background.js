// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
	  new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostSuffix: 'imdb.com'},
      }),
	  new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostSuffix: 'rottentomatoes.com'},
      }),
	  new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostSuffix: 'metacritic.com'},
      }),
	  new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostSuffix: 'fandango.com'},
      })
	  ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
chrome.runtime.onMessage.addListener(function (msg, sender) {
  // First, validate the message's structure
  if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
    // Enable the page-action for the requesting tab
    chrome.pageAction.show(sender.tab.id);
  }
});