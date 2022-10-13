import { AppShell, Header } from '@mantine/core'
import { ReactNode } from 'react'
import { HEADER_HEIGHT_PX } from 'src/constants/style'
import HeaderContent from './HeaderContent'

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AppShell
      padding="xs"
      header={
        <Header height={HEADER_HEIGHT_PX} p="xs">
          <HeaderContent />
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],

          height: '90vh'
        }
      })}
    >
      {children}
    </AppShell>
  )
}

export default Layout
