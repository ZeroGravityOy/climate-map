'use client'

import React from 'react'
import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

import { useUIStore } from '#/common/store'

export const NavBar = () => {
  // const { isLoggedIn }: any = React.useContext(UserStateContext)
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)
  const setIsLoginModalOpen = useUIStore((state) => state.setIsLoginModalOpen)
  return (
    <>
      {isSidebarOpen && (
        <Box
          className="navbar-container"
          sx={(theme) => ({
            zIndex: theme.zIndex.appBar,
            width: '100%',
            minWidth: '200px',
            height: '100px',
            backgroundColor: theme.palette.primary.dark,
            margin: 'auto 0 0 0',
            bottom: 0,
            border: 1,
            borderColor: theme.palette.primary.dark,
            display: 'flex',
            flexDirection: 'row',
            p: 4,
          })}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Button sx={{ color: 'neutral.lighter', typography: 'h3' }} onClick={() => setIsLoginModalOpen(true)}>
              Kirjaudu
            </Button>
          </Box>
        </Box>
      )}
    </>
  )
}

const ImageWrapper = styled('div')({
  padding: '8px 0 0 0',
})
