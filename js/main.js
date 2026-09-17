/**
 * Main JavaScript: Navigation, Mobile Menu, Active Link Highlighting
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  highlightActiveNavLink();
});

/**
 * Initialize responsive mobile navigation drawer and backdrop
 */
function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileBackdrop = document.querySelector('.mobile-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

  if (!navToggle || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('open');
    if (mobileBackdrop) mobileBackdrop.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    const icon = navToggle.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    }
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    const icon = navToggle.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  }

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMenu);
  }

  // Close when clicking any nav item
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close when resized to desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}

/**
 * Automatically highlight active link across desktop and mobile nav
 */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname;
  const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

  const allNavLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');

  allNavLinks.forEach((link) => {
    const linkHref = link.getAttribute('href');
    if (!linkHref) return;

    const linkFile = linkHref.substring(linkHref.lastIndexOf('/') + 1);

    if (
      linkFile === currentFile ||
      (currentFile === '' && linkFile === 'index.html') ||
      (currentFile === 'index.html' && (linkFile === '' || linkFile === 'index.html'))
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
