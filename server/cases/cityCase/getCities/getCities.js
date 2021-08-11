const {response} = require('../cityModule')
const cityRepository = require('../../../repositories/cityRepository')

/* Obtener todas las ciudades */
const getCities = async (req, res = response) => { 
  
	try {
		const citiesDb = await cityRepository.getAll()
		const count = await cityRepository.count()  

		if(citiesDb.length === 0){
			res.status(401).json({
				ok: false,
				message: 'No hay ciudades'
			})
		}
  
		res.status(200).json({
			ok: true,
			message: 'Ciudades',
			response: citiesDb,
			total: count
		})  
	} catch (err) {
		res.status(500).json({
			ok:false,
			message: 'Error interno del servidor',
			err: err
		})
	} 
}

/* Obtener una ciudad por id (PathParam)*/
const getCity = async (req, res = response) => {

	const { id } = req.params
  
	try {
		const cityDb = await cityRepository.getOne(id)
  
		if(!cityDb){
			return res.status(400).json({
				ok:false,
				message: 'The requested city was not found'
			})
		}
    
		return res.status(200).json({
			ok: true,
			message: 'Found city',
			cities: cityDb
		})  
  
	} catch (err) {
		return res.status(500).json({
			ok:false,
			message: 'Internal Server Error',
			err
		})
	}
}
  
/* Obtener una ciudad por nombre (QueryParam) */
const getCityByQuery = async (req, res = response) => {

	const { name } = req.query
  
	try {
  
		const cityDb = await cityRepository.getCityByName(name)
  
		if(!cityDb){
			return  res.status(400).json({
				ok:false,
				message: 'The requested city was not found'
			})
		}
    
		return res.status(200).json({
			ok: true,
			message: 'Found city',
			cities: cityDb
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
	getCities,
	getCity,
	getCityByQuery
}
  