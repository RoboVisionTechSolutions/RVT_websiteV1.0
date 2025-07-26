/**
* Template Name: Remember
* Template URL: https://bootstrapmade.com/remember-free-multipurpose-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/**
 * Skills Carousel Functionality - COMMENTED OUT
 */
/*
let currentSkillIndex = 1;
const totalSkills = 7;
let autoSlideInterval;

function updateSkillDisplay() {
  // Hide all slides
  const slides = document.querySelectorAll('.skill-slide');
  const indicators = document.querySelectorAll('.indicator');
  
  slides.forEach((slide, index) => {
    const slideNumber = index + 1;
    if (slideNumber === currentSkillIndex) {
      slide.style.opacity = '1';
      slide.style.transform = 'translateX(0)';
      slide.classList.add('active');
    } else if (slideNumber < currentSkillIndex) {
      slide.style.opacity = '0';
      slide.style.transform = 'translateX(-100%)';
      slide.classList.remove('active');
    } else {
      slide.style.opacity = '0';
      slide.style.transform = 'translateX(100%)';
      slide.classList.remove('active');
    }
  });
  
  // Update indicators
  indicators.forEach((indicator, index) => {
    if (index + 1 === currentSkillIndex) {
      indicator.style.background = '#00ff7f';
      indicator.style.transform = 'scale(1.2)';
      indicator.classList.add('active');
    } else {
      indicator.style.background = 'rgba(255,255,255,0.3)';
      indicator.style.transform = 'scale(1)';
      indicator.classList.remove('active');
    }
  });
  
  // Update counter
  const currentSkillElement = document.getElementById('current-skill');
  if (currentSkillElement) {
    currentSkillElement.textContent = currentSkillIndex;
  }
}

function changeSkill(direction) {
  currentSkillIndex += direction;
  
  if (currentSkillIndex > totalSkills) {
    currentSkillIndex = 1;
  } else if (currentSkillIndex < 1) {
    currentSkillIndex = totalSkills;
  }
  
  updateSkillDisplay();
  resetAutoSlide();
}

function goToSkill(skillNumber) {
  currentSkillIndex = skillNumber;
  updateSkillDisplay();
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    changeSkill(1);
  }, 4000); // Change slide every 4 seconds
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Enhanced button hover effects
function addCarouselButtonEffects() {
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (prevBtn) {
    prevBtn.addEventListener('mouseenter', () => {
      prevBtn.style.transform = 'scale(1.1) translateY(-2px)';
      prevBtn.style.boxShadow = '0 8px 25px rgba(0,255,127,0.5)';
    });
    
    prevBtn.addEventListener('mouseleave', () => {
      prevBtn.style.transform = 'scale(1) translateY(0)';
      prevBtn.style.boxShadow = '0 5px 15px rgba(0,255,127,0.3)';
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('mouseenter', () => {
      nextBtn.style.transform = 'scale(1.1) translateY(-2px)';
      nextBtn.style.boxShadow = '0 8px 25px rgba(0,191,255,0.5)';
    });
    
    nextBtn.addEventListener('mouseleave', () => {
      nextBtn.style.transform = 'scale(1) translateY(0)';
      nextBtn.style.boxShadow = '0 5px 15px rgba(0,191,255,0.3)';
    });
  }
}

// Keyboard navigation
function addKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    const carousel = document.querySelector('.skills-carousel-wrapper');
    if (!carousel) return;
    
    // Check if carousel is in viewport
    const rect = carousel.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          changeSkill(-1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          changeSkill(1);
          break;
        case ' ': // Spacebar
          e.preventDefault();
          changeSkill(1);
          break;
      }
    }
  });
}

// Touch/Swipe support for mobile
function addTouchSupport() {
  const carousel = document.querySelector('.skills-container');
  if (!carousel) return;
  
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });
  
  carousel.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
    
    const deltaX = startX - endX;
    const deltaY = startY - endY;
    
    // Only process horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        changeSkill(1); // Swipe left - next skill
      } else {
        changeSkill(-1); // Swipe right - previous skill
      }
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure all elements are rendered
  setTimeout(() => {
    updateSkillDisplay();
    startAutoSlide();
    addCarouselButtonEffects();
    addKeyboardNavigation();
    addTouchSupport();
    
    // Pause auto-slide when user hovers over carousel
    const carouselWrapper = document.querySelector('.skills-carousel-wrapper');
    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
      });
      
      carouselWrapper.addEventListener('mouseleave', () => {
        startAutoSlide();
      });
    }
  }, 500);
});
*/