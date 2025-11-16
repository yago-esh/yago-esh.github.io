// ============ THEME TOGGLE ============
const toggleButton = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

toggleButton.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    toggleButton.style.transform = 'rotate(360deg)';
    setTimeout(() => toggleButton.style.transform = 'rotate(0deg)', 300);
});

// ============ SMOOTH SCROLL & ACTIVE NAV ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============ INTERSECTION OBSERVER - Animaciones on scroll ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============ CHATBOT DEMO ============
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

const responses = {
    'experiencia': '8+ años en AI conversacional para contact centers. He trabajado en soluciones LLM con empresas como Vodafone, Naturgy, Avatel y Caser.',
    'proyectos': 'Destaco:\n• Generative IVR para Avatel - Voice agent con arquitectura agentic\n• Migración Azure OpenAI → AWS Bedrock para Naturgy\n• Intent classifier para Google Play reviews de Vodafone',
    'tecnologías': 'Backend: Java, Python, Node.js, JavaScript\nAI/NLU: LLMs, Prompt Engineering, Nuance Mix, Amazon Lex, DialogFlow, Genesys Cloud\nCloud: AWS, Azure, GCP, Docker, Kubernetes, CI/CD',
    'contacto': '📧 yago.esh@gmail.com\n📱 +34 606 78 33 23\n📍 Madrid, España',
    'aws': 'Experiencia con AWS: Bedrock, Lambda, S3, SageMaker, EC2, RDS, DynamoDB',
    'llms': 'Trabajé con: Claude, GPT-4, Nova Pro, Llama, Mistral. Especializado en prompt engineering y fine-tuning.'
};

// Mostrar mensaje inicial del bot
window.addEventListener('load', () => {
    setTimeout(() => {
        addMessage('¡Hola! Soy el asistente de Yago. Pregúntame sobre su experiencia, proyectos, tecnologías o contacto.', 'bot');
    }, 500);
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value) {
        const userMsg = chatInput.value;
        addMessage(userMsg, 'user');
        
        // Buscar respuesta en base a palabras clave
        const lowerMsg = userMsg.toLowerCase();
        let reply = '¿Pregúntame sobre: experiencia, proyectos, tecnologías, AWS, LLMs, o contacto?';
        
        for (const [key, value] of Object.entries(responses)) {
            if (lowerMsg.includes(key)) {
                reply = value;
                break;
            }
        }
        
        chatInput.value = '';
        
        // Simular que el bot está escribiendo
        showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            addMessage(reply, 'bot');
        }, 600);
    }
});

function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.textContent = text;
    msg.style.opacity = '0';
    msg.style.animation = 'fadeInUp 0.3s ease-out forwards';
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.className = 'message bot typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    typing.id = 'typing-indicator';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

// ============ DESCARGAR CV ============
function downloadCV() {
    // Crear un enlace temporal para descargar
    const link = document.createElement('a');
    link.href = '#'; // Aquí irá la URL real del CV
    link.download = 'Yago_Echave_CV.pdf';
    link.click();
    // Alternativa: mostrar un mensaje
    setTimeout(() => {
        alert('El CV se descargará cuando se agregue el archivo PDF al repositorio.');
    }, 200);
}