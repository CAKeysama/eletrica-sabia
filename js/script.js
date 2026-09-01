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
 * Shrinks header height and adds box-shadow when scrolling down
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * 2. Mobile Menu Toggle
 * Opens and closes mobile drawer menu
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (!menuToggle || !nav) return;

  const navLinks = document.querySelectorAll('.nav-link, .nav .btn');
  
  const toggleMenu = () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    const isExpanded = menuToggle.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
  };
  
  const closeMenu = () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  };
  
  menuToggle.addEventListener('click', toggleMenu);
  
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
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
 * Dynamically highlights active menu item based on current section viewport position
 */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;
  
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 130;
    
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
  }, { passive: true });
}

/**
 * 4. Scroll Reveal Animations
 * Uses Intersection Observer for modern fade-in effect on sections
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    revealElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add('visible');
    });
  }
}

/**
 * 5. Contact Form Validation & Dynamic WhatsApp Message Redirection
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  // Pre-select service when clicking service CTA buttons
  const serviceCtaButtons = document.querySelectorAll('.service-card .service-btn');
  const serviceSelect = document.getElementById('formService');
  
  serviceCtaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedService = btn.getAttribute('data-service');
      if (selectedService && serviceSelect) {
        serviceSelect.value = selectedService;
      }
    });
  });
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('formName');
    const phoneInput = document.getElementById('formPhone');
    const emailInput = document.getElementById('formEmail');
    const companyInput = document.getElementById('formCompany');
    const serviceSelect = document.getElementById('formService');
    const messageInput = document.getElementById('formMessage');
    
    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const company = companyInput ? companyInput.value.trim() : '';
    const service = serviceSelect ? serviceSelect.value : '';
    const message = messageInput ? messageInput.value.trim() : '';
    
    // Field validations
    if (!name) {
      alert('Por favor, preencha seu nome.');
      nameInput.focus();
      return;
    }
    
    if (!phone) {
      alert('Por favor, informe seu telefone ou WhatsApp.');
      phoneInput.focus();
      return;
    }
    
    if (!email || !validateEmail(email)) {
      alert('Por favor, informe um e-mail válido.');
      emailInput.focus();
      return;
    }

    if (!service) {
      alert('Por favor, selecione o serviço de interesse.');
      serviceSelect.focus();
      return;
    }
    
    if (!message) {
      alert('Por favor, digite sua mensagem.');
      messageInput.focus();
      return;
    }
    
    // Construct exact requested message template
    let whatsappText = `Olá, Elétrica Sabiá!\n`;
    whatsappText += `Meu nome é ${name}.\n`;
    whatsappText += `Tenho interesse em ${service}.\n`;
    whatsappText += `Empresa: ${company ? company : 'Não informada'}\n`;
    whatsappText += `Telefone: ${phone}\n`;
    whatsappText += `E-mail: ${email}\n`;
    whatsappText += `Mensagem:\n${message}\n\n`;
    whatsappText += `Gostaria de receber mais informações e solicitar um orçamento.`;
    
    const encodedMessage = encodeURIComponent(whatsappText);
    const companyPhone = '551633847469';
    
    // Open official WhatsApp window
    const waUrl = `https://wa.me/${companyPhone}?text=${encodedMessage}`;
    window.open(waUrl, '_blank');
  });
}

/**
 * Helper: Validate email format
 */
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}
