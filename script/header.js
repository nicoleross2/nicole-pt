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
