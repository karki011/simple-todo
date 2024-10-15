import React, { useState } from 'react'
import { TodoItem } from '../todo-item'
import { useGetTodosQuery, useUpdateTodoMutation } from '../../api'
import './todo-list.css'
import Loading from '../loading/loading'
import { Tabs } from '../tabs-filter'
import dayjs from 'dayjs'
import { sortWith, ascend, descend } from 'ramda'

interface Todo {
  id: string
  description: string
  isComplete: boolean
  dueDate: string | null
}

export const TodoList: React.FC = () => {
  const { data: todos, isLoading, isSuccess, refetch } = useGetTodosQuery()
  const [updateTodo] = useUpdateTodoMutation()
  const [updatingTodoId, setUpdatingTodoId] = useState<string | null>(null)
  const [successfulTodoId, setSuccessfulTodoId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>('All')

  const handleToggleComplete = async (id: string, isComplete: boolean) => {
    try {
      setUpdatingTodoId(id)
      await updateTodo({ id, isComplete }).unwrap()
      setSuccessfulTodoId(id)
    } catch (error) {
      console.error('Failed to update todo:', error)
    } finally {
      setUpdatingTodoId(null)
    }
  }

  const handleRefresh = () => {
    refetch()
    setActiveTab('All')
  }

  const now = dayjs()

  const isOverdue = (todo: Todo): boolean =>
    !todo.isComplete && !!todo.dueDate && dayjs(todo.dueDate).isBefore(now)

  const compareDueDate = (todo: Todo) =>
    todo.dueDate ? dayjs(todo.dueDate).valueOf() : Infinity

  const compareCompleted = (todo: Todo) => (todo.isComplete ? 1 : -1)

  const sortedTodos = sortWith<Todo>([
    descend(isOverdue),
    ascend(compareCompleted),
    ascend(compareDueDate),
  ], todos || [])

  const filteredTodos = sortedTodos?.filter((todo: Todo) => {
    if (activeTab === 'Completed') {
      return todo.isComplete
    }
    return true
  })

  if (isLoading) {
    return <Loading text="Loading todos" />
  }

  return (
    <div className="todo-list-container">
      <div className="tabs-and-refresh">
        <Tabs activeTab={activeTab} onTabClick={setActiveTab} />
        <button onClick={handleRefresh} className="refresh-button">
          Refresh
        </button>
      </div>

      <ul>
        {isSuccess &&
          filteredTodos?.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleComplete}
              isLoading={updatingTodoId === todo.id}
              isSuccess={successfulTodoId === todo.id}
            />
          ))}
      </ul>
    </div>
  )
}
