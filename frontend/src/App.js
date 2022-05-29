import './App.css';
import { Routes, Route } from 'react-router-dom'
import { About } from './components/About'
import { Users } from './components/Users'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <div className='container p-4'>
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/' element={<Users />} />
      </Routes>
      </div>
    </>
  )
}

export default App;
