const loadVideo = (liteYT, videoId) => {
  liteYT.setAttribute("videoid", videoId);
};

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const videoContainer = document.getElementById("videos-container");

  fetch("/youtube-feed", {
    headers: {
      Accept: "application/xml",
    },
  })
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((data) => {
      const entries = data.getElementsByTagName("entry");
      const videos = [];
      for (let i = 0; i < entries.length; i++) {
        const videoId = entries[i].getElementsByTagName("yt:videoId")[0].textContent;
        let title = entries[i].getElementsByTagName("title")[0].textContent;
        const views = entries[i].getElementsByTagName("media:statistics")[0].getAttribute("views");
        const rating = entries[i].getElementsByTagName("media:starRating")[0].getAttribute("average");
        if (title.includes("#galalive")) {
          continue;
        }
        title = title.split("||")[0].trim();
        videos.push({
          videoId,
          title,
          views,
          rating,
        });
      }

      videoContainer.innerHTML = "";

      videos.forEach((video, index) => {
        const videoElement = document.createElement("div");
        videoElement.className =
          "bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl";
        videoElement.innerHTML = `
          <div class="p-4 bg-gradient-primary text-white font-bold text-center h-24 flex items-center justify-center">
            ${video.title}
          </div>
          <div class="p-4">
            <div class="aspect-video w-full rounded-lg overflow-hidden mb-4">
              <lite-youtube videoid="${video.videoId}" vnum="${index}" class="w-full h-full rounded-lg"></lite-youtube>
            </div>
            <div class="text-gray-600 text-sm">
              <p><strong>Visitas:</strong> ${video.views}</p>
            </div>
          </div>
        `;
        videoContainer.appendChild(videoElement);
      });

      setTimeout(() => {
        loader.style.display = "none";
        videoContainer.classList.remove("hidden");
      }, 2000);
    })
    .catch((error) => {
      console.error("Error cargando videos:", error);
      loader.style.display = "none";
    });
});
