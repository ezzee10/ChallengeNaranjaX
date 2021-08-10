const { Router } = require('../cityCase/cityModule')
const router = new Router()
const { get, post, put, remove } = require('../cityCase/cityController')

/* Obtener todas las ciudades */
router.get('/', get.getCities)
/* Obtener ciudad por id */
router.get('/city/:id', get.getCity) 
/* Obtener ciudad por nombre */
router.get('/city', get.getCityByQuery)

/* Crear una nueva ciudad */
router.post('/', post.createCity)

/* Actualiza una ciudad por id */
router.put('/city/:id', put.updateCity)

/* Remover una ciudad por id */
router.delete('/city/:id', remove.deleteCity)

module.exports = router

















  
module.exports = router
