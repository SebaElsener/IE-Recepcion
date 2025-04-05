// Import stylesheets
//import './style.css';

let limpiar = document.getElementById("limpiar");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let cw = canvas.width = 250,
    cx = cw / 2;
let ch = canvas.height = 150,
    cy = ch / 2;

let dibujar = false;
let factorDeAlisamiento = 5;
let Trazados = [];
let puntos = [];
ctx.lineJoin = "round";

limpiar.addEventListener('click', function (evt) {
    dibujar = false;
    ctx.clearRect(0, 0, cw, ch);
    Trazados.length = 0;
    puntos.length = 0;
}, false);

function iniciarTrazado(evt) {
    dibujar = true;
    //ctx.clearRect(0, 0, cw, ch);
    puntos.length = 0;
    ctx.beginPath();

}

function trazar(evt) {
    if (dibujar) {
        let m = oMousePos(canvas, evt);
        puntos.push(m);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
    }
}

canvas.addEventListener('mousedown', iniciarTrazado , false);
canvas.addEventListener('touchstart',event => iniciarTrazado(event.touches[0]) , false);

canvas.addEventListener('mouseup', redibujarTrazados, false);
canvas.addEventListener('touchend', event =>redibujarTrazados(event.touches[0]), false);

canvas.addEventListener("mouseout", redibujarTrazados, false);

canvas.addEventListener("mousemove", trazar, false);
canvas.addEventListener("touchmove", event => trazar(event.touches[0]), false);

function reducirArray(n, elArray) {
    let nuevoArray = [];
    nuevoArray[0] = elArray[0];
    for (let i = 0; i < elArray.length; i++) {
        if (i % n == 0) {
            nuevoArray[nuevoArray.length] = elArray[i];
        }
    }
    nuevoArray[nuevoArray.length - 1] = elArray[elArray.length - 1];
    Trazados.push(nuevoArray);
}

function calcularPuntoDeControl(ry, a, b) {
    let pc = {}
    pc.x = (ry[a].x + ry[b].x) / 2;
    pc.y = (ry[a].y + ry[b].y) / 2;
    return pc;
}

function alisarTrazado(ry) {
    if (ry.length > 1) {
        let ultimoPunto = ry.length - 1;
        ctx.beginPath();
        ctx.moveTo(ry[0].x, ry[0].y);
        for (let i = 1; i < ry.length - 2; i++) {
            let pc = calcularPuntoDeControl(ry, i, i + 1);
            ctx.quadraticCurveTo(ry[i].x, ry[i].y, pc.x, pc.y);
        }
        ctx.quadraticCurveTo(ry[ultimoPunto - 1].x, ry[ultimoPunto - 1].y, ry[ultimoPunto].x, ry[ultimoPunto].y);
        ctx.stroke();
    }
}

function redibujarTrazados() {
    dibujar = false;
    ctx.clearRect(0, 0, cw, ch);
    reducirArray(factorDeAlisamiento, puntos);
    for (let i = 0; i < Trazados.length; i++)
        alisarTrazado(Trazados[i]);
}

function oMousePos(canvas, evt) {
    let ClientRect = canvas.getBoundingClientRect();
    return { //objeto
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
    }
}

/* Enviar el trazado */
function GuardarTrazado() {
    imagen.value = document.getElementById('canvas').toDataURL('image/png');
    //document.forms['incineracionForm'].submit();
}

/* Limpiar pizarra */
function limpiarTrazado() {
    dibujar = false;
    ctx.clearRect(0, 0, cw, ch);
    Trazados.length = 0;
    puntos.length = 0;
  }


