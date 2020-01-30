// --------------- header ----------------

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

// ------------ testimonials -------------

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

// setInterval(toggleTestimonial, interval);

// ------------ / -------------
