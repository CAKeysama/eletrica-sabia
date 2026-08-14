/* ==========================================================================
   ELÉTRICA SABIÁ - INTERACTIVE LOGIC (VANILLA JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initActiveNavLink();
  initScrollReveal();
  initContactForm();
});

/**
 * 1. Header Scroll Effect
 * Adds a visual shadow and shrinks header height when scrolled
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  // Initial check on load
  handleScroll();
  window.addEventListener('scroll', handleScroll);
}

/**
 * 2. Mobile Menu Toggle
 * Opens and closes the slide-over menu drawer on mobile devices
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link, .nav .btn');
  
  const toggleMenu = () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    
    // Toggle aria-expanded for screen readers
    const isExpanded = menuToggle.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
  };
  
  const closeMenu = () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  };
  
  menuToggle.addEventListener('click', toggleMenu);
  
  // Close menu when clicking nav links or CTA button
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Close menu when clicking outside of it
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = nav.contains(event.target);
    const isClickToggle = menuToggle.contains(event.target);
    
    if (!isClickInsideMenu && !isClickToggle && nav.classList.contains('active')) {
      closeMenu();
    }
  });
}

/**
 * 3. Active Nav Link on Scroll
 * Highlights the current active section in the header navigation
 */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120; // offset header height + margin
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
        currentSectionId = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * 4. Scroll Reveal Animations
 * Uses Intersection Observer to fade in and slide up elements as they scroll into view
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null, // viewport
      threshold: 0.15, // trigger when 15% visible
      rootMargin: '0px 0px -50px 0px' // adjust activation point
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // stop observing once element is visible
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    revealElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    revealElements.forEach(element => {
      element.classList.add('visible');
    });
  }
}

/**
 * 5. Contact Form Validation & WhatsApp Redirection
 * Validates fields on submit and constructs the dynamic WhatsApp text message URL
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  // Pre-select service when clicking on service card links
  const serviceLinks = document.querySelectorAll('.service-link');
  const serviceSelect = document.getElementById('formService');
  
  serviceLinks.forEach(link => {
    link.addEventListener('click', () => {
      const selectedService = link.getAttribute('data-service');
      if (selectedService && serviceSelect) {
        serviceSelect.value = selectedService;
      }
    });
  });
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Retrieve fields
    const nameInput = document.getElementById('formName');
    const phoneInput = document.getElementById('formPhone');
    const emailInput = document.getElementById('formEmail');
    const companyInput = document.getElementById('formCompany');
    const messageInput = document.getElementById('formMessage');
    
    // Field cleaning
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    const company = companyInput.value.trim();
    const service = serviceSelect.value;
    const message = messageInput.value.trim();
    
    // Validation
    if (!name) {
      alert('Por favor, informe seu nome completo.');
      nameInput.focus();
      return;
    }
    
    if (!phone) {
      alert('Por favor, informe um telefone ou WhatsApp para contato.');
      phoneInput.focus();
      return;
    }
    
    if (!email || !validateEmail(email)) {
      alert('Por favor, informe um e-mail válido.');
      emailInput.focus();
      return;
    }
    
    if (service === '') {
      alert('Por favor, selecione o serviço de interesse.');
      serviceSelect.focus();
      return;
    }
    
    if (!message) {
      alert('Por favor, descreva sua mensagem.');
      messageInput.focus();
      return;
    }
    
    // Build WhatsApp message format
    let whatsappMsg = 'Olá, Elétrica Sabiá!\n\n';
    whatsappMsg += `Meu nome é *${name}*.\n`;
    if (company) {
      whatsappMsg += `Empresa: *${company}*\n`;
    }
    whatsappMsg += `Tenho interesse em: *${service}*.\n\n`;
    whatsappMsg += `*Telefone:* ${phone}\n`;
    whatsappMsg += `*E-mail:* ${email}\n\n`;
    whatsappMsg += `*Mensagem:*\n${message}\n\n`;
    whatsappMsg += 'Gostaria de receber mais informações.';
    
    // Encode text parameters
    const encodedText = encodeURIComponent(whatsappMsg);
    
    // WhatsApp number for Elétrica Sabiá: (16) 3384-7469 -> Country 55 + Area 16 + Number 33847469
    const companyWhatsapp = '551633847469';
    
    // Construct official whatsapp URL api
    const waUrl = `https://api.whatsapp.com/send?phone=${companyWhatsapp}&text=${encodedText}`;
    
    // Open in a new tab
    window.open(waUrl, '_blank');
  });
}

/**
 * Utility: Email validator
 */
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}
