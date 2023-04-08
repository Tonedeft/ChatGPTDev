chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    console.log(details);
    return { cancel: false };
  },
  { urls: ["<all_urls>"] },
  ["extraHeaders", "requestBody"]
);

// chrome.runtime.onInstalled.addListener(() => {
//   const rule = {
//     id: "log_request",
//     priority: 1,
//     action: {
//       type: "log"
//     },
//     condition: {
//       urlFilter: ["<all_urls>"]
//     }
//   };

//   chrome.declarativeNetRequest.updateRules({
//     removeRuleIds: ["log_request"],
//     addRules: [rule]
//   });
// });