const feed = document.querySelector("#ig-feed");
const galleryToggle = document.querySelector("#toggle-feed");

// Expand/collapse gallery

galleryToggle.addEventListener("click", () => {
	feed.classList.toggle("open");
	galleryToggle.classList.toggle("open");
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
	"https://imgpile.com/images/1Pv8fg.jpg",
];

// Download image and run callback when done
function preloadImage(url, imageLoadedCallback /*, imgErrorCallback */) {
	var img = new Image();
	img.src = url;
	img.onload = imageLoadedCallback;
	// img.onerror = imgErrorCallback;
}

function insertImage(url, caption) {
	const imageHtml = `
	<figure class="figure">
		<img src="${url}" alt="Instagram image"/>	
		<figcaption class="caption">
			${caption || "Error: connection with Instagram failed"}
			</figcaption>
		</figure>
		`;
	feed.innerHTML += imageHtml;
}

function renderPics(pics) {
	// avoid a gap at the bottom of the gallery
	pics.length = pics.length - (pics.length % 3);

	pics.forEach((pic) => {
		const url = pic.media_url || pic;
		const caption = pic.caption;
		preloadImage(url, () => {
			insertImage(url, caption);
		});
	});
}

fetch(
	"https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=IGQVJVRXBtSTJPTEVOakY1WngyZA2hpN1FRTWRHcFVGS2plc19GYlc2NHk1cFNUVTBYdUtjU1BnNHQ4WW9vcjUyYW14eUNJeGlNaEc3VVRmTEl0MzFCUWFmOUJ1a0MtT1NObHVualhB"
)
	.then(function (response) {
		if (response.status === 200)
			response.json().then((data) => renderPics(data.data));
		else renderPics(fallbackPics);
	})
	.catch(function (err) {
		console.log("Fetch Error :-S", err);
	});
