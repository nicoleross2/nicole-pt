const currentYear = new Date().getFullYear();
const containers = document.querySelectorAll(".current-year");

containers.forEach((container) => (container.innerHTML = currentYear));
