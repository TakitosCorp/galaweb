const menuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
let isMenuOpen = false;

menuBtn.addEventListener("click", () => {
  if (!isMenuOpen) {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("mobile-menu-open");
    menuBtn.classList.add("active");
    isMenuOpen = true;
  } else {
    mobileMenu.classList.add("mobile-menu-close");
    menuBtn.classList.remove("active");

    setTimeout(() => {
      mobileMenu.classList.remove("mobile-menu-open", "mobile-menu-close");
      mobileMenu.classList.add("hidden");
      isMenuOpen = false;
    }, 300);
  }
});

const mobileLinks = mobileMenu.querySelectorAll("a");
mobileLinks.forEach((link, index) => {
  link.style.opacity = "0";
  link.style.transform = "translateY(-10px)";
  link.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  link.style.transitionDelay = `${index * 0.05}s`;

  menuBtn.addEventListener("click", () => {
    if (isMenuOpen) {
      setTimeout(() => {
        link.style.opacity = "1";
        link.style.transform = "translateY(0)";
      }, 100);
    }
  });
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (isMenuOpen) {
      menuBtn.click();
    }
  });
});

window.addEventListener("scroll", () => {
  if (isMenuOpen && window.scrollY > 50) {
    menuBtn.click();
  }
});
