const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config()


app.use(cors())
app.use(express.json())
app.options('*', cors())


// mongoose.connect(process.env.DB, (error) => {
//     if (error) {
//       console.log(error)
//     } else {
//       console.log('conexion exitosa')
//     }
//   })

app.listen(process.env.PORT, () => {
    console.log(`servidor inicializado en el puerto ${process.env.PORT}`)
})


