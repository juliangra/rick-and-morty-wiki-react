import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'

const HomeView = () => {
  return (
    <h1>
      <Link to={'/characters'}>
        <Button>Characters</Button>
      </Link>
    </h1>
  )
}

export default HomeView
