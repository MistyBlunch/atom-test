import admin from 'firebase-admin'
import { Config } from '../config'
import {
  CollectionReference,
  Firestore,
} from 'firebase-admin/firestore'

export class FirebaseConfig {
  db: Firestore

  constructor(config: Config) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: config.firebase.projectId,
        privateKey: config.firebase.privateKey,
        clientEmail: config.firebase.clientEmail
      }),
    })

    this.db = admin.firestore()
  }

  getCollection(collectionName: string): CollectionReference {
    return this.db.collection(collectionName)
  }
}
