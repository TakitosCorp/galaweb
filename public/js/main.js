document.getElementById("current-year").textContent = new Date().getFullYear();

const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");
let isOpen = false;

mobileMenuBtn.addEventListener("click", () => {
  isOpen = !isOpen;

  if (!isOpen) {
    mobileMenu.style.transform = "scaleY(0)";

    const menuItems = document.querySelectorAll(".mobile-menu-item");
    menuItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(-10px)";
    });

    setTimeout(() => {
      mobileMenu.classList.add("hidden");
    }, 300);

    line1.style.transform = "";
    line2.style.opacity = "1";
    line3.style.transform = "";
  } else {
    mobileMenu.classList.remove("hidden");

    const menuItems = document.querySelectorAll(".mobile-menu-item");
    menuItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(-10px)";
    });

    requestAnimationFrame(() => {
      mobileMenu.style.transform = "scaleY(1)";

      menuItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, 150 + index * 50);
      });
    });

    line1.style.transform = "rotate(45deg) translate(5px, 5px)";
    line2.style.opacity = "0";
    line3.style.transform = "rotate(-45deg) translate(5px, -5px)";
  }
});

const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("shadow-lg");
    header.classList.remove("shadow-md");
  } else {
    header.classList.remove("shadow-lg");
    header.classList.add("shadow-md");
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      if (isOpen) {
        mobileMenuBtn.click();
      }
    }
  });
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
