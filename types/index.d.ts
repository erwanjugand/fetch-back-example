export interface UserData {
  id: number
  updatedAt: Date
}

export interface CustomResponse<T> {
  items: T[]
  userDatas?: UserData[]
}

export interface User {
  id: number
  name: string
  updatedAt: Date
}

export interface Post {
  id: number
  title: string
  authorId: number
  author?: User
}
