chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: function () {
            console.log("ChatGPTDev - Is this working?");
            let videos = document.getElementsByTagName('video');
            let videoLinks = '';
            for (let i = 0; i < videos.length; i++) {
                let sources = videos[i].getElementsByTagName('source');
                for (let j = 0; j < sources.length; j++) {
                    videoLinks += '<a href="' + sources[j].src + '" download>' + sources[j].src + '</a><br>';
                }
            }
            document.getElementById('videos').innerHTML = videoLinks;
        }
    });
});
