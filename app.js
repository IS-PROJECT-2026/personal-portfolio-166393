/**
 * Jan Isaac - Developer Portfolio & Systems Showcase
 * Interactive Application Engine (ES6)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderProjects('all');
  renderSkills();
  initFilters();
  initContactForm();
  initTerminalShell();
  initModals();
  initMobileNav();
});

/* ==========================================================================
   1. Data Store (Projects & Skills)
   ========================================================================== */
const PROJECTS_DATA = [
  {
    id: 'medisync',
    title: 'MediSync Clinic & Patient Triage Portal',
    category: 'web',
    categoryLabel: 'Web Application',
    status: 'Shipped',
    description: 'Cloud-ready clinical appointment and dynamic patient triage management system with real-time queue wait estimation.',
    longDescription: 'MediSync is an interactive clinical workflow system engineered to streamline patient intake, prioritize urgent triage cases using algorithmic severity scoring, and provide medical staff with an instant live queue dashboard.',
    tags: ['JavaScript', 'HTML5/CSS3', 'Agile Git', 'LocalStorage API'],
    challenges: 'Ensured sub-second triage severity updates and multi-device state synchronization without relying on server-side databases.',
    solution: 'Designed a normalized client-side state machine backed by persistent browser storage and atomic DOM updates.',
    demoUrl: '#',
    repoUrl: 'https://github.com/JanIsaac-1'
  },
  {
    id: 'eventfinder',
    title: 'PulseEvent Discovery Engine',
    category: 'web',
    categoryLabel: 'Web Application',
    status: 'Active',
    description: 'Dynamic event discovery catalog featuring multi-attribute faceted search, category filtering, and calendar integration.',
    longDescription: 'Engineered a high-performance event discovery web app enabling users to search, filter by geographic radius and genre, and bookmark upcoming community and technical workshops.',
    tags: ['JavaScript ES6+', 'CSS Flexbox/Grid', 'REST API', 'Responsive'],
    challenges: 'Managing responsive layout reflows while filtering through 100+ simulated event objects.',
    solution: 'Implemented client-side debounce querying and CSS GPU-accelerated rendering transforms.',
    demoUrl: '#',
    repoUrl: 'https://github.com/JanIsaac-1'
  },
  {
    id: 'assembly-sim',
    title: 'Low-Level System Architecture Lab',
    category: 'systems',
    categoryLabel: 'Systems & Tools',
    status: 'Completed',
    description: 'Assembly and low-level architectural simulation demonstrating register manipulation and memory addressing.',
    longDescription: 'Academic systems project exploring x86/ARM memory segmentation, stack frames, register allocation, and assembly-level optimization techniques.',
    tags: ['Assembly', 'C/C++', 'Computer Architecture', 'Linux'],
    challenges: 'Debugging memory segmentation faults and tracking register state transitions during loop unrolling.',
    solution: 'Created an automated register verification test suite in C to assert instruction correctness.',
    demoUrl: '#',
    repoUrl: 'https://github.com/JanIsaac-1'
  },
  {
    id: 'iot-tracker',
    title: 'IoT Environmental Telemetry Monitor',
    category: 'mobile',
    categoryLabel: 'Mobile & IoT',
    status: 'Prototype',
    description: 'Sensor data processing interface visualizing temperature, humidity, and atmospheric telemetry.',
    longDescription: 'Designed an IoT dashboard connecting micro-controller telemetry to a lightweight web interface for continuous environmental threshold monitoring.',
    tags: ['Embedded Systems', 'IoT', 'JavaScript Charts', 'WebSockets'],
    challenges: 'Handling noisy real-time telemetry packets and preventing UI stuttering.',
    solution: 'Utilized exponential smoothing filters to clean sensor jitter before charting.',
    demoUrl: '#',
    repoUrl: 'https://github.com/JanIsaac-1'
  }
];

const SKILLS_DATA = [
  {
    category: 'Frontend & UI',
    icon: 'fa-brands fa-html5',
    items: [
      { name: 'HTML5 Semantic Architecture', level: 95 },
      { name: 'CSS3 / Modern Design Systems', level: 90 },
      { name: 'Modern JavaScript (ES6+)', level: 88 },
      { name: 'Responsive & Accessible Web', level: 92 }
    ]
  },
  {
    category: 'Backend & Systems',
    icon: 'fa-solid fa-server',
    items: [
      { name: 'Python & Scripting', level: 85 },
      { name: 'Java & Object-Oriented Design', level: 82 },
      { name: 'SQL & Database Design', level: 80 },
      { name: 'RESTful API Integration', level: 85 }
    ]
  },
  {
    category: 'DevOps & Workflow',
    icon: 'fa-solid fa-code-branch',
    items: [
      { name: 'Git Workflow & Conventional Commits', level: 95 },
      { name: 'Branch Protection & PR Reviews', level: 92 },
      { name: 'CI/CD & GitHub Pages Deployment', level: 88 },
      { name: 'Agile & Kanban Project Tracking', level: 90 }
    ]
  }
];

