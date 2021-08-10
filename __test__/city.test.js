const request = require('supertest')
const { app } = require('../app')

let testServer = null

beforeAll(() => {
	testServer = app.listen(5000)
})

afterAll((done) => {
	testServer.close(done)
})

describe('GET /api/cities', () => {

	it('Return all cities', async () => {
		const response = await request(app).get('/api/cities')

		expect(response.status).toBe(200)
		expect(response.body.ok).toBe(true)
		// expect(response.body.total).toBe(10)
		expect(response.body).not.toBeNull()
		expect(Array.isArray(response.body.response)).toBe(true)
	})
})

describe('GET /api/cities/city/:id', () => {

	it('Return city by id and message Found city', async () => {
		const response = await request(app).get('/api/cities/city/61031edce9fdb36a240729e0')
		expect(response.status).toBe(200)
		expect(response.body.ok).toBe(true)
		expect(response.body).not.toBeNull()
		expect(response.body.message).toBe('Found city')
	})

	it('Return The requested city was not found', async () => {

		const response = await request(app).get('/api/cities/city/61031edce9fdb36a240729e1')
		expect(response.status).toBe(400)
		expect(response.body.ok).toBe(false)
		expect(response.body.message).toBe('The requested city was not found')
	})
})

describe('GET /api/cities/city?name=City', () => {

	it('Return city by id and message Found city', async () => {
		const response = await request(app).get('/api/cities/city?name=Dubai')
		expect(response.status).toBe(200)
		expect(response.body.ok).toBe(true)
		expect(response.body).not.toBeNull()
		expect(response.body.message).toBe('Found city')
	})

	it('Return The requested city was not found', async () => {

		const response = await request(app).get('/api/cities/city?name=Sandia')
		expect(response.status).toBe(400)
		expect(response.body.ok).toBe(false)
		expect(response.body.message).toBe('The requested city was not found')
	})
})

describe('GET /api/cities/city?name=City', () => {

	it('Return city by id and message Found city', async () => {
		const response = await request(app).get('/api/cities/city?name=Dubai')
		expect(response.status).toBe(200)
		expect(response.body.ok).toBe(true)
		expect(response.body).not.toBeNull()
		expect(response.body.message).toBe('Found city')
	})

	it('Return The requested city was not found', async () => {

		const response = await request(app).get('/api/cities/city?name=Sandia')
		expect(response.status).toBe(400)
		expect(response.body.ok).toBe(false)
		expect(response.body.message).toBe('The requested city was not found')
	})
})

describe('POST /api/cities/', () => {

	it('Create a new city', async () => {

		const newCity = {
			name: 'Nueva York',
			country: 'Estados Unidos',
			img: 'url url'
		}

		const response = await request(app).post('/api/cities').send(newCity)
		// expect(response.status).toBe(201)
		// expect(response.body.ok).toBe(true)
		// expect(response.body).not.toBeNull()
		// expect(response.body.message).toBe('The city was created successfully')
	})

	it('Return The requested city was not found', async () => {

		const repeatedCity = {
			name: 'Nueva York',
			country: 'Estados Unidos',
			img: 'url url'
		}

		const response = await request(app).post('/api/cities').send(repeatedCity)
		// expect(response.status).toBe(400)
		// expect(response.body.ok).toBe(false)
		// expect(response.body.message).toBe('There is already a city with that name')
	})
})

describe('PUT /api/cities/city/:id', () => {

	it('Update city by id', async () => {

		const newCity = {
			name: 'Nueva YorK',
			country: 'Estados Unidos',
			img: 'url2'
		}

		const response = await request(app).put('/api/cities/city/6112018ffa1b4c0e30cf0a7c').send(newCity)
		// expect(response.status).toBe(200)
		// expect(response.body.ok).toBe(true)
		// expect(response.body).not.toBeNull()
		// expect(response.body.message).toBe('Successfully updated city')
	})
})


describe('DELETE /api/cities/city/:id', () => {

	it('Delete city by id', async () => {

		const id_real = '123123213312321213' //Id real de la BD

		const response = await request(app).delete(`/api/cities/city/${id_real}`)
		// expect(response.status).toBe(200)
		// expect(response.body.ok).toBe(true)
		// expect(response.body).not.toBeNull()
		// expect(response.body.message).toBe('City successfully removed')
	})
})





    