require('dotenv').config()
import express from 'express'
import cors from 'cors'

import { configureDI } from './config/di'
import { init as initUserModule } from './module/user/module'
import { init as initCardModule } from './module/card/module'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const container: any = configureDI()

app.use(container.get('session'))

initUserModule(app, container)
initCardModule(app, container)

const userController = container.get('UserController')
app.get('/users/', userController.getAll.bind(userController))
app.get('/users/:id', userController.getByID.bind(userController))

const cardController = container.get('CardController')
app.get('/cards/:id', cardController.getByUser.bind(cardController))

app.listen(port, () => console.log(`Server listening on port ${port}`))
