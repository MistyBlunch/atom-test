interface Server {
  host: string
  port: number
}

interface Firebase {
  projectId: string
  privateKey: string
  clientEmail: string
}

export interface Config {
  server: Server
  firebase: Firebase
}

export const configSchema = {
  server: {
    host: {
      format: String,
      default: 'localhost',
      env: 'HOST',
    },
    port: {
      format: 'port',
      default: 8000,
      env: 'PORT',
    },
  },
  firebase: {
    projectId: {
      format: String,
      default: '',
      env: 'FIREBASE_PROJECT_ID',
    },
    privateKey: {
      format: String,
      default: '',
      env: 'FIREBASE_PRIVATE_KEY',
    },
    clientEmail: {
      format: String,
      default: '',
      env: 'FIREBASE_CLIENT_EMAIL',
    },
  },
}
