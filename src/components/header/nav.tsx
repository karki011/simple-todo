import { FC } from 'react'
import { useTheme } from '../../theme-provider/use-theme'
import './nav.css'

const Nav: FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="nav">
      <div className="nav-brand">
        <h1>Subash Karki -- SIMPLE TODO</h1>
      </div>
      <div className="nav-links">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>
    </nav>
  )
}

export default Nav
