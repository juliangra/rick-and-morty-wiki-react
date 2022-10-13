import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import View from './View'

const HomeView = () => {
  return (
    <View>
      <h1>
        <Link to={'/characters'}>
          <Button>Characters</Button>
        </Link>
      </h1>
    </View>
  )
}

export default HomeView
