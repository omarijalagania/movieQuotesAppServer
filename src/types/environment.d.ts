export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string
      TOKEN_SECRET: string
      BASE_URL: string
      FRONTEND_URL: string
      MONGO_PROTOCOL: string
      MONGO_DATABASE: string
      MONGO_PORT?: number
      MONGO_USER: string
      MONGO_PASSWORD: number
      MONGO_PARAMS: number
      MONGO_HOST: string

      EMAIL_USERNAME: string
      EMAIL_PASSWORD: string
      EMAIL_FROM: string
    }
  }
}
