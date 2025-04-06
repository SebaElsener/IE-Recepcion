
import Contenedor from "../persistence/crud.js"

let presupuestos
let brand
let model
let device

const persistenceSelection = (persistence) => {
	switch (persistence) {
		case 'presupuestos.txt':
			presupuestos = new Contenedor('persistence/presupuestos.txt')
			console.log('presupuestos iniciado')
			break
		case 'brand.txt':
			brand = new Contenedor('persistence/brand.txt')
			console.log('brand iniciado')
			break
		case 'model.txt':
			model = new Contenedor('persistence/model.txt')
			console.log('model iniciado')
			break
		case 'device.txt':
			device = new Contenedor('persistence/device.txt')
			console.log('device iniciado')
			break
	}
}

const getBrands = async () => {
    return await brand.getAll()
}

const getModels = async () => {
	return await model.getAll()
}

const getDevices = async () => {
	return await device.getAll()
}

const getPresupuestos = async () => {
	return await presupuestos.getAll()
}

const saveDevice = async (item) => {
	return await device.saveDevice(item)
}

const saveModel = async (item) => {
	return await model.saveModel(item)
}

const saveBrand = async (item) => {
	return await brand.saveBrand(item)
}

const saveOrder = async (item) => {
	return await presupuestos.saveOrder(item)
}

const nombreApellidoQuery = async (nombreApellido) => {

}

const presupuestoQuery = async (presupuesto) => {
	return await presupuestos.getById(presupuesto)
}

const dniQuery = async (dni) => {

}

export {
	getBrands,
	getModels,
	getDevices,
	persistenceSelection,
	getPresupuestos,
	saveDevice,
	saveOrder,
	saveBrand,
	saveModel,
	presupuestoQuery,
	nombreApellidoQuery,
	dniQuery
}