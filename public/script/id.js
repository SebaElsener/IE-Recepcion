
let id = 0

export const idMaker = (array) => {
	array.length === 0
		? (id = 1)
		: (id = parseInt(array[array.length - 1].id) + 1)
    return id
}