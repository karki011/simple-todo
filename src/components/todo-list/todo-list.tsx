import React, { useState } from 'react'
import { TodoItem } from '../todo-item'
import { useGetTodosQuery, useUpdateTodoMutation } from '../../api'
import './todo-list.css'
import Loading from '../loading/loading'
import { Tabs } from '../tabs-filter'

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

  const filteredTodos = todos?.filter((todo) => {
    if (activeTab === 'Completed') {
      return todo.isComplete
    }
    return true
  })

  const handleRefresh = () => {
    refetch()
    setActiveTab('All')
  }

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
