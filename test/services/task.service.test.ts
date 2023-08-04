import { TaskRepository } from '../../src/models/repository/interface/task.repository.interface'
import { Task } from '../../src/models/task.interface'
import { TaskService } from '../../src/services/task.services'

describe('TaskServiceTests', () => {
  let taskRepositoryMock = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  const taskService = new TaskService(taskRepositoryMock)

  beforeEach(() => {
    taskRepositoryMock.findById = jest.fn()
  })

  it('Should find all the tasks', async () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        status: 'pending',
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Description 2',
        status: 'completed',
      },
    ]
    taskRepositoryMock.findAll.mockResolvedValue(mockTasks)

    const result = await taskService.findAll()
    expect(result).toEqual(mockTasks)
  })

  it('Should create a new task and return it', async () => {
    const newTask: Task = {
      title: 'New Task',
      description: 'New Description',
      status: 'pending',
    }
    const createdTask: Task = { id: '3', ...newTask }
    taskRepositoryMock.create.mockResolvedValue(createdTask)

    const result = await taskService.create(newTask)
    expect(result).toEqual(createdTask)
  })

  it('should update a task and return it', async () => {
    const existingTask: Task = {
      id: '4',
      title: 'Existing Task',
      description: 'Existing Description',
      status: 'pending',
    }
    taskRepositoryMock.findById.mockResolvedValue(existingTask)

    const updatedTask: Task = {
      id: '4',
      title: 'Updated Task',
      description: 'Updated Description',
      status: 'completed',
    }
    taskRepositoryMock.update.mockResolvedValue(updatedTask)

    const result = await taskService.update('4', updatedTask)
    expect(result).toEqual(updatedTask)
  })

  it('Should remove a task', async () => {
    const existingTask: Task = {
      id: '6',
      title: 'Existing Task',
      description: 'Existing Description',
      status: 'pending',
    }
    taskRepositoryMock.findById.mockResolvedValue(existingTask)

    await taskService.remove('6')

    expect(taskRepositoryMock.findById).toBeCalledTimes(1)
    expect(taskRepositoryMock.remove).toBeCalledTimes(1)
  })
})
