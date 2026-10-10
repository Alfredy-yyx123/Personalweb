/**
 * main.js - Core logic for Personal Portfolio
 */

// 1. Configuration & Data
const CONFIG = {
    user: {
        name: "ALFREDO LEMMUEL REYES",
        initials: "GLIZYMANN",
        title: "STUDENT",
        location: "CABANATUAN CITY NEUVA ECIJA PHILIPPINES",
        email: "REYESALFREDOLEMMUEL@GMAIL.COM",
        github: "https://github.com/Alfredy-yyx123",
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
            image: "assets/Gemini_Generated_Image_m6mvsgm6mvsgm6mv.jpg"
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
            image: "assets/11742c_e68a4f8b17924121870eab8334dbd73d~mv2.png"
        }
    ],
    journey: [
        {
            year: "2024 - Present",
            title: "4th year College Student",
            description: "Focused on mastering full-stack architectures and exploring the intersection of AI and software engineering.",
            tags: ["Data Engineering", "Cloud Computing", "AI"]
        },
        {
            year: "2021 - 2023",
            title: "Academic Journey",
            description: "Pursuing Information Technology Database Major at Nueva Ecija University of Science And Technology. Focused on software engineering principles and database management.",
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
    initBackground();
    setupCursor();
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

// --- Particle & Background System ---
class BackgroundManager {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.grid = document.getElementById('grid-overlay');
        this.particles = [];
        this.mouse = { x: null, y: null };
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            if (this.grid) this.grid.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        for (let i = 0; i < 150; i++) {
            this.particles.push(new Particle(this.canvas.width, this.canvas.height));
        }
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dist = this.getDist(this.particles[i], this.particles[j]);
                if (dist < 150) {
                    this.ctx.strokeStyle = `rgba(2, 210, 227, ${0.3 - dist/500})`;
                    this.ctx.lineWidth = 0.8;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }

        this.particles.forEach(p => {
            p.update(this.mouse);
            p.draw(this.ctx);
        });
        requestAnimationFrame(() => this.animate());
    }

    getDist(p1, p2) {
        return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
    }
}

class Particle {
    constructor(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
    }

    update(mouse) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
        if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;

        if (mouse.x) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 200) {
                this.x -= dx * 0.02;
                this.y -= dy * 0.02;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'rgba(2, 210, 227, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initBackground() {
    new BackgroundManager();
}

function setupCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;
    window.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .skill-tag, .stat-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
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
                    ${item.tags.map(tag => `<span class="skill-tag" style="border-color: var(--border-dark); color: var(--text-main); font-size: 0.7rem;">${tag}</span>`).join('')}
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
