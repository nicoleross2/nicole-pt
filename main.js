//*
// ------------------------ Header ----------------------------

const header = document.querySelector(".main-header");

function updateHeader() {
	if (window.scrollY > 50) header.classList.add("detached");
	else header.classList.remove("detached");
}

const scroll = {
	interval: 200,
	isReady: true,
	debounce() {
		if (!this.isReady) return;
		this.isReady = false;
		setTimeout(() => {
			updateHeader(); // after timeout so that window.scrollY is read after the scroll, not before
			this.isReady = true;
		}, this.interval);
	}
};

window.addEventListener("scroll", () => scroll.debounce());

// ---------------------- Testimonials -------------------------

const interval = 5000;

const testimonials = [...document.querySelectorAll(".testimonial")];

let i = 0;
let z = 1000;
function toggleTestimonial() {
	i = i + 1 < testimonials.length ? i + 1 : 0;
	const currentPic = testimonials[i];
	const angle = Math.round((Math.random() - 0.5) * 20);
	currentPic.style.transform = `rotate(${angle}deg)`;
	currentPic.classList.add("visible");
	currentPic.style.zIndex = z;
	z++;
}

setInterval(toggleTestimonial, interval);

// ------------------------- Gallery ----------------------------

const feed = document.querySelector("#ig-feed");
const toggle = document.querySelector("#toggle-feed");

// Expand/collapse gallery

toggle.addEventListener("click", () => {
	feed.classList.toggle("open");
	toggle.classList.toggle("open");
});

// GET & render

const fallbackImg = "https://imgpile.com/images/ItvXFr.jpg";

const fallbackPics = (function(length = 12) {
	return Array.from({ length }, () => fallbackImg);
})();

function renderPics(pics) {
	// trim array to avoid a gap at the bottom of the gallery
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

function loadGallery() {
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
}

loadGallery();

//*/
