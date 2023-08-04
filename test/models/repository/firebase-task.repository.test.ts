import { FirebaseConfig } from '../../../src/config/firebase/firebase.config'
import { FirebaseTaskRepository } from '../../../src/models/repository/firebase-task.repository'
import { Task } from '../../../src/models/task.interface'

const taskToDoc = (task: Task) => {
  const docTask = {...task}
  delete docTask.id

  return {
    id: task.id,
    data: jest.fn().mockReturnValue(docTask)
  }
}

describe('FirebaseTaskRepository', () => {
  const firebaseCollectionMock = {
    get: jest.fn(),
    doc: jest.fn().mockReturnValue({
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn()
    }),
    add: jest.fn()
  }

  const firebaseConfigMock = {
    getCollection: jest.fn().mockReturnValue(firebaseCollectionMock),
  } as unknown as FirebaseConfig

  const firebaseTaskRepository = new FirebaseTaskRepository(firebaseConfigMock)

  it('Should find all the tasks', async () => {
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
    
    firebaseCollectionMock.get.mockResolvedValue({
      docs: expectedValue.map(doc => taskToDoc(doc))
    })

    const result = await firebaseTaskRepository.findAll();

    expect(result).toEqual(expectedValue)
  })

  it("Should find a task by its ID", async () => {
    const expectedValue = {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      status: 'completed',
    }

    firebaseCollectionMock.doc().get.mockResolvedValue({
      exists: true,
      ...taskToDoc(expectedValue)
    })

    const result = await firebaseTaskRepository.findById("2")

    expect(result).toEqual(expectedValue)
  })

  it("Should create a task", async () => {
    const initialValue = {
      title: 'Task 2',
      description: 'Description 2',
      status: 'completed',
    }
    const expectedValue = {
      id: '2',
      ...initialValue
    }

    firebaseCollectionMock.add.mockResolvedValue(taskToDoc(expectedValue))

    const result = await firebaseTaskRepository.create(initialValue)

    expect(result).toEqual(expectedValue)
    expect(firebaseCollectionMock.add).toBeCalledTimes(1)
  })

  it("Should update a task", async () => {
    await firebaseTaskRepository.update("2", {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      status: 'completed',
    })

    expect(firebaseCollectionMock.doc().set).toBeCalledTimes(1)
  })

  it("Should remove a task", async () => {
    await firebaseTaskRepository.remove("1")

    expect(firebaseCollectionMock.doc().delete).toBeCalledTimes(1)
  })
})
