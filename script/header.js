const header = document.querySelector(".main-header");
const toggle = header.querySelector(".nav-toggle");
const navLinks = header.querySelectorAll("nav a");

// -------------------- full screen toggle ------------------

// toggle nav menu full-screen view
toggle.addEventListener("click", () =>
	document.documentElement.classList.toggle("expanded")
);

// exit nav menu full-screen on nav link click
navLinks.forEach(link =>
	link.addEventListener("click", () =>
		document.documentElement.classList.remove("expanded")
	)
);

// exit nav menu full-screen if screen is no longer narrow
window.addEventListener("resize", () => {
	if (!toggle.offsetParent)
		document.documentElement.classList.remove("expanded");
});

// -------------------- fixed pos toggle ------------------

// make header bg transparent when window is not at top of doc
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
			updateHeader(); // do after timeout so that window.scrollY is taken after window finished scrolling
			this.isReady = true;
		}, this.interval);
	}
};

window.addEventListener("scroll", () => scroll.debounce());
