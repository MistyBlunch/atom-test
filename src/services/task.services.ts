import { TaskRepository } from '../models/repository/interface/task.repository.interface'
import { Task } from '../models/task.interface'

export class TaskService {
  taskRepository: TaskRepository

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository
  }

  findAll = async (): Promise<Task[]> => {
    const tasks = await this.taskRepository.findAll()
    return tasks
  }

  create = async (task: Task): Promise<Task> => {
    const newTask = await this.taskRepository.create(task)
    return newTask
  }

  update = async (
    id: string,
    task: Task
  ): Promise<Task | undefined> => {
    const existingTask = await this.taskRepository.findById(id)

    if (!existingTask) return

    const updatedTask = await this.taskRepository.update(id, task)
    return updatedTask
  }

  remove = async (id: string): Promise<void> => {
    const existingTask = await this.taskRepository.findById(id)

    if (!existingTask) return

    this.taskRepository.remove(id)
  }
}
