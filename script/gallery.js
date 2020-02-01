const feed = document.querySelector("#ig-feed");
const toggle = document.querySelector("#toggle-feed");

// Expand/collapse gallery

toggle.addEventListener("click", () => {
	feed.classList.toggle("open");
	toggle.classList.toggle("open");
});

// GET & render

// const fallbackPics = (function(length = 12) {
// 	return Array.from({ length }, () => fallbackImgs[0]);
// })();

const fallbackPics = [
	"https://imgpile.com/images/ItvXFr.jpg",
	"https://imgpile.com/images/1PvkEj.jpg",
	"https://imgpile.com/images/1PvOXx.jpg",
	"https://imgpile.com/images/1PvLDL.jpg",
	"https://imgpile.com/images/1Pv2y1.jpg",
	"https://imgpile.com/images/1PvqLP.jpg",
	"https://imgpile.com/images/1PvoJW.jpg",
	"https://imgpile.com/images/1PvH7N.jpg",
	"https://imgpile.com/images/1PvVFc.jpg",
	"https://imgpile.com/images/1Pv8fg.jpg"
];

function renderPics(pics) {
	// avoid a gap at the bottom of the gallery
	pics.length = pics.length - (pics.length % 3);

	feed.innerHTML = pics
		.map(
			item => `
			<figure class="figure">
				<img src="${item.media_url || item}" />	
				<figcaption class="caption">
					${item.caption || "Error: connection with Instagram failed"}
					</figcaption>
				</figure>
				`
			//<a href="${item.permalink || item}">IG</a>
		)
		.join("");
}

fetch(
	"https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=IGQVJXYjRzdUtGTlFPNzhrUmdjRjBoNk50b3ByTVR0WjczRFk0dXZAJNkdvQVNObjVFcGRzWjJBQ2NVTS1zUXlnRFNPWUxSOWNVOS1uSHdIbWVjVXF5cWUweG05YXpnTkViX015LWRycUZAZAaXRBa1NUQU1MRTJoZAzg1RmJN"
)
	.then(function(response) {
		if (response.status === 200)
			response.json().then(data => renderPics(data.data));
		else renderPics(fallbackPics);
	})
	.catch(function(err) {
		console.log("Fetch Error :-S", err);
	});
