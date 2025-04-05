
// Insertar fecha ingreso
const fechaRecepcionSelectDomNode = document.getElementById('fechaRecepcion')
const dateStamp = new Date().toLocaleDateString('sp-ES')
fechaRecepcionSelectDomNode.value = dateStamp

const clientForm = document.getElementById('clientForm')
const dispositivo = document.getElementById('dispositivo')
const marca = document.getElementById('marca')
const modelo = document.getElementById('modelo')

const postRepairOrder = async (order) => {
	await fetch('/', {
		method: 'POST',
		body: JSON.stringify(order),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then((res) => res.json())
		.then((json) => showToast(json))
}

clientForm.addEventListener('submit', (event) => {
	event.preventDefault()
	const presupuesto = document.getElementById('presupuesto').value
	const fechaRecepcion = document.getElementById('fechaRecepcion').value
	const nombreApellido = document.getElementById('nombreApellido').value
	const dni = document.getElementById('dni').value
	const dispositivo = document.getElementById('dispositivo').value
	const marca = document.getElementById('marca').value
	const modelo = document.getElementById('modelo').value
	const problema = document.getElementById('problema').value
	const fechaDiagnostico = document.getElementById('fechaDiagnostico').value
	const fechaReparacion = document.getElementById('fechaReparacion').value
	const contacto = document.getElementById('contacto').value
	const firma = document.getElementById('canvas').toDataURL('image/png')
	const orderToSave = {
		id: presupuesto,
		fechaRecepcion: fechaRecepcion,
		nombreApellido: nombreApellido,
		dni: dni,
		dispositivo: dispositivo,
		marca: marca,
		modelo: modelo,
		problema: problema,
		fechaDiagnostico: fechaDiagnostico,
		fechaReparacion: fechaReparacion,
		contacto: contacto,
		firma: firma
	}
	postRepairOrder(orderToSave)
})

const showToast = (orderId) => {
	Toastify({
		text: `Orden de reparación Nro. ${orderId} ingresada\nClick aquí para continuar`,
		duration: -1,
		destination: '/',
		newWindow: false,
		close: false,
		gravity: 'top', // `top` or `bottom`
		position: 'left', // `left`, `center` or `right`
		stopOnFocus: true, // Prevents dismissing of toast on hover
		style: {
			background: 'linear-gradient(to right, #00b09b, #96c93d)'
		},
		offset: {
			x: 150,
			y: 150
		}
		//onClick: function () {} // Callback after click
	}).showToast()
}


/////////////////canvas para firmar
let limpiar = document.getElementById('limpiar')
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let cw = (canvas.width = 350),
	cx = cw / 2
let ch = (canvas.height = 250),
	cy = ch / 2

let dibujar = false
let factorDeAlisamiento = 5
let Trazados = []
let puntos = []
ctx.lineJoin = 'round'

limpiar.addEventListener(
	'click',
	function (evt) {
		dibujar = false
		ctx.clearRect(0, 0, cw, ch)
		Trazados.length = 0
		puntos.length = 0
	},
	false
)

function iniciarTrazado(evt) {
	dibujar = true
	//ctx.clearRect(0, 0, cw, ch);
	puntos.length = 0
	ctx.beginPath()
}

function trazar(evt) {
	if (dibujar) {
		let m = oMousePos(canvas, evt)
		puntos.push(m)
		ctx.lineTo(m.x, m.y)
		ctx.stroke()
	}
}

canvas.addEventListener('mousedown', iniciarTrazado, false)
canvas.addEventListener(
	'touchstart',
	(event) => iniciarTrazado(event.touches[0]),
	false
)

canvas.addEventListener('mouseup', redibujarTrazados, false)
canvas.addEventListener(
	'touchend',
	(event) => redibujarTrazados(event.touches[0]),
	false
)

canvas.addEventListener('mouseout', redibujarTrazados, false)

canvas.addEventListener('mousemove', trazar, false)
canvas.addEventListener('touchmove', (event) => trazar(event.touches[0]), false)

function reducirArray(n, elArray) {
	let nuevoArray = []
	nuevoArray[0] = elArray[0]
	for (let i = 0; i < elArray.length; i++) {
		if (i % n == 0) {
			nuevoArray[nuevoArray.length] = elArray[i]
		}
	}
	nuevoArray[nuevoArray.length - 1] = elArray[elArray.length - 1]
	Trazados.push(nuevoArray)
}

function calcularPuntoDeControl(ry, a, b) {
	let pc = {}
	pc.x = (ry[a].x + ry[b].x) / 2
	pc.y = (ry[a].y + ry[b].y) / 2
	return pc
}

function alisarTrazado(ry) {
	if (ry.length > 1) {
		let ultimoPunto = ry.length - 1
		ctx.beginPath()
		ctx.moveTo(ry[0].x, ry[0].y)
		for (let i = 1; i < ry.length - 2; i++) {
			let pc = calcularPuntoDeControl(ry, i, i + 1)
			ctx.quadraticCurveTo(ry[i].x, ry[i].y, pc.x, pc.y)
		}
		ctx.quadraticCurveTo(
			ry[ultimoPunto - 1].x,
			ry[ultimoPunto - 1].y,
			ry[ultimoPunto].x,
			ry[ultimoPunto].y
		)
		ctx.stroke()
	}
}

function redibujarTrazados() {
	dibujar = false
	ctx.clearRect(0, 0, cw, ch)
	reducirArray(factorDeAlisamiento, puntos)
	for (let i = 0; i < Trazados.length; i++) alisarTrazado(Trazados[i])
}

function oMousePos(canvas, evt) {
	let ClientRect = canvas.getBoundingClientRect()
	return {
		//objeto
		x: Math.round(evt.clientX - ClientRect.left),
		y: Math.round(evt.clientY - ClientRect.top)
	}
}

/* Enviar el trazado */
// function GuardarTrazado() {
// 	imagen.value = document.getElementById('canvas').toDataURL('image/png')
// 	//document.forms['incineracionForm'].submit();
// }

/* Limpiar pizarra */
function limpiarTrazado() {
	dibujar = false
	ctx.clearRect(0, 0, cw, ch)
	Trazados.length = 0
	puntos.length = 0
}