import * as dotenv from 'dotenv'
import convict from 'convict'
import { Server } from './server'
import { TaskController } from './controllers/task.controller'
import { TaskService } from './services/task.services'
import { FirebaseTaskRepository } from './models/repository/firebase-task.repository'
import { configSchema } from './config/config'
import { FirebaseConfig } from './config/firebase/firebase.config'

function main() {
  dotenv.config()
  
  const config = convict(configSchema).getProperties()
  const firebaseConfig = new FirebaseConfig(config)
  const firebaseTaskRepository = new FirebaseTaskRepository(firebaseConfig)
  const taskService = new TaskService(firebaseTaskRepository)
  const taskRouter = new TaskController(taskService)
  const server = new Server(config, taskRouter)

  server.listen()
}

main()