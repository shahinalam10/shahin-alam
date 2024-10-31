(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Debounce function to optimize scroll events
   */
  const debounce = (func, wait = 20) => {
    let timeout;
    return (...args) => {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  window.addEventListener('scroll', debounce(navbarlinksActive));

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    });
  };



// Nav icon animation for small screen
const mobileToggle = document.querySelector('.mobile-nav-toggle');
const header = document.getElementById('header');

mobileToggle.addEventListener('click', () => {
  header.classList.toggle('mobile-nav-active');
});



  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      backtotop.classList.toggle('active', window.scrollY > 100);
    };
    window.addEventListener('load', toggleBacktotop);
    window.addEventListener('scroll', debounce(toggleBacktotop));
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  /**
   * Scroll with offset on links with .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault();
      const body = select('body');
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active');
        const navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollto(this.hash);
    }
  }, true);

  /**
   * Scroll with offset on page load with hash links in the URL
   */
  window.addEventListener('load', () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });

  /**
   * Preloader
   */
  const preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed');
  if (typed) {
    let typedStrings = typed.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings: typedStrings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }



  // Add the animated class when the about-content is in view
document.addEventListener('DOMContentLoaded', function() {
  const aboutContent = document.querySelector('.about-content');

  window.addEventListener('scroll', function() {
    const aboutPosition = aboutContent.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (aboutPosition < screenPosition) {
      aboutContent.classList.add('animated');
    }
  });
});


//certificate modal

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('show.bs.modal', () => {
    setTimeout(() => {
      modal.querySelector('.modal-certificate-img').classList.add('fade-in');
    }, 200);
  });

  modal.addEventListener('hide.bs.modal', () => {
    modal.querySelector('.modal-certificate-img').classList.remove('fade-in');
  });
});





  /**
   * Common function to animate elements on scroll (used for both skills and training)
   */
  const animateOnScroll = (selector) => {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('show');
          }, index * 260);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
  };

  document.addEventListener("DOMContentLoaded", function() {
    animateOnScroll('.skill-card');
    animateOnScroll('.training-card');
  });

  /**
   * Portfolio isotope and filter
   */
  document.addEventListener('DOMContentLoaded', function () {
    const portfolioContainer = select('.isotope-container');
    if (portfolioContainer) {
      new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });
    }

    // Initialize Glightbox for portfolio previews
    GLightbox({ selector: '.glightbox' });
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})();




// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from reloading the page

  // Collect form data
  const formData = {
    name: this.name.value,
    email: this.email.value,
    subject: this.subject.value,
    message: this.message.value
  };

  // Function to show notification with beautiful animation
  function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
    notificationMessage.textContent = message;  // Set the message
    notification.classList.add('show');         // Show notification with animation

    // Automatically hide the notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      notification.classList.add('hide');       // Hide notification with animation
      
      // Remove the 'hide' class after the animation completes to reset
      setTimeout(() => {
        notification.classList.remove('hide');
      }, 500); // Match the duration of your transition in CSS (0.5s)
    }, 3000);
  }

  // Send the email using EmailJS
  emailjs.send("service_ji1iwrp", "template_c56y1er", {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message_html: formData.message
  })
  .then(function(response) {
      // Show success notification
      showNotification("Email sent successfully!");

      // Clear the form inputs after success
      document.getElementById('contact-form').reset(); // Clear form fields
  }, function(error) {
      console.error("Failed to send email:", error);
      // Show error notification
      showNotification("Failed to send email: " + JSON.stringify(error));
  });
});
