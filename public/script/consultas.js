
const flexSwitchCheckDefault = document.getElementById('flexSwitchCheckDefault')
const flipCard = document.getElementById('flip-card')
const flexSwitchCheckDefaultLabel = document.getElementById(
	'flexSwitchCheckDefaultLabel'
)
const clientFormBack = document.getElementById('clientForm-back')
const presupuestoBack = document.getElementById('presupuesto-back')
const nombreApellidoBack = document.getElementById('nombreApellido-back')
const dniBack = document.getElementById('dni-back')
const fechaRecepcionBack = document.getElementById('fechaRecepcion-back')
const dispositivoBack = document.getElementById('dispositivo-back')
const marcaBack = document.getElementById('marca-back')
const modeloBack = document.getElementById('modelo-back')
const problemaBack = document.getElementById('problema-back')
const fechaDiagnosticoBack = document.getElementById('fechaDiagnostico-back')
const fechaReparacionBack = document.getElementById('fechaReparacion-back')
const contactoBack = document.getElementById('contacto-back')
const signImage = document.getElementById('signImage')
const clearSignContainer = document.getElementById('clearSignContainer')
const dniLabelBack = document.getElementById('dniLabel-back')

const showInfo = (data) => {
    presupuestoBack.value = data.id
    fechaRecepcionBack.value = data.fechaRecepcion
    nombreApellidoBack.value = `Nombre y apellido: ${data.nombreApellido}`
    dniLabelBack.innerText = 'DNI: ' + data.dni
    dniBack.value = parseInt(data.dni)
    dispositivoBack.value = `Dispositivo: ${data.dispositivo}`
    marcaBack.value = `Marca: ${data.marca}`
    modeloBack.value = `Modelo: ${data.modelo}`
    problemaBack.value = `Diagnóstico: ${data.problema}`
    fechaDiagnosticoBack.value = data.fechaDiagnostico
    fechaReparacionBack.value = data. fechaReparacion
    contactoBack.value = `Contacto: ${data.contacto}`
    console.log(signImage)
    if (data.firma) {
        signImage.innerHTML =
            `
            <img src="${data.firma} " alt="Firma cliente">
            `
        clearSignContainer.innerHTML = ''
    }
}

const postConsulta = async (data) => {
    await fetch('/consultas', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then((res) => res.json())
    .then((data) => showInfo(data))
}

flexSwitchCheckDefault.addEventListener('change', (event) => {
    if (event.target.checked) {
        flipCard.style.transform = 'rotateY(180deg)'
        flexSwitchCheckDefaultLabel.innerText = 'Consultas'
    } else {
        flexSwitchCheckDefaultLabel.innerText = 'Registro clientes'
        flipCard.style.transform = ''
    }
})

presupuestoBack.addEventListener('focus', (event) => {
    nombreApellidoBack.setAttribute('disabled', 'true')
    nombreApellidoBack.setAttribute('placeholder', '')
    dniBack.setAttribute('disabled', 'true')
    dniBack.setAttribute('placeholder', '')
    nombreApellidoBack.value = null
    dniBack.value = null
})
presupuestoBack.addEventListener('blur', (event) => {
	nombreApellidoBack.removeAttribute('disabled')
	nombreApellidoBack.setAttribute(
		'placeholder',
		'Consultar por nombre o apellido'
	)
	dniBack.removeAttribute('disabled')
	dniBack.setAttribute('placeholder', 'Consultar por DNI')
})

nombreApellidoBack.addEventListener('focus', (event) => {
    presupuestoBack.setAttribute('disabled', 'true')
    presupuestoBack.setAttribute('placeholder', '')
    dniBack.setAttribute('disabled', 'true')
    dniBack.setAttribute('placeholder', '')
    presupuestoBack.value = null
    dniBack.value = null
})
nombreApellidoBack.addEventListener('blur', (event) => {
	presupuestoBack.removeAttribute('disabled')
	presupuestoBack.setAttribute('placeholder', 'Consultar por presupuesto')
	dniBack.removeAttribute('disabled')
	dniBack.setAttribute('placeholder', 'Consultar por DNI')
})

dniBack.addEventListener('focus', (event) => {
    presupuestoBack.setAttribute('disabled', 'true')
    presupuestoBack.setAttribute('placeholder', '')
    nombreApellidoBack.setAttribute('disabled', 'true')
    nombreApellidoBack.setAttribute('placeholder', '')
    presupuestoBack.value = null
    nombreApellidoBack.value = null
})
dniBack.addEventListener('blur', (event) => {
	presupuestoBack.removeAttribute('disabled')
	presupuestoBack.setAttribute('placeholder', 'Consultar por presupuesto')
	nombreApellidoBack.removeAttribute('disabled')
	nombreApellidoBack.setAttribute('placeholder', 'Consultar por nombre o apellido')
})

clientFormBack.addEventListener('submit', (event) => {
    event.preventDefault()
    const presupuesto = document.getElementById('presupuesto-back').value
    const nombreApellido = document.getElementById('nombreApellido-back').value
    const dni = document.getElementById('dni-back').value
    const clientSign = document.getElementById('canvas').toDataURL('image/png')
    let firma
    clientSign === 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAD6CAYAAADp0S9WAAAAAXNSR0IArs4c6QAAB+pJREFUeF7t1MEJAAAIAzG7/9Juca+4QCHI7RwBAgQIpAJL14wRIECAwAmvJyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAgIrx8gQIBALCC8Mbg5AgQICK8fIECAQCwgvDG4OQIECAivHyBAgEAsILwxuDkCBAg8OF0A+4KR/xoAAAAASUVORK5CYII='
        ? firma = false
        : firma = clientSign
    let queryElement
    if (presupuesto) {
        queryElement = { "presupuesto": presupuesto }
    } else if (nombreApellido) {
        queryElement = { "nombreApellido": nombreApellido }
    } else queryElement = { "dni": dni }
    postConsulta({ ...queryElement, "firma": firma })
})

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
