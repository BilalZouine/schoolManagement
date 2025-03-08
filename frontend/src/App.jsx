import { useState } from 'react'
import './App.css'
import { router } from './router/index.jsx'
import { RouterProvider } from 'react-router-dom'
import StudentContext from './context/studentContext.jsx'
import { ThemeProvider } from './components/ui/theme-provider.jsx'

function App() {

  return (
    <>
      <StudentContext>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </StudentContext>

    </>
  )
}

export default App
