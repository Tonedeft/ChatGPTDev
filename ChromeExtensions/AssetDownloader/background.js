// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.action == "downloadAllVideos") {
//       chrome.scripting.executeScript({
//         target: {tabId: sender.tab.id},
//         files: ["download.js"]
//       }, function() {
//         chrome.tabs.sendMessage(sender.tab.id, {action: "showDownloadLinks"}, function(response) {
//           console.log(response);
//         });
//       });
//     }
//   });
  