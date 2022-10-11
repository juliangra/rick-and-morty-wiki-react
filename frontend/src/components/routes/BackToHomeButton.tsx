import { Grid, Box, Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { HEADER_HEIGHT_PX } from 'src/constants/style'

const BackToHomeButton = () => {
  return (
    <Grid
      justify="end"
      style={{ width: '100%', position: 'absolute', top: HEADER_HEIGHT_PX }}
      px="sm"
    >
      <Box
        style={{
          height: 'fit-content',
          width: 'fit-content',
          zIndex: 1000
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button color={'indigo'}>Back to home</Button>
        </Link>
      </Box>
    </Grid>
  )
}

export default BackToHomeButton
