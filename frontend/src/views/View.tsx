import React, { ReactNode } from 'react'
import Layout from 'src/components/common/Layout'

interface ViewProps {
  children: ReactNode
}

const View: React.FC<ViewProps> = ({ children }) => {
  return <Layout>{children}</Layout>
}

export default View
