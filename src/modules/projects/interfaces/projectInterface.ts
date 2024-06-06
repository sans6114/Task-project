export interface Project {
  id: string
  name: string
  tasks: Tasks[]
}

export interface Tasks {
  id: string
  name: string
  completedAt?: Date
}
