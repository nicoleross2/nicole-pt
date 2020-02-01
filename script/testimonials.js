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