/* ==========================================================================
   2. Theme Toggle Engine
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('jan_portfolio_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, themeIcon);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('jan_portfolio_theme', newTheme);
    updateThemeIcon(newTheme, themeIcon);
  });
}

function updateThemeIcon(theme, iconElement) {
  if (theme === 'light') {
    iconElement.className = 'fa-solid fa-sun';
  } else {
    iconElement.className = 'fa-solid fa-moon';
  }
}

/* ==========================================================================
   3. Projects Rendering & Interactive Filters
   ========================================================================== */
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';

  const filtered = filter === 'all' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === filter);

  filtered.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-badge-bar">
        <span class="project-category">${p.categoryLabel}</span>
        <span class="project-status">${p.status}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="project-actions">
          <button class="btn-case-study" data-project-id="${p.id}">
            <i class="fa-solid fa-circle-info"></i> Architecture Deep Dive
          </button>
          <div class="project-links">
            <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon" title="View Source Code">
              <i class="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Attach modal listeners to case study buttons
  document.querySelectorAll('.btn-case-study').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-project-id');
      openProjectModal(pId);
    });
  });
}

function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      renderProjects(category);
    });
  });
}

/* ==========================================================================
   4. Skills Matrix Rendering
   ========================================================================== */
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  grid.innerHTML = '';

  SKILLS_DATA.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'skill-category-card';
    card.innerHTML = `
      <div class="skill-cat-header">
        <i class="${cat.icon} skill-cat-icon"></i>
        <h3 class="skill-cat-title">${cat.category}</h3>
      </div>
      <div class="skill-list">
        ${cat.items.map(item => `
          <div class="skill-item">
            <div class="skill-name-row">
              <span>${item.name}</span>
              <span>${item.level}%</span>
            </div>
            <div class="skill-bar-bg">
              <div class="skill-bar-fill" style="width: ${item.level}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ==========================================================================
   5. Interactive Project Modal & Resume Summary
   ========================================================================== */
function initModals() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalClose');
  const resumeBtn = document.getElementById('resumeBtn');

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });

  resumeBtn.addEventListener('click', () => {
    openResumeModal();
  });
}

function openProjectModal(projectId) {
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!project) return;

  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <span class="project-category" style="margin-bottom: 0.5rem; display:inline-block;">${project.categoryLabel}</span>
    <h2 style="font-size: 1.75rem; margin-bottom: 1rem; color: var(--text-primary);">${project.title}</h2>
    
    <div style="margin-bottom: 1.25rem;">
      <h4 style="font-size: 1rem; color: var(--accent-primary); margin-bottom: 0.3rem;">System Overview</h4>
      <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">${project.longDescription}</p>
    </div>

    <div style="margin-bottom: 1.25rem;">
      <h4 style="font-size: 1rem; color: var(--accent-primary); margin-bottom: 0.3rem;">Engineering Challenge</h4>
      <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">${project.challenges}</p>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="font-size: 1rem; color: var(--accent-primary); margin-bottom: 0.3rem;">Architecture Solution</h4>
      <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">${project.solution}</p>
    </div>

    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
      ${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>

    <div style="display: flex; gap: 1rem;">
      <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <i class="fa-brands fa-github"></i> Repository Source
      </a>
    </div>
  `;

  document.getElementById('projectModal').classList.add('open');
}

function openResumeModal() {
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <span class="project-category" style="margin-bottom: 0.5rem; display:inline-block;">Professional Summary</span>
    <h2 style="font-size: 1.75rem; margin-bottom: 1rem; color: var(--text-primary);">Jan Isaac &mdash; Software Engineer</h2>
    
    <div style="margin-bottom: 1.25rem;">
      <h4 style="font-size: 1rem; color: var(--accent-primary); margin-bottom: 0.3rem;">Education</h4>
      <p style="color: var(--text-secondary); font-size: 0.95rem;"><strong>Strathmore University</strong> &bull; Informatics & Computer Science</p>
      <p style="color: var(--text-muted); font-size: 0.85rem;">Focus: Software Architecture, Systems Programming, Git DevOps & Agile Workflows</p>
    </div>

    <div style="margin-bottom: 1.25rem;">
      <h4 style="font-size: 1rem; color: var(--accent-primary); margin-bottom: 0.3rem;">Core Competencies</h4>
      <ul style="color: var(--text-secondary); font-size: 0.92rem; padding-left: 1.2rem; line-height: 1.7;">
        <li>Conventional Commits, Branch Isolation, and Pull Request Governance</li>
        <li>Full-Stack Web Engineering (JavaScript, CSS Design Systems, HTML5)</li>
        <li>Systems programming & Object-Oriented Analysis (Python, Java, C)</li>
        <li>Agile Project Management (GitHub Projects, Milestones & Traceable Issues)</li>
      </ul>
    </div>

    <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
      <a href="mailto:jan.maina@strathmore.edu" class="btn btn-primary">
        <i class="fa-solid fa-envelope"></i> Contact Directly
      </a>
    </div>
  `;

  document.getElementById('projectModal').classList.add('open');
}

/* ==========================================================================
   6. Interactive Developer CLI Terminal (Ctrl+K)
   ========================================================================== */
