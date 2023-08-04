import express, { Express } from 'express'
import cors from 'cors'
import { TaskController } from './controllers/task.controller'
import { Config } from './config/config'

export class Server {
  config: Config
  app: Express
  taskRouter: TaskController

  constructor(config: Config, taskRouter: TaskController) {
    this.app = express()
    this.config = config
    this.taskRouter = taskRouter

    this.app.use(cors())
    this.app.use(express.json())
    this.app.use('/tasks', this.taskRouter.router)
  }

  listen() {
    this.app.listen(
      this.config.server.port,
      this.config.server.host,
      () => {
        console.log(`Listening on port ${this.config.server.port}`)
      }
    )
  }
}
