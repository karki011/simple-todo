// src/Loading.tsx
import React from 'react'
import './loading.css'

interface LoadingProps {
  text?: string
  width?: string
  height?: string
}

const Loading: React.FC<LoadingProps> = ({ text, width, height }) => {
  return (
    <div className="loading-container">
      <svg
        className="spinner"
        width={width ?? '20px'}
        height={height ?? '20px'}
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </svg>
      {text && <p className="loading-text">{text}</p>}
    </div>
  )
}

export default Loading
