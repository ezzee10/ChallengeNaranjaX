const {response} = require('../itineraryModule')
const cityRepository = require('../../../repositories/cityRepository')
const itineraryRepository = require('../../../repositories/itineraryRepository')

/* Get all itineraries */
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

/* Get itinerary by city ID */
const getItineraryByCityId = async (req, res = response) => {

	const { id } = req.params

	try {
		
		const city = await cityRepository.getOne(id)
		const itineraryCity = await itineraryRepository.getItinerariesByCity(city._id) //return an array

		if(!itineraryCity.length === 0){
			return  res.status(400).json({
				ok:false,
				message: 'No itinerary found'
			})
		}
    
		return res.status(200).json({
			ok: true,
			message: 'Itineraries',
			response: itineraryCity
		})  
  
	} catch (err) {
		res.status(500).json({
			ok:false,
			message: 'Internal Server Error',
			err
		})
	}
}

/* Get itinerary by city */
const getItineraryByNameCity = async (req, res = response) => {

	try {
		const nameCity = req.params.city
		const [{ id: cityId }] = await cityRepository.getCityByName(nameCity)
		const itinerariesDb = await itineraryRepository.getItinerariesByCity(cityId)
  
		if(!itinerariesDb || itinerariesDb.length === 0){
			return  res.status(400).json({
				ok:false,
				message: 'There are no itineraries for the requested city'
			})
		}
    
		return res.status(200).json({
			ok: true,
			message: 'Itineraries',
			cities: itinerariesDb
		})  
  
	} catch (err) {
		res.status(500).json({
			ok:false,
			message: 'Internal Server Error',
			err
		})
	}
}
  
module.exports = {
	getItineraries,
	getItineraryByCityId,
	getItineraryByNameCity
}
  