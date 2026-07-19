// Overlay animado sobre la imagen de fondo
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let time = 0;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

const PARTICLE_COUNT = 40;
const COLORS = [
    'rgba(150, 50, 180, 0.4)',
    'rgba(100, 20, 140, 0.3)',
    'rgba(200, 80, 160, 0.3)',
    'rgba(180, 60, 200, 0.2)',
    'rgba(255, 255, 255, 0.15)',
];

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }

    update() {
        this.x += this.speedX + Math.sin(time * 0.5 + this.y * 0.005) * 0.15;
        this.y += this.speedY + Math.cos(time * 0.5 + this.x * 0.005) * 0.15;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                const opacity = (1 - dist / 120) * 0.08;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(200, 150, 255, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function drawOverlay() {
    time += 0.003;

    // Limpiar canvas (transparente para dejar ver la imagen)
    ctx.clearRect(0, 0, width, height);

    // Velo oscuro sutil para que los botones se lean bien
    ctx.fillStyle = 'rgba(13, 7, 18, 0.35)';
    ctx.fillRect(0, 0, width, height);

    // Gradientes animados semi-transparentes
    const x1 = Math.sin(time * 0.7) * width * 0.3 + width * 0.5;
    const y1 = Math.cos(time * 0.5) * height * 0.3 + height * 0.3;

    const gradient1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, width * 0.4);
    gradient1.addColorStop(0, 'rgba(100, 20, 140, 0.08)');
    gradient1.addColorStop(1, 'rgba(100, 20, 140, 0)');
    ctx.fillStyle = gradient1;
    ctx.fillRect(0, 0, width, height);

    const x2 = Math.cos(time * 0.4) * width * 0.25 + width * 0.6;
    const y2 = Math.sin(time * 0.6) * height * 0.25 + height * 0.7;

    const gradient2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, width * 0.35);
    gradient2.addColorStop(0, 'rgba(200, 60, 140, 0.06)');
    gradient2.addColorStop(1, 'rgba(200, 60, 140, 0)');
    ctx.fillStyle = gradient2;
    ctx.fillRect(0, 0, width, height);
}

function animate() {
    drawOverlay();

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    drawConnections();

    requestAnimationFrame(animate);
}

animate();
