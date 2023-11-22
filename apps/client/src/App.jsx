import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { Route, Routes } from 'react-router-dom'
import AuthPage from './pages/auth'
import AddEmployee from './pages/addEmployee'
import EmployeeData from './pages/EmployeeData';
import Dashboard from './pages/dashboard';
import { useNavigate } from 'react-router-dom';



function App() {
  const [count, setCount] = useState(0)

  return (<div>
    <Routes>
    <Route path='/' element={<AuthPage />} />
    <Route path='/addEmployee' element={<AddEmployee/>}/>
    <Route path='/EmployeeData' element={<EmployeeData/>}/>
    <Route path='/dashboardUser' element={<Dashboard/>}/>
    
    </Routes>
  </div>
  )
}

export default App
