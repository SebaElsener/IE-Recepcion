
import express from 'express'
import { createServer } from 'http'
import {
	getBrands,
	getDevices,
	getModels,
	persistenceSelection,
	getPresupuestos,
	saveDevice,
	saveOrder,
	saveModel,
	saveBrand,
	presupuestoQuery,
	dniQuery,
	nombreApellidoQuery
} from './logic.js'
import { idMaker } from '../public/script/id.js'

const app = express()
const httpServer = createServer(app)

app.set('view engine', 'ejs')
app.set('views', './public/views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', async(req, res) => {
	persistenceSelection('presupuestos.txt')
	persistenceSelection('device.txt')
	persistenceSelection('model.txt')
	persistenceSelection('brand.txt')
	const ordersArray = (await getPresupuestos()) || []
	let id = 0
	ordersArray.length === 0
		? (id = 1)
		: (id = parseInt(ordersArray[ordersArray.length - 1].id) + 1)
	res.render('form', {
		orderId: id,
		brands: await getBrands(),
		devices: await getDevices(),
		models: await getModels()
	})
})
app.post('/', async (req, res) => {
    const orderToSave = req.body
	const devicesArray = await getDevices()
	const modelsArray = await getModels()
	const brandsArray = await getBrands()
	let devicesWithoutId = []
	let modelsWithoutId = []
	let brandsWithoutId = []
	devicesArray.forEach(device => {
		devicesWithoutId.push(device.device)
	})
	modelsArray.forEach((model) => {
		modelsWithoutId.push(model.model)
	})
	brandsArray.forEach((brand) => {
		brandsWithoutId.push(brand.brand)
	})
	const deviceOnBody = req.body.dispositivo
	const brandOnBody = req.body.marca
	const modelOnBody = req.body.modelo
	if (!devicesWithoutId.includes(deviceOnBody)) {
		await saveDevice({ id: idMaker(devicesArray), device: deviceOnBody })
	}
	if (!brandsWithoutId.includes(brandOnBody)) {
		await saveBrand({ id: idMaker(brandsArray), brand: brandOnBody })
	}
	if (!modelsWithoutId.includes(modelOnBody)) {
		await saveModel({ id: idMaker(modelsArray), model: modelOnBody })
	}
    await saveOrder(orderToSave)
    res.send(orderToSave.id)
})
app.post('/consultas', async (req, res) => {
	console.log(req.body)
	let queryResult
	if (req.body.presupuesto) {
		queryResult = await presupuestoQuery(req.body.presupuesto)
	} else if (req.body.dni) {
		queryResult = await dniQuery(req.body.dni)
	} else {
		queryResult = await nombreApellidoQuery(req.body.nombreApellido)
	}
	res.send(queryResult)
})

const connectedServer = httpServer.listen(8080, () => { console.log(`Server escuchando en puerto ${connectedServer.address().port}`) })
connectedServer.on('error', error => (`Error en servidor ${ error }`))