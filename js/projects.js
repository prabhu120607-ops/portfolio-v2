/**
 * Projects JavaScript: Category Filtering and Project Details Modal
 */

const projectDetailsData = {
  'dacksha-services': {
    title: 'Dacksha Services Website',
    category: 'Web Development / PHP',
    overview: 'A complete, dynamic service management web platform built to manage commercial services, client requests, and administration.',
    problem: 'The client needed a modern, streamlined digital presence with dynamic content updates and an administrative dashboard to manage user requests and service inquiries efficiently without manual overhead.',
    solution: 'Designed and developed a responsive web application utilizing PHP and MySQL on the backend, complemented by a mobile-friendly frontend styled with CSS3 and Bootstrap.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
    features: [
      'Interactive client-facing service catalog with dynamic categories',
      'Secure administrative portal for inquiry tracking and content management',
      'Fully responsive UI optimized for mobile, tablet, and desktop',
      'Database integration with structured MySQL relational tables'
    ],
    contribution: 'Implemented the frontend user interfaces, configured relational database tables in MySQL, connected dynamic PHP backend endpoints, and deployed the solution on a test staging server.',
    challenges: 'Ensuring consistent responsive behavior across mobile viewports while preserving admin table ergonomics; solved with modular CSS and Bootstrap grid adjustments.',
    outcome: 'Successfully delivered a maintainable, fast-loading service website that reduced manual inquiry handling time and improved client visibility.',
    github: '#',
    demo: '#'
  },
  'personal-portfolio': {
    title: 'Personal Developer Portfolio (V2)',
    category: 'Frontend',
    overview: 'A modern, responsive multi-page personal developer portfolio built to showcase technical skills, academic background, and real-world projects.',
    problem: 'Needed a distinctive personal portfolio that communicates technical competency in front-end and full-stack fundamentals without generic AI-generated templates or bloated frameworks.',
    solution: 'Engineered a custom vanilla HTML5, CSS3, and JavaScript multi-page architecture with unified design tokens, accessible layouts, and zero external framework overhead.',
    technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Git', 'Vercel'],
    features: [
      'Unified design system based on Geom typography and dark-green aesthetic',
      'Dedicated pages for About, Skills, Projects, and Contact',
      'Interactive category filtering and accessible project modals',
      'Robust mobile navigation with smooth transitions and zero horizontal overflow'
    ],
    contribution: 'Architected the design system, wrote clean semantic HTML markup, structured modular stylesheets, and implemented interactive DOM components.',
    challenges: 'Optimizing touch targets and responsive typography scaling across small mobile screens without layout breakage.',
    outcome: 'Achieved high performance, clean presentation, and an easy-to-update foundation deployed live on Vercel.',
    github: 'https://github.com/prabhu120607-ops/portfolio-v2',
    demo: 'https://portfolio-v2-nine-blue.vercel.app/'
  },
  'java-student-management': {
    title: 'Student Record Management System',
    category: 'Java / Core OOP',
    overview: 'An Object-Oriented Java application designed to manage student academic records, course enrollments, and performance grading.',
    problem: 'Academic records in departmental offices were maintained across inconsistent files, leading to redundancy and slow record lookup.',
    solution: 'Built a modular Java application adhering strictly to OOP principles (encapsulation, inheritance, polymorphism) with robust data storage and search algorithms.',
    technologies: ['Java (JDK 17+)', 'OOP', 'File I/O', 'Data Structures'],
    features: [
      'CRUD operations for student records and course allocations',
      'Fast search and filter algorithms by student ID, semester, or major',
      'Input validation and custom exception handling for data integrity',
      'Persistent record storage via structured file persistence'
    ],
    contribution: 'Designed class diagrams, authored the core business logic in Java, implemented validation handlers, and wrote thorough console test suites.',
    challenges: 'Handling edge-case file input errors without crashing the application; resolved through robust custom try-catch exception handling.',
    outcome: 'Solidified deep understanding of Java OOP design patterns, data encapsulation, and algorithmic search efficiency.',
    github: '#',
    demo: '#'
  },
  'responsive-landing-page': {
    title: 'Interactive Web Showcase Application',
    category: 'Frontend',
    overview: 'A mobile-first, responsive landing platform demonstrating modern CSS Grid, Flexbox layouts, and dynamic DOM manipulation.',
    problem: 'Creating an engaging, accessible landing interface with high Lighthouse scores and fast initial rendering.',
    solution: 'Developed lightweight components using modern CSS custom properties, semantic markup, and responsive media queries.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design'],
    features: [
      'Fluid typography and adaptive layouts using clamp() and CSS Grid',
      'Subtle micro-interactions and performant hover states',
      'Accessible focus states and keyboard navigation support',
      'Cross-browser tested across Chrome, Edge, Safari, and Firefox'
    ],
    contribution: 'Authored 100% of the HTML, CSS, and vanilla JS interactions from scratch.',
    challenges: 'Balancing visual depth with minimalist performance guidelines.',
    outcome: 'Achieved 95+ performance scores and smooth 60fps animations across all screen sizes.',
    github: '#',
    demo: '#'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initProjectFiltering();
  initProjectModal();
});

/**
 * Filter projects by category
 */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Initialize Project Details Modal
 */
function initProjectModal() {
  const modalOverlay = document.getElementById('projectModal');
  const closeBtn = document.querySelector('.modal-close-btn');
  const viewDetailBtns = document.querySelectorAll('.view-details-btn');

  if (!modalOverlay || !closeBtn) return;

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data) return;

    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalOverview').textContent = data.overview;
    document.getElementById('modalProblem').textContent = data.problem;
    document.getElementById('modalSolution').textContent = data.solution;
    document.getElementById('modalContribution').textContent = data.contribution;
    document.getElementById('modalChallenges').textContent = data.challenges;
    document.getElementById('modalOutcome').textContent = data.outcome;

    // Tech stack
    const techWrap = document.getElementById('modalTechStack');
    techWrap.innerHTML = '';
    data.technologies.forEach((tech) => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = tech;
      techWrap.appendChild(span);
    });

    // Features
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    data.features.forEach((feat) => {
      const li = document.createElement('li');
      li.textContent = feat;
      featuresList.appendChild(li);
    });

    // Links
    const githubLink = document.getElementById('modalGithubLink');
    const demoLink = document.getElementById('modalDemoLink');
    if (githubLink) githubLink.href = data.github;
    if (demoLink) demoLink.href = data.demo;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  viewDetailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}
