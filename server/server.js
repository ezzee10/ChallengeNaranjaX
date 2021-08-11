const passport = require('passport')
const {app, port} = require('./app')

//passport middleware
app.use(passport.initialize())

app.listen (port, () => {
	console.log ('El servidor se está ejecutando en el puerto ' + port)
})

