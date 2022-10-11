import { Button } from '@mantine/core'
import { Outlet, useParams } from 'react-router'
import { Link } from 'react-router-dom'

const CharactersView = () => {
  const { id } = useParams()
  return (
    <div>
      {!id ? (
        <div>
          <Link to={'12344'}>
            <Button>one single character</Button>
          </Link>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  )
}

export default CharactersView
