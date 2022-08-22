import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login';
import UserDash from './pages/UserDash';
import Signup from './pages/Signup';
import Balance from './pages/Balance'
import Deposit from './pages/Deposit'
import Widthdraw from './pages/Widthdraw'
import PinChange from './pages/PinChange'
import FastCash from './pages/FastCash'
import Statement from './pages/Statement'
import MainLayout from './components/MainLayout'
import AuthLayout from './components/AuthLayout'
import { useAuthContext } from './hooks/useAuthContext';


function App() {

  const {atm_user} = useAuthContext()

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={atm_user ?  <Navigate to='/user'/> : <AuthLayout/>}>
          <Route index element={atm_user ?  <Navigate to='/user'/> : <Login/>}></Route>
          <Route path='signup' element={atm_user ?  <Navigate to='/user'/> : <Signup/>}></Route>
         </Route>
        <Route path='/user/' element={atm_user ? <MainLayout/> : <Navigate to='/'/>}>
           <Route index element={atm_user ? <UserDash/> : <Navigate to='/'/>}/>
        <Route path='balance' element={atm_user ? <Balance/> : <Navigate to='/'/>}></Route>
        <Route path='deposit' element={atm_user ? <Deposit/> : <Navigate to='/'/>}></Route>
        <Route path='widthdraw' element={atm_user ? <Widthdraw/> : <Navigate to='/'/>}></Route>
        <Route path='pinchange' element={atm_user ? <PinChange/> : <Navigate to='/'/>}></Route>
        <Route path='fastcash' element={atm_user ? <FastCash/> : <Navigate to='/'/>}></Route>
        <Route path='statement' element={atm_user ? <Statement/> : <Navigate to='/'/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
