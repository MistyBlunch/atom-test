import { Request, Response, request } from "express"
import { TaskController } from "../../src/controllers/task.controller"
import { TaskService } from "../../src/services/task.services"
import { Task } from "../../src/models/task.interface"

describe("TaskController", () => {
  let requestMock: Partial<Request>
  let responseMock: Partial<Response>
  
  const taskServiceMock = {
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }
  const taskController = new TaskController(taskServiceMock as unknown as TaskService)

  beforeEach(() => {
    requestMock = {}
    responseMock = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
      sendStatus: jest.fn()
    }
  })

  it("Should get all the tasks", async () => {
    const expectedValue: Task[] = [
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

    taskServiceMock.findAll.mockResolvedValue(expectedValue)
    await taskController['findAll'](requestMock as Request, responseMock as Response)

    expect(responseMock.status).toHaveBeenCalledWith(200)
    expect(responseMock.send).toHaveBeenCalledWith(expectedValue)
  })

  it("Should create a task", async () => {
    requestMock.body = {
      title: 'Task 3',
      description: 'Description 3',
      status: 'completed',
    }
    const expectedValue = {
      id: '3',
      ...requestMock.body
    }

    taskServiceMock.create.mockResolvedValue(expectedValue)
    await taskController['create'](requestMock as Request, responseMock as Response)

    expect(responseMock.status).toHaveBeenCalledWith(201)
    expect(responseMock.json).toHaveBeenCalledWith(expectedValue)
  })

  it("Should update a task", async () => {
    requestMock.params = { id: "2" }
    requestMock.body = {
      title: 'Task 2',
      description: 'Description 2',
      status: 'pending',
    }
    const expectedValue = {
      ...requestMock.params,
      ...requestMock.body
    }

    taskServiceMock.update.mockResolvedValue(expectedValue)
    await taskController['update'](requestMock as Request, responseMock as Response)

    expect(responseMock.status).toHaveBeenCalledWith(200)
    expect(responseMock.json).toHaveBeenCalledWith(expectedValue)
  })

  it("Should remove a task", async () => {
    requestMock.params = { id: "2" }

    await taskController['remove'](requestMock as Request, responseMock as Response)
    expect(responseMock.sendStatus).toHaveBeenCalledWith(200)
  })
})