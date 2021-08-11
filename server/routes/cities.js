const { Router } = require('../cases/cityCase/cityModule')
const router = new Router()
const { get, post, put, remove } = require('../cases/cityCase/cityController')
const { check } = require('express-validator')
const { checkDuplicateCity } = require('../middlewares/checkDuplicateCity')

/* Obtener todas las ciudades */
router.get('/', get.getCities)
/* Obtener ciudad por id */
router.get('/city/:id', get.getCity) 
/* Obtener ciudad por nombre */
router.get('/city', get.getCityByQuery)

/* Crear una nueva ciudad */
router.post('/', 
	[
		check('name', 'Name is required and cannot be empty').not().isEmpty(),
		check('country', 'Country name is required and cannot be empty').not().isEmpty(),
		check('img', 'Image is required and cannot be empty').not().isEmpty(),
		checkDuplicateCity
	],
	post.createCity
)

/* Actualiza una ciudad por id */
router.put('/city/:id', put.updateCity)

/* Remover una ciudad por id */
router.delete('/city/:id', remove.deleteCity)

module.exports = router

















  
module.exports = router
