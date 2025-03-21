document.getElementById("current-year").textContent = new Date().getFullYear();

const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuItems = document.querySelectorAll(".mobile-menu-item");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");
let isOpen = false;

function animateItems(show) {
  menuItems.forEach((item, index) => {
    setTimeout(
      () => {
        item.style.transform = show ? "translateX(0)" : "translateX(2rem)";
        item.style.opacity = show ? "1" : "0";
      },
      show ? index * 100 + 300 : 0  // Retrasamos la animación de los items
    );
  });
}

mobileMenuBtn.addEventListener("click", function () {
  isOpen = !isOpen;

  if (!isOpen) {
    mobileMenu.style.transform = "translateX(100%)";
    animateItems(false);
    setTimeout(() => {
      mobileMenu.classList.add("hidden");
    }, 300);

    line1.style.transform = "";
    line2.style.opacity = "1";
    line3.style.transform = "";
  } else {
    mobileMenu.classList.remove("hidden");
    setTimeout(() => {
      mobileMenu.style.transform = "translateX(0)";
      animateItems(true);
    }, 10);

    line1.style.transform = "rotate(45deg) translate(5px, 5px)";
    line2.style.opacity = "0";
    line3.style.transform = "rotate(-45deg) translate(5px, -5px)";
  }
});

const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("shadow-lg");
    header.classList.remove("shadow-md");
  } else {
    header.classList.remove("shadow-lg");
    header.classList.add("shadow-md");
  }
});

const bubblesContainer = document.getElementById("bubbles-container");
for (let i = 0; i < 50; i++) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  const size = Math.random() * 60 + 10;
  const left = Math.random() * 100;
  const delay = Math.random() * 15;
  const duration = Math.random() * 10 + 10;

  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${left}%`;
  bubble.style.bottom = "-100px";
  bubble.style.animationDuration = `${duration}s`;
  bubble.style.animationDelay = `${delay}s`;

  bubblesContainer.appendChild(bubble);
}

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
