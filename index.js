import dotenv from 'dotenv';
import express from 'express'
import { app as backend } from './backend/build/src/app.js'
const frontend = "./frontend/dist/";

dotenv.config()

const PORT = 4004

const server = express();

server.use(express.static(frontend))

server.use('/api', backend)

server.get('/', (req, res) => res.sendFile(frontend))

server.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})
