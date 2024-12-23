import { useState } from 'react'
import './App.css'
import { router } from './route/index.jsx'
import { RouterProvider } from 'react-router-dom'
import StudentContext from './contexts/studentContext.jsx'

function App() {

  return (
    <>
    <StudentContext>

            <RouterProvider router={router}/>

    </StudentContext>

    </>
  )
}

export default App
