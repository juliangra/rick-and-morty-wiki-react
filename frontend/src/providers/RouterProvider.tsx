import { ReactNode } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import BackToHomeButton from 'src/components/routes/BackToHomeButton'
import CharactersView from 'src/views/characters/CharactersView'
import CharacterView from 'src/views/characters/CharacterView'
import HomeView from 'src/views/HomeView'
import NotFoundView from 'src/views/NotFoundView'

type RouterProviderProps = {
  children: ReactNode
}

const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const isHome = window.location.hash === ''

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />

        <Route path="/characters/*" element={<CharactersView />}>
          <Route path=":id" element={<CharacterView />} />
          <Route path="*" element={<NotFoundView />} />
        </Route>

        <Route path="*" element={<NotFoundView />} />
      </Routes>

      {!isHome && <BackToHomeButton />}

      {children}
    </HashRouter>
  )
}

export default RouterProvider
