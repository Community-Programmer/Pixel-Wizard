// NAVBAR
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

document.addEventListener("DOMContentLoaded", () => {
  // Navigation
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    // Toggle Nav
    nav.classList.toggle("nav-active");

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });

    // Burger Animation
    burger.classList.toggle("toggle");
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Testimonial Slider
  const testimonialSlider = document.querySelector(".testimonial-slider");
  let isDown = false;
  let startX;
  let scrollLeft;

  testimonialSlider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - testimonialSlider.offsetLeft;
    scrollLeft = testimonialSlider.scrollLeft;
  });

  testimonialSlider.addEventListener("mouseleave", () => {
    isDown = false;
  });

  testimonialSlider.addEventListener("mouseup", () => {
    isDown = false;
  });

  testimonialSlider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - testimonialSlider.offsetLeft;
    const walk = (x - startX) * 3;
    testimonialSlider.scrollLeft = scrollLeft - walk;
  });

  // Form Validation and Submission
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simple form validation
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
      // Simulate form submission
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    } else {
      alert("Please fill in all fields.");
    }
  });

  // Intersection Observer for animations
  const faders = document.querySelectorAll(".fade-in");
  const sliders = document.querySelectorAll(".slide-in");

  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px",
  };

  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });

  sliders.forEach((slider) => {
    appearOnScroll.observe(slider);
  });

  // Parallax effect for hero section
  const hero = document.querySelector(".hero");
  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrollPosition * 0.7}px`;
  });

  // Animated counter for some statistics
  const counters = document.querySelectorAll(".counter");
  const speed = 200;

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
});
