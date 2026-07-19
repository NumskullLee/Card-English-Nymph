// Efecto mágico del cursor — estela de partículas brillantes
const cursorCanvas = document.createElement('canvas');
cursorCanvas.id = 'cursor-canvas';
cursorCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:none;';
document.body.appendChild(cursorCanvas);

const cCtx = cursorCanvas.getContext('2d');
let cWidth, cHeight;
let sparkles = [];
let mouseX = -100, mouseY = -100;

function resizeCursor() {
    cWidth = cursorCanvas.width = window.innerWidth;
    cHeight = cursorCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCursor);
resizeCursor();

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Crear chispas en cada movimiento
    for (let i = 0; i < 2; i++) {
        sparkles.push(new Sparkle(mouseX, mouseY));
    }
});

// También crear chispas al hacer click
document.addEventListener('click', (e) => {
    for (let i = 0; i < 12; i++) {
        sparkles.push(new Sparkle(e.clientX, e.clientY, true));
    }
});

const SPARKLE_COLORS = [
    '#e0aaff',  // lavanda
    '#c77dff',  // púrpura claro
    '#9d4edd',  // púrpura
    '#ff79c6',  // rosa
    '#ffffff',  // blanco
    '#bd93f9',  // lila
];

class Sparkle {
    constructor(x, y, burst = false) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + (burst ? 2 : 1);
        const angle = Math.random() * Math.PI * 2;
        const speed = burst ? Math.random() * 3 + 1 : Math.random() * 1 + 0.3;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed + (burst ? 0 : 0.5);
        this.life = 1;
        this.decay = burst ? 0.02 + Math.random() * 0.02 : 0.015 + Math.random() * 0.01;
        this.color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.2;
        this.type = Math.random() > 0.6 ? 'star' : 'circle';
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.02; // gravedad suave
        this.life -= this.decay;
        this.rotation += this.rotSpeed;
        this.size *= 0.99;
    }

    draw() {
        cCtx.save();
        cCtx.translate(this.x, this.y);
        cCtx.rotate(this.rotation);
        cCtx.globalAlpha = this.life;

        if (this.type === 'star') {
            drawStar(cCtx, 0, 0, this.size, this.color);
        } else {
            cCtx.beginPath();
            cCtx.arc(0, 0, this.size, 0, Math.PI * 2);
            cCtx.fillStyle = this.color;
            cCtx.shadowColor = this.color;
            cCtx.shadowBlur = 6;
            cCtx.fill();
        }

        cCtx.restore();
    }
}

function drawStar(ctx, x, y, size, color) {
    const spikes = 4;
    const outerRadius = size;
    const innerRadius = size * 0.4;

    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / spikes;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.fill();
}

function animateCursor() {
    cCtx.clearRect(0, 0, cWidth, cHeight);

    // Glow suave alrededor del cursor
    const gradient = cCtx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 30);
    gradient.addColorStop(0, 'rgba(189, 147, 249, 0.15)');
    gradient.addColorStop(1, 'rgba(189, 147, 249, 0)');
    cCtx.fillStyle = gradient;
    cCtx.fillRect(mouseX - 30, mouseY - 30, 60, 60);

    sparkles.forEach(s => {
        s.update();
        s.draw();
    });

    // Limpiar partículas muertas
    sparkles = sparkles.filter(s => s.life > 0);

    requestAnimationFrame(animateCursor);
}

animateCursor();
