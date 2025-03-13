import express from 'express'
import backend from './backend/build/src/app.js'
const frontend = "./frontend/dist/";

const PORT = process.env.PORT || 3003

const app = express();

app.use(express.static(frontend))

app.use('/api', backend)

app.get('/', (req, res) => res.sendFile(frontend))

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})
