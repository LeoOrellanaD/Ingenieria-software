const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config()


const administradorRoutes = require('./routes/administradorRoutes')
const cobroRoutes = require('./routes/cobroRoutes')
const mantencionRoutes = require('./routes/mantencionRoutes')
const mensajeRoutes = require('./routes/mensajeRoutes')
const multaRoutes = require('./routes/multaRoutes')
const reservaRoutes = require('./routes/reservaRoutes')
const servicioRoutes = require('./routes/servicioRoutes')
const vecinoRoutes = require('./routes/vecinoRoutes')
const { AutoEncryptionLoggerLevel } = require('mongodb')

app.use(cors())
app.use(express.json())
app.options('*', cors())

app.use('/api',administradorRoutes)
app.use('/api',cobroRoutes)
app.use('/api',mantencionRoutes)
app.use('/api',mensajeRoutes)
app.use('/api',multaRoutes)
app.use('/api',reservaRoutes)
app.use('/api',servicioRoutes)
app.use('/api',vecinoRoutes)

mongoose.connect(process.env.DB, (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log('conexion exitosa')
    }
  })



app.listen(process.env.PORT, () => {
    console.log(`servidor inicializado en el puerto ${process.env.PORT}`)
})


