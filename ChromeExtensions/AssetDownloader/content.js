// This code should be added to your content script

// Find all video links on the page
const videoLinks = Array.from(document.querySelectorAll("a[href$='.mp4'], a[href$='.avi'], a[href$='.mov']"));

// Create links to download the video files
videoLinks.forEach((link) => {
  const downloadLink = document.createElement("a");
  downloadLink.textContent = link.textContent;
  downloadLink.href = link.href;
  downloadLink.download = true;

  // Log the download link to the console
  console.log(downloadLink.href);
});
