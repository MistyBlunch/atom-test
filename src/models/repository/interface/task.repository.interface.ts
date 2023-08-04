import { Task } from '../../task.interface'

export interface TaskRepository {
  findAll(): Promise<Task[]>
  findById(id: string): Promise<Task | undefined>
  create(task: Task): Promise<Task>
  update(id: string, task: Task): Promise<Task | undefined>
  remove(id: string): Promise<void>
}
