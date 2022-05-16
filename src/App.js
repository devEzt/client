import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import NavBar from './components/NavBar'
import Home from './components/Home'
import FuncionarioForm from './components/FuncionarioForm'
import FuncionarioEdit from './components/FuncionarioEdit'
import FuncionarioView from './components/FuncionarioView'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add-funcionario" element={<FuncionarioForm />} />
        <Route exact path="/edit-funcionario/:id" element={<FuncionarioEdit />} />
        <Route exact path="/view-funcionario/:id" element={<FuncionarioView />} />
      </Routes>
    </>
  )
}

export default App
