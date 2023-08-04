import express, { Request, Response } from 'express'
import { Task } from '../models/task.interface'
import { TaskService } from '../services/task.services'

export class TaskController {
  router: express.Router
  taskService: TaskService

  constructor(taskService: TaskService) {
    this.router = express.Router()
    this.taskService = taskService

    this.router.get('/', this.findAll)
    this.router.post('/', this.create)
    this.router.put('/:id', this.update)
    this.router.delete('/:id', this.remove)
  }

  // GET tasks
  private findAll = async (req: Request, res: Response) => {
    const tasks = await this.taskService.findAll()

    res.status(200).send(tasks)
  }

  // POST tasks
  private create = async (req: Request, res: Response) => {
    const task: Task = req.body
    const newTask = await this.taskService.create(task)

    res.status(201).json(newTask)
  }

  // PUT tasks/:id
  private update = async (req: Request, res: Response) => {
    const id = req.params.id
    const taskUpdate: Task = req.body
    const task = await this.taskService.update(id, taskUpdate)

    if (!task) res.sendStatus(404)

    res.status(200).json(task)
  }

  // DELETE tasks/:id
  private remove = async (req: Request, res: Response) => {
    const id = req.params.id

    await this.taskService.remove(id)
    res.sendStatus(200)
  }
}
