import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Register from './components/Register'

function App() {
  return (
    <>
      <NavBar />
      <Home />
      <Register />
    </>
  )
}

export default App
