export type RawTodo = {
  id: string
  description: string
  isComplete: boolean
  dueDate: string | null
}

export type RawUpdateTodoResponse = {
  status: string
}
