// Mobile menu toggle
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Mentor carousel
const mentorSlides = document.querySelectorAll(".mentor-slide");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
let currentSlide = 0;

function showSlide(n) {
  mentorSlides[currentSlide].style.display = "none";
  currentSlide = (n + mentorSlides.length) % mentorSlides.length;
  mentorSlides[currentSlide].style.display = "block";
}

prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));

// Initialize the first slide
showSlide(0);

// Simple testimonial carousel
const testimonials = document.querySelectorAll(".testimonial");
let currentTestimonial = 0;

function showNextTestimonial() {
  testimonials[currentTestimonial].classList.remove("active");
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  testimonials[currentTestimonial].classList.add("active");
}

setInterval(showNextTestimonial, 5000); // Change testimonial every 5 seconds

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// NAvbar
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  const dropdownItems = document.querySelectorAll('.has-dropdown');

  mobileMenuToggle.addEventListener('click', function() {
      navList.classList.toggle('show');
  });

  dropdownItems.forEach(item => {
      item.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
              e.preventDefault();
              this.classList.toggle('active');
              const dropdownArrow = this.querySelector('.dropdown-arrow');
              dropdownArrow.textContent = this.classList.contains('active') ? '▲' : '▼';
          }
      });
  });

  window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
          navList.classList.remove('show');
          dropdownItems.forEach(item => {
              item.classList.remove('active');
              item.querySelector('.dropdown-arrow').textContent = '▼';
          });
      }
  });
});
