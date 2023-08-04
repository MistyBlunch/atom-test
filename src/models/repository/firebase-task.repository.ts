import { Task } from '../task.interface'
import { TaskRepository } from './interface/task.repository.interface'
import { CollectionReference } from 'firebase-admin/firestore'
import { FirebaseConfig } from '../../config/firebase/firebase.config'

export class FirebaseTaskRepository implements TaskRepository {
  collection: CollectionReference

  constructor(firebaseConfig: FirebaseConfig) {
    this.collection = firebaseConfig.getCollection('tasks')
  }

  findAll = async (): Promise<Task[]> => {
    const querySnapshot = await this.collection.get()
    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as Task
      return {
        id: doc.id,
        ...data,
      }
    })
  }

  findById = async (id: string): Promise<Task | undefined> => {
    const taskRef = this.collection.doc(id)
    const doc = await taskRef.get()

    if (!doc.exists) return

    return {
      id: id,
      ...doc.data()
    } as Task
  }

  create = async (task: Task): Promise<Task> => {
    const res = await this.collection.add(task)
    const id = res.id
    const data = { id, ...task }
    return data
  }

  update = async (id: string, task: Task): Promise<Task> => {
    delete task.id
    await this.collection.doc(id).set(task)
    return { id, ...task }
  }

  remove = async (id: string): Promise<void> => {
    await this.collection.doc(id).delete()
  }
}
