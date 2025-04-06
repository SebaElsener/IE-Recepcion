
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
		firma: false
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