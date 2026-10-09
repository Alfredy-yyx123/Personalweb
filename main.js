/**
 * main.js - Core logic for Personal Portfolio
 */

// 1. Configuration & Data
const CONFIG = {
    user: {
        name: "[YOUR FULL NAME]",
        initials: "[YFN]",
        title: "[YOUR PROFESSIONAL TITLE]",
        location: "[YOUR LOCATION]",
        email: "[YOUR EMAIL ADDRESS]",
        github: "[YOUR GITHUB URL]",
        linkedin: "[YOUR LINKEDIN URL]",
    },
    skills: [
        {
            category: "Programming Languages",
            items: ["Python", "Java", "JavaScript", "C++", "SQL"]
        },
        {
            category: "Front-End Development",
            items: ["HTML5", "CSS3", "React", "Tailwind CSS", "Modern JS"]
        },
        {
            category: "Back-End Development",
            items: ["Node.js", "Django", "FastAPI", "REST APIs"]
        },
        {
            category: "Databases",
            items: ["PostgreSQL", "MongoDB", "SQLite", "Redis"]
        },
        {
            category: "Tools & Platforms",
            items: ["Git", "GitHub", "Docker", "AWS", "Linux"]
        },
        {
            category: "Data & ML",
            items: ["Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "PyTorch"],
            learning: true
        }
    ],
    projects: [
        {
            id: "01",
            title: "Stack Lens",
            description: "A specialized diagnostic tool designed to help developers investigate database and deployment issues in real-time.",
            problem: "Debugging distributed systems often requires jumping between multiple logs and dashboards, leading to fragmented context.",
            solution: "A unified lens that aggregates system health metrics and query logs into a single, searchable timeline.",
            features: ["Real-time log streaming", "Query performance analyzer", "Dependency mapping"],
            tech: ["Python", "React", "PostgreSQL", "Redis"],
            link: "#",
            repo: "#",
            status: "Completed",
            image: "https://via.placeholder.com/800x450?text=Stack+Lens"
        },
        {
            id: "02",
            title: "LCGMS",
            description: "A graduate profiling and after-care monitoring system for managing records and tracking alumni services.",
            problem: "Educational institutions lack a streamlined way to track alumni career progression and provide targeted after-care services.",
            solution: "A secure portal for alumni record management with automated reporting and profiling tools.",
            features: ["Alumni Profiling", "Service Tracking", "Analytics Dashboard"],
            tech: ["Java", "Spring Boot", "MySQL", "Thymeleaf"],
            link: "#",
            repo: "#",
            status: "In Progress",
            image: "https://via.placeholder.com/800x450?text=LCGMS"
        },
        {
            id: "03",
            title: "Automated Data Analytics System",
            description: "A system that processes XML data feeds and generates automated business intelligence reports.",
            problem: "Manual processing of large XML datasets for business reporting is error-prone and time-consuming.",
            solution: "An automated pipeline that parses XML data and transforms it into visual PDF/HTML reports based on predefined rules.",
            features: ["XML Parsing Engine", "Automated PDF Generation", "Rule-based Analytics"],
            tech: ["Python", "lxml", "ReportLab", "SQLite"],
            link: "#",
            repo: "#",
            status: "Completed",
            image: "https://via.placeholder.com/800x450?text=Data+Analytics+System"
        }
    ],
    journey: [
        {
            year: "2024 - Present",
            title: "Professional Development",
            description: "Focused on mastering full-stack architectures and exploring the intersection of AI and software engineering.",
            tags: ["Full-Stack", "Cloud Computing", "AI"]
        },
        {
            year: "2021 - 2023",
            title: "Academic Journey",
            description: "Pursuing [YOUR DEGREE] at [YOUR SCHOOL]. Focused on software engineering principles and database management.",
            tags: ["Computer Science", "Algorithms", "Databases"]
        },
        {
            year: "2020",
            title: "Programming Start",
            description: "First deep dive into Python and the basics of computer science. Built first automation scripts and simple games.",
            tags: ["Python", "Learning"]
        }
    ]
};

// 2. Core Initialization
document.addEventListener('DOMContentLoaded', () => {
    initLucide();
    renderSkills();
    renderProjects();
    renderJourney();
    setupAnimations();
    setupNavigation();
    setYear();
});

function initLucide() {
    lucide.createIcons();
}

function setYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
}

// 3. Dynamic Rendering
function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;

    container.innerHTML = CONFIG.skills.map(cat => `
        <div class="skill-category" data-reveal>
            <h3 class="category-title">${cat.category}</h3>
            <div class="skill-list">
                ${cat.items.map(item => `
                    <span class="skill-tag ${cat.learning ? 'learning' : ''}">${item}</span>
                `).join('')}
            </div>
        </div>
    `).join('');

    // Re-init reveal since we added new elements
    setupAnimations();
}

function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = CONFIG.projects.map(project => `
        <div class="project-card" data-reveal>
            <div class="project-visual">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <span class="project-num">${project.id}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>

                <div class="project-meta">
                    <span class="project-meta-item"><span class="project-meta-label">Problem:</span> ${project.problem}</span>
                    <span class="project-meta-item"><span class="project-meta-label">Solution:</span> ${project.solution}</span>
                </div>

                <div class="project-tags">
                    ${project.tech.map(t => `<span class="project-tag">${t}</span>`).join('')}
                </div>

                <div class="project-links">
                    <a href="${project.repo}" target="_blank">Repository <i data-lucide="github" style="width: 14px; height: 14px; vertical-align: middle; margin-left: 5px;"></i></a>
                    <a href="${project.link}" target="_blank">Live Demo <i data-lucide="external-link" style="width: 14px; height: 14px; vertical-align: middle; margin-left: 5px;"></i></a>
                </div>

                <div class="project-status" style="margin-top: 20px; font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted);">
                    Status: ${project.status}
                </div>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
    setupAnimations();
}

function renderJourney() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    container.innerHTML = CONFIG.journey.map(item => `
        <div class="timeline-item" data-reveal>
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <span class="timeline-year">${item.year}</span>
                <h3 class="timeline-title" style="font-family: var(--font-heading); text-transform: uppercase; margin-bottom: 10px; font-size: 1.2rem;">${item.title}</h3>
                <p class="timeline-text" style="color: rgba(247, 250, 251, 0.8); margin-bottom: 15px;">${item.description}</p>
                <div class="journey-tags" style="display: flex; gap: 10px; flex-wrap: wrap;">
                    ${item.tags.map(tag => `<span class="skill-tag" style="border-color: var(--border-dark); color: var(--bg-light); font-size: 0.7rem;">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    setupAnimations();
}

// 4. Interactions & Animations
function setupNavigation() {
    const nav = document.querySelector('.main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Simple mobile menu toggle (could be expanded)
    const toggle = document.querySelector('.mobile-nav-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }
}

function setupAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-reveal]').forEach(el => {
        observer.observe(el);
    });
}

// Replace the broken setupAnimations with the fixed one
// Since I wrote the file, I'll just rewrite the logic internally.
// I'm adding it as a separate function to the file if I'm doing an Edit.
// But since I'm doing a Write, I'll just ensure it's correct from the start.
// Wait, I already wrote the file. I'll just edit the function.
