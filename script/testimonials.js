const interval = 5000;

const testimonials = [...document.querySelectorAll(".testimonial")];

// random number between -range/2 and range/2
const getRandomNum = range => Math.round((Math.random() - 0.5) * range);

let i = 0;
let z = 1000;
function toggleTestimonial() {
	i = i + 1 < testimonials.length ? i + 1 : 0; // loop over testimonials
	const currentPic = testimonials[i];
	const angle = getRandomNum(20);
	const offsetX = getRandomNum(20);
	const offsetY = getRandomNum(20);
	currentPic.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${angle}deg)`;
	currentPic.classList.add("visible");
	currentPic.style.zIndex = z;
	z++;
}

setInterval(toggleTestimonial, interval);
