
// Specify the domains we want to log outgoing requests to
const domains = ['facebook.com', 'google.com', 'amazon.com'];

// Log the details of the request when it is sent
function logRequest(details) {
    console.log(`Request to ${details.url} with method ${details.method} and headers ${JSON.stringify(details.requestHeaders)}`);
}

chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        logRequest(details);
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'User-Agent') {
                details.requestHeaders.splice(i, 1);
                break;
            }
        }
        return { requestHeaders: details.requestHeaders };
    },
    { urls: ["<all_urls>"] },
    ["blocking", "requestHeaders"]
);


// // Add a listener for outgoing requests
// chrome.webRequest.onBeforeRequest.addListener(
//     function (details) {
//         console.log("LBBA - FIRST LISTENER");
//         // Check if the request is going to one of the specified domains
//         logRequest(details);
//         const url = new URL(details.url);
//         const hostname = url.hostname;
//         if (domains.includes(hostname)) {
//             // Log the details of the request
//             //   logRequest(details);
//             console.log("LBBA - this is a tracked website");
//         }
//     },
//     { urls: ["<all_urls>"] },
//     ['blocking', 'extraHeaders']
// );

// chrome.webRequest.onBeforeRequest.addListener(
//     function (details) {
//         console.log("LBBA SECOND LISTENER");
//         console.log(details.url);
//     },
//     { urls: ["<all_urls>"] },
//     ["blocking", 'extraHeaders']
// );