const { Router } = require('../cases/itineraryCase/itineraryModule')
const router = new Router()
const { get } = require('../cases/itineraryCase/itineraryController')

/* Obtener todos los itinerarios */
router.get('/all', get.getItineraries)
/* Obtener itinerarios por nombre de ciudad */
router.get('/city/:city', get.getItineraryByNameCity)

module.exports = router
