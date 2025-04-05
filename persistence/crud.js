
import { promises } from 'fs'

class Contenedor {
	constructor(fileName) {
		this.newFile = fileName
	}

	async saveData(data) {
		try {
			await promises.writeFile(
				this.newFile,
				JSON.stringify(data, null, 2)
			)
		} catch (err) {
			console.log('error escritura en archivo!', err)
		}
	}

	async saveOrder(order) {
		try {
			const ordersArray = await this.getAll()
			ordersArray.push(order)
			await this.saveData(ordersArray)
			console.log(`Orden Nro. ${order.id} ingresada ok!`)
			return order
		} catch (err) {
			console.log('error escritura en archivo!', err)
		}
	}

	async saveDevice(device) {
		try {
			const deviceArray = await this.getAll()
			deviceArray.push(device)
			await this.saveData(deviceArray)
			console.log(`Dispositivo ${device.device} ingresado ok!`)
			return device
		} catch (err) {
			console.log('error escritura en archivo!', err)
		}
	}

	async saveModel(model) {
		try {
			const modelArray = await this.getAll()
			modelArray.push(model)
			await this.saveData(modelArray)
			console.log(`Dispositivo ${model.model} ingresado ok!`)
			return model
		} catch (err) {
			console.log('error escritura en archivo!', err)
		}
	}

	async saveBrand(brand) {
		try {
			const brandArray = await this.getAll()
			brandArray.push(brand)
			await this.saveData(brandArray)
			console.log(`Dispositivo ${brand.brand} ingresado ok!`)
			return brand
		} catch (err) {
			console.log('error escritura en archivo!', err)
		}
	}

	async getById(id) {
		const productsArray = await this.getAll()
		try {
			const productById = productsArray.find(
				(product) => product.id === id
			)
			return productById || null
		} catch (err) {
			console.log('Error, ', err)
		}
	}

	async getByModel(modeltofind) {
		const modelArray = await this.getAll()
		try {
			const matchedModel = modelArray.find(
				(model) => model === modeltofind
			)
			return matchedModel || null
		} catch (err) {
			console.log('Error, ', err)
		}
	}

	async getAll() {
		try {
			const content = await promises.readFile(this.newFile)
			const contentArray = JSON.parse(content)
			return contentArray
		} catch (err) {
			console.log('Archivo vacío')
			return []
		}
	}

	async deleteById(id) {
		const productsArray = await this.getAll()
		try {
			const filteredProducts = productsArray.filter(
				(product) => product.id !== id
			)
			this.saveData(filteredProducts)
		} catch (err) {
			console.log('Error, ', err)
		}
	}

	async deleteAll() {
		try {
			this.saveData([])
			console.log('Productos eliminados!')
		} catch (err) {
			console.log('Error, productos no eliminados!', err)
		}
	}
}

export default Contenedor