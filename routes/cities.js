const { Router } = require('../cityCase/cityModule')
const router = new Router()
const { post, get } = require('../cityCase/cityController')

/* Obtener todas las ciudades */
router.get('/all', get.getCities)
/* Obtener ciudad por id */
router.get('/city/:id', get.getCity) 
/* Obtener ciudad por nombre */
router.get('/city', get.getCityByQuery)

/* Crear una nueva ciudad */
router.post('/', post.createCity)

module.exports = router

















  
module.exports = router
