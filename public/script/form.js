
const config = {
	creatable: true, // Toggle search feature. Default: false
	search: true,
	maxHeight: '360px', // Max height for showing scrollbar. Default: 360px
	size: '', // Can be "sm" or "lg". Default '',
	addOptionPlaceholder: 'Item no existe.  Desea agregarlo?'
}

dselect(document.querySelector('#dispositivo'), config)
dselect(document.querySelector('#marca'), config)
dselect(document.querySelector('#modelo'), config)