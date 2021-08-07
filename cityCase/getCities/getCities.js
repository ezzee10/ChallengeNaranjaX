const {response} = require('../cityModule')
const cityRepository = require('../../repositories/cityRepository')

/* Obtener todas las ciudades */
const getCities = async (req, res = response) => { 
  
	try {
		const citiesDb = await cityRepository.getAll()
		const count = await cityRepository.count()  

		if(!citiesDb || citiesDb.length === 0){
			return res.status(401).json({
				ok: false,
				message: 'No hay ciudades'
			})
		}
  
		res.status(200).json({
			ok: true,
			message: 'Ciudades',
			cities: citiesDb,
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

	const id = req.params.id
  
	try {
		const cityDb = await cityRepository.getOne(id)
  
		if(!cityDb || cityDb.length === 0){
			return  res.status(400).json({
				ok:false,
				message: 'No se encontró la ciudad solicitada'
			})
		}
    
		return res.status(200).json({
			ok: true,
			message: 'Ciudad',
			cities: cityDb
		})  
  
	} catch (err) {
		res.status(500).json({
			ok:false,
			message: 'Error interno del servidor',
			err
		})
	}
}
  
/* Obtener una ciudad por nombre (QueryParam) */
const getCityByQuery = async (req, res = response) => {

	const name = req.query.name

	console.log(name)
  
	try {
  
		const cityDb = await cityRepository.getCityByName(name)
  
		if(!cityDb || cityDb.length === 0){
			return  res.status(400).json({
				ok:false,
				message: 'No se encontró la ciudad solicitada'
			})
		}
    
		return res.status(200).json({
			ok: true,
			message: 'Ciudad',
			cities: cityDb
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
	getCities,
	getCity,
	getCityByQuery
}
  