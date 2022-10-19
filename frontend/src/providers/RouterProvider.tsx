import { ReactNode } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import LoginView from 'src/views/auth/LoginView'
import RegisterView from 'src/views/auth/RegisterView'
import CharacterView from 'src/views/characters/CharacterView'
import DashboardView from 'src/views/DashboardView'
import HomeView from 'src/views/HomeView'
import NotFoundView from 'src/views/NotFoundView'
import FilterProvider from './FilterProvider'

type RouterProviderProps = {
  children: ReactNode
}

const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />

        <Route
          path="/characters/*"
          element={
            <FilterProvider>
              <DashboardView />
            </FilterProvider>
          }
        >
          <Route path=":id" element={<CharacterView />} />
          <Route path="*" element={<NotFoundView />} />
        </Route>

        <Route path="*" element={<NotFoundView />} />
      </Routes>

      {children}
    </HashRouter>
  )
}

export default RouterProvider
