import React from 'react'
import './tab-filter.css'

interface TabsProps {
  activeTab: string
  onTabClick: (tab: string) => void
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onTabClick }) => {
  return (
    <div className="tabs-container">
      <button
        className={`tab-button ${activeTab === 'All' ? 'active' : ''}`}
        onClick={() => onTabClick('All')}
      >
        All
      </button>
      <button
        className={`tab-button ${activeTab === 'Completed' ? 'active' : ''}`}
        onClick={() => onTabClick('Completed')}
      >
        Completed
      </button>
    </div>
  )
}
