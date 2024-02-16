require('dotenv').config()
import express from 'express'
import cors from 'cors'

import { configureDI } from './config/di'
import { init as initUserModule } from './module/user/module'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const container = configureDI()
app.use(container.get('Session'))

initUserModule(app, container)

const userController = container.get('UserController')
app.get('/', userController.getAll.bind(userController))
app.get('/:id', userController.getByID.bind(userController))

app.listen(port, () => console.log(`Server listening on port ${port}`))
