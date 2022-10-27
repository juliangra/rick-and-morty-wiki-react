import { ReactNode, ReactPortal } from 'react'
import ReactDOM from 'react-dom'

/**
 * Portals are not natively supported by Jest, but are built into
 * the Mantine library that we are using. Therefore, we need to mock
 * portals for the tests to run
 *
 * Inpiration: https://stackoverflow.com/a/71011825
 */
export const setupReactPortal = () => {
  const oldCreatePortal = ReactDOM.createPortal
  beforeAll(() => {
    ReactDOM.createPortal = (node: ReactNode): ReactPortal => node as ReactPortal
  })

  afterAll(() => {
    ReactDOM.createPortal = oldCreatePortal
  })
}

export default setupReactPortal