function initTerminalShell() {
  const cliModal = document.getElementById('cliModal');
  const cmdToggle = document.getElementById('cmdToggle');
  const cliClose = document.getElementById('cliClose');
  const cliCloseBtn = document.getElementById('cliCloseBtn');
  const cliInput = document.getElementById('cliInput');
  const cliOutput = document.getElementById('cliOutput');

  function openCLI() {
    cliModal.classList.add('open');
    cliInput.focus();
  }

  function closeCLI() {
    cliModal.classList.remove('open');
  }

  cmdToggle.addEventListener('click', openCLI);
  cliClose.addEventListener('click', closeCLI);
  cliCloseBtn.addEventListener('click', closeCLI);

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cliModal.classList.contains('open')) {
        closeCLI();
      } else {
        openCLI();
      }
    } else if (e.key === 'Escape' && cliModal.classList.contains('open')) {
      closeCLI();
    }
  });

  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = cliInput.value.trim().toLowerCase();
      cliInput.value = '';
      executeCLICommand(command, cliOutput);
    }
  });
}

function executeCLICommand(cmd, output) {
  const line = document.createElement('div');
  line.style.marginBottom = '0.5rem';

  if (!cmd) return;

  const promptSpan = `<span style="color: var(--accent-green); font-weight: bold;">jan@portfolio:~$</span> <span style="color: #fff;">${cmd}</span>`;
  let responseText = '';

  switch (cmd) {
    case 'help':
      responseText = `
        <p>Available commands:</p>
        <p>&bull; <span class="highlight">whoami</span> - Display developer profile</p>
        <p>&bull; <span class="highlight">projects</span> - List all portfolio projects</p>
        <p>&bull; <span class="highlight">skills</span> - Output core technical stack</p>
        <p>&bull; <span class="highlight">contact</span> - Show direct contact details</p>
        <p>&bull; <span class="highlight">git</span> - Display current Git workflow stats</p>
        <p>&bull; <span class="highlight">clear</span> - Clear terminal window</p>
      `;
      break;
    case 'whoami':
      responseText = `<p>Jan Isaac &mdash; Software Engineering Student at Strathmore University. Passionate about system engineering, agile workflows, and building modern web apps.</p>`;
      break;
    case 'projects':
      responseText = PROJECTS_DATA.map(p => `<p>&bull; <strong>${p.title}</strong> (${p.categoryLabel}) - <em>${p.tags.join(', ')}</em></p>`).join('');
      break;
    case 'skills':
      responseText = `<p>Core Stack: JavaScript, Python, Java, SQL, Git CI/CD, HTML5/CSS3 Semantic Design.</p>`;
      break;
    case 'contact':
      responseText = `<p>Email: <a href="mailto:jan.maina@strathmore.edu" style="color: var(--accent-cyan);">jan.maina@strathmore.edu</a><br>GitHub: <a href="https://github.com/JanIsaac-1" target="_blank" style="color: var(--accent-cyan);">github.com/JanIsaac-1</a></p>`;
      break;
    case 'git':
      responseText = `<p><span style="color: var(--accent-green);">Branch:</span> main<br><span style="color: var(--accent-cyan);">Workflow:</span> Conventional Commits (feat, fix, docs, style, refactor, chore)<br><span style="color: var(--accent-amber);">Protection:</span> Pull Request Required on main branch</p>`;
      break;
    case 'clear':
      output.innerHTML = '';
      return;
    default:
      responseText = `<p style="color: var(--accent-rose);">Command not found: '${cmd}'. Type <span class="highlight">help</span> for a list of valid commands.</p>`;
  }

  line.innerHTML = `<div>${promptSpan}</div><div style="color: var(--text-secondary); margin-top: 0.2rem; padding-left: 0.5rem;">${responseText}</div>`;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

/* ==========================================================================
   7. Contact Form & Client-Side Validation Engine
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset error messages
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    [nameInput, emailInput, subjectInput, messageInput].forEach(inp => inp.classList.remove('invalid'));

    // Validate Name
    if (!nameInput.value.trim()) {
      showInputError(nameInput, 'nameError', 'Please enter your full name.');
      isValid = false;
    }

    // Validate Email with regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showInputError(emailInput, 'emailError', 'Please enter your email address.');
      isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      showInputError(emailInput, 'emailError', 'Please enter a valid email address.');
      isValid = false;
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      showInputError(subjectInput, 'subjectError', 'Please specify a subject.');
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      showInputError(messageInput, 'messageError', 'Message must be at least 10 characters.');
      isValid = false;
    }

    if (isValid) {
      // Store in LocalStorage for persistence demonstration
      const messagePayload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
      };

      const existing = JSON.parse(localStorage.getItem('jan_portfolio_messages') || '[]');
      existing.push(messagePayload);
      localStorage.setItem('jan_portfolio_messages', JSON.stringify(existing));

      showToast('Thank you! Your message has been recorded.');
      form.reset();
    }
  });
}

function showInputError(inputEl, errorId, msg) {
  inputEl.classList.add('invalid');
  document.getElementById(errorId).textContent = msg;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  toastText.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   8. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const menu = document.getElementById('navMenu');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });
}
