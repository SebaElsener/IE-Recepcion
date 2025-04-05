
const flexSwitchCheckDefault = document.getElementById('flexSwitchCheckDefault')
const flipCard = document.getElementById('flip-card')
const flexSwitchCheckDefaultLabel = document.getElementById(
	'flexSwitchCheckDefaultLabel'
)
const clientFormBack = document.getElementById('clientForm-back')
    const presupuestoBack = document.getElementById('presupuesto-back')
    const nombreApellidoBack = document.getElementById('nombreApellido-back')
    const dniBack = document.getElementById('dni-back')

const showInfo = (data) => {
    console.log(data)
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
    let queryElement
    if (presupuesto) {
        queryElement = { "presupuesto": presupuesto }
    } else if (nombreApellido) {
        queryElement = { "nombreApellido": nombreApellido }
    } else queryElement = { "dni": dni }
    postConsulta(queryElement)
})