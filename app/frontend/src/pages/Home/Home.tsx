import { Box } from '@mui/material'
import * as React from 'react'
import { ContextType } from '../../@types/ContextTypes'
import { LoginForm } from '../../components/LoginForm'
import { Modal } from '../../components/Modal'
import AppContext from '../../context/AppContext'

export default function Home() {
  const { isModalOpen } = React.useContext(AppContext) as ContextType
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <LoginForm />
      {isModalOpen && <Modal />}
    </Box>
  )
}
