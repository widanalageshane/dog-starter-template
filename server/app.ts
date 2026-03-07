import express from 'express'
import cors from 'cors'
import dogRoutes from './routes/dogRoutes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/dogs', dogRoutes)

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

export default app