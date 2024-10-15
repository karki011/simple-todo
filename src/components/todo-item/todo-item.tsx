import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import './todo-item.css'
import Loading from '../loading/loading'

interface TodoItemProps {
  todo: {
    id: string
    description: string
    isComplete: boolean
    dueDate: string | null
  }
  onToggle: (id: string, isComplete: boolean) => void
  isLoading: boolean
  isSuccess: boolean
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, isLoading, isSuccess }) => {
  const { id, description, isComplete, dueDate } = todo
  const [showCheck, setShowCheck] = useState(false)

  const handleCheckboxChange = () => {
    onToggle(id, !isComplete)
  }

  const isOverdue = !isComplete && dueDate && dayjs(dueDate).isBefore(dayjs())

  useEffect(() => {
    if (isSuccess) {
      setShowCheck(true)
      const timeout = setTimeout(() => {
        setShowCheck(false)
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [isSuccess])

  return (
    <div className="todo-item-container">
      <li
        className={`todo-item ${isComplete ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}
      >
        <div className="todo-info">
          <input
            type="checkbox"
            checked={isComplete}
            onChange={handleCheckboxChange}
            disabled={isLoading}
          />
          <span className="todo-description">{description}</span>
          {dueDate ? (
            <span className="todo-date">
              {dayjs(dueDate).format('MM/DD/YYYY')}
            </span>
          ) : (
            'Due Date Not Set'
          )}
        </div>
      </li>
      <div className="todo-status">
        {isLoading ? <Loading height="16px" /> : showCheck && '✅'}
      </div>
    </div>
  )
}
