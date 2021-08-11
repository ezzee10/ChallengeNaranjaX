const {response} = require('../cityModule')
const cityRepository = require('../../../repositories/cityRepository')

/* Update city by id with PUT*/
const deleteCity = async (req, res = response) => {

	const { id } = req.params

	try {
		
		const deleteCity = await cityRepository.deleteCity(id, req.body)
  
		if(!deleteCity){
			return res.status(400).json({
				ok:false,
				message: 'The requested city was not found'
			})
		}
    
		return res.status(200).json({
			ok: true,
			message: 'City successfully removed',
			cities: deleteCity
		})  
  
	} catch (err) {
		return res.status(500).json({
			ok:false,
			message: 'Error Internal Server',
			err
		})
	}
}

module.exports = {
	deleteCity
}
  