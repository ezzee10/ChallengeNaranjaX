const {response} = require('../itineraryModule')
const cityRepository = require('../../../repositories/cityRepository')
const itineraryRepository = require('../../../repositories/itineraryRepository')

/* Obtener todos los itinerarios */
const getItineraries = async (req, res = response) => { 
  
	try {
		const itinerariesDb = await itineraryRepository.getAllItineraries()
		const countItineraries = await itineraryRepository.countItineraries()  
    
		if(!itinerariesDb || itinerariesDb.length === 0){
			return res.status(401).json({
				ok: false,
				message: 'No hay itinerarios creados'
			})
		}
  
		res.status(200).json({
			ok: true,
			message: 'Itinerarios encontrados',
			itinerarios: itinerariesDb,
			total: countItineraries
		})  
	} catch (err) {
		res.status(500).json({
			ok:false,
			message: 'Error interno del servidor',
			err: err
		})
	} 
}

/* Obtener itinerarios por nombre de ciudad */
const getItineraryByNameCity = async (req, res = response) => {

	try {
		const nameCity = req.params.city
		const [{ id: cityId }] = await cityRepository.getCityByName(nameCity)
		const itinerariesDb = await itineraryRepository.getItinerariesByCity(cityId)
  
		if(!itinerariesDb || itinerariesDb.length === 0){
			return  res.status(400).json({
				ok:false,
				message: 'No hay itinerarios creados para la ciudad solicitada'
			})
		}
    
		return res.status(200).json({
			ok: true,
			message: 'Itirenarios',
			cities: itinerariesDb
		})  
  
	} catch (err) {
		res.status(500).json({
			ok:false,
			message: 'Error Interno del Servidor',
			err
		})
	}
}
  
module.exports = {
	getItineraries,
	getItineraryByNameCity
}
  