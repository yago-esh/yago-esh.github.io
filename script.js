// Theme Toggle
const toggleButton = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

toggleButton.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Chatbot Demo (basado en reglas simples)
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

const responses = {
    'experiencia': 'Tengo 8+ años en AI conversacional para contact centers',
    'proyectos': 'Destaco Avatel (Generative IVR) y migración Nova Pro para Naturgy',
    'tecnologías': 'Java, Python, Node.js, AWS, LLMs, Nuance Mix, Lex, DialogFlow',
    'contacto': 'Puedes escribirme a yago@example.com o +34 606 78 33 23'
};

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value) {
        const userMsg = chatInput.value;
        addMessage(userMsg, 'user');
        
        const reply = responses[Object.keys(responses).find(k => userMsg.toLowerCase().includes(k))] || 
            'Pregúntame sobre mi experiencia, proyectos o tecnologías. Aquí estoy para demostrar cómo funciona un chatbot inteligente!';
        
        setTimeout(() => addMessage(reply, 'bot'), 500);
        chatInput.value = '';
    }
});

function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Descargar CV
function downloadCV() {
    alert('Aquí iría el enlace a tu CV.pdf');
}