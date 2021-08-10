const {response} = require('../cityModule')
const cityRepository = require('../../repositories/cityRepository')

/* Update city by id */
const updateCity = async (req, res = response) => {

	const { id } = req.params

	try {
		
		const cityUpdate = await cityRepository.updateCity(id, req.body)
  
		if(!cityUpdate){
			return res.status(400).json({
				ok:false,
				message: 'The requested city was not found'
			})
		}
    
		return res.status(200).json({
			ok: true,
			message: 'Successfully updated city',
			cities: cityUpdate
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
	updateCity
}
  