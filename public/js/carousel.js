const carousel = document.getElementById("carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.querySelectorAll("#carousel-dots button");

let currentSlide = 0;
const totalSlides = 3;

function goToSlide(index) {
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;

  carousel.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.remove("opacity-50");
      dot.classList.add("opacity-100");
    } else {
      dot.classList.remove("opacity-100");
      dot.classList.add("opacity-50");
    }
  });

  currentSlide = index;
}

prevBtn.addEventListener("click", () => goToSlide(currentSlide - 1));
nextBtn.addEventListener("click", () => goToSlide(currentSlide + 1));

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => goToSlide(index));
});

let slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);

carousel.addEventListener("mouseenter", () => clearInterval(slideInterval));
carousel.addEventListener("mouseleave", () => {
  slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
});

const animateElements = document.querySelectorAll("[data-aos]");

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("opacity-100", "translate-y-0");
      entry.target.classList.remove("opacity-0", "translate-y-8");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animateElements.forEach((el) => {
  el.classList.add("opacity-0", "translate-y-8", "transition-all", "duration-700");
  observer.observe(el);
});
