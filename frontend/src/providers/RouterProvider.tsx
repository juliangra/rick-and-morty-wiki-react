import { ReactNode } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import HomeView from '../views/HomeView'

type RouterProviderProps = {
  children: ReactNode
}

const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
      </Routes>

      {children}
    </HashRouter>
  )
}

export default RouterProvider
