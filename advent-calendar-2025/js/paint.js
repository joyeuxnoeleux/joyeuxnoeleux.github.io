const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
let painting = false;
let paths = [];
let undone = [];
let currentPath = [];

function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight - 36;
    redraw();
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let brushColor = document.getElementById('colorPicker').value;
let brushSize = document.getElementById('brushSize').value;
let tool = document.getElementById('toolSelect').value;

document.getElementById('colorPicker').addEventListener('input', e => brushColor = e.target.value);
document.getElementById('brushSize').addEventListener('input', e => brushSize = e.target.value);
document.getElementById('toolSelect').addEventListener('change', e => tool = e.target.value);

document.getElementById('clearBtn').addEventListener('click', () => { paths = []; undone = []; redraw(); });
document.getElementById('undoBtn').addEventListener('click', () => { if (paths.length) { undone.push(paths.pop()); redraw(); } });
document.getElementById('redoBtn').addEventListener('click', () => { if (undone.length) { paths.push(undone.pop()); redraw(); } });
document.getElementById('downloadBtn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
});

function startPosition(e) { painting = true; currentPath = []; draw(e); }
function endPosition() { painting = false; if (currentPath.length) { paths.push(currentPath); currentPath = []; undone = []; ctx.beginPath(); } }
function draw(e) {
    if (!painting) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let color = brushColor;
    let size = brushSize;
    if (tool === 'eraser') { color = 'white'; }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = size;
    ctx.strokeStyle = color;

    if (tool === 'brush' || tool === 'marker' || tool === 'eraser') {
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else if (tool === 'spray') {
        for (let i = 0; i < 20; i++) {
            const offsetX = (Math.random() - 0.5) * size * 2;
            const offsetY = (Math.random() - 0.5) * size * 2;
            ctx.fillStyle = color;
            ctx.fillRect(x + offsetX, y + offsetY, 1, 1);
        }
    }
    currentPath.push({ x, y, color, size, tool });
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mouseleave', endPosition);
canvas.addEventListener('mousemove', draw);

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paths.forEach(path => {
        ctx.beginPath();
        path.forEach(point => {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = point.size;
            ctx.strokeStyle = (point.tool === 'eraser') ? 'white' : point.color;
            if (point.tool === 'spray') {
                for (let i = 0; i < 20; i++) {
                    const offsetX = (Math.random() - 0.5) * point.size * 2;
                    const offsetY = (Math.random() - 0.5) * point.size * 2;
                    ctx.fillStyle = point.color;
                    ctx.fillRect(point.x + offsetX, point.y + offsetY, 1, 1);
                }
            } else {
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
            }
        });
    });
}