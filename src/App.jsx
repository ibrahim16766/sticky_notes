import React from "react"
import { Routes, Route } from "react-router-dom"
import { HomePage } from "./components/HomePage"
import { NewNote } from "./components/NewNote"

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='newNote' element={<NewNote />} />

      </Routes>

    </>
  )
}

export default App
