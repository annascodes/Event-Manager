import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import Home from './pages/Home'
import Registration from './pages/Registration'
import Navbar from './components/Navbar'
import PageNotFound from './components/PageNotFound'
import Login from './pages/Login'
import { useSelector } from 'react-redux'
import Events from './pages/Events'
import CreateEvent from './pages/CreateEvent'
import MakeEvent from './pages/MakeEvent'
import EditEvent from './pages/EditEvent'
import Invitations from './pages/Invitations'
import EventDetailsPage from './pages/EventDetailsPage'
import Profile from './pages/Profile'
import BoughtTickets from './pages/BoughtTickets'
import Gallery from './pages/Gallery'
import TEvents from './pages/TEvents'
import TPublic from './pages/TPublic'
import TByme from './pages/TByme'
import TSaved from './pages/TSaved'
import Navbar2 from './components/Navbar2'
import N_Invitations from './pages/N_Invitations'
 
import ReceivedInvitations from './components/invitationComponents/ReceivedInvitations'
import SentByMeInvitations from './components/invitationComponents/SentByMeInvitations'
import CreateInvitation from './components/invitationComponents/CreateInvitation'

function App() {
  const { currentUser } = useSelector(state => state.user)
  // console.log(currentUser)

  return (
    <div>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Navbar2 />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={currentUser ? <Navigate to={'/'} /> : <Registration />} />
          <Route path='/login' element={currentUser ? <Navigate to={'/'} /> : <Login />} />
          <Route path='/events' element={currentUser ? <Events /> : <Navigate to={'/login'} />} />
          <Route path='/createevent' element={currentUser ? <CreateEvent /> : <Navigate to={'/login'} />} />
          <Route path='/makeevent' element={currentUser ? <MakeEvent /> : <Navigate to={'/login'} />} />
          <Route path='/editevent' element={currentUser ? <EditEvent /> : <Navigate to={'/login'} />} />
          {/* <Route path='/invitations' element={currentUser ? <Invitations /> : <Navigate to={'/login'} />} /> */}
          <Route path='/eventdetails/:id' element={currentUser ? <EventDetailsPage /> : <Navigate to={'/login'} />} />
          <Route path='/profile' element={currentUser ? <Profile /> : <Navigate to={'/login'} />} />
          <Route path='/tickets' element={currentUser ? <BoughtTickets /> : <Navigate to={'/login'} />} />
          <Route path='/gallery' element={currentUser ? <Gallery /> : <Navigate to={'/login'} />} />

          <Route path='/testevent' element={currentUser ? <TEvents /> : <Navigate to={'/login'} />} >
            <Route index element={<TPublic/>} />
            <Route path='testpublic' element={<TPublic />} />
            <Route path='testbyme' element={<TByme />} />
            <Route path='testsaved' element={<TSaved />} />

          </Route>

          <Route path='/invitations' element={currentUser ? <N_Invitations /> : <Navigate to={'/login'} />} > 
            <Route index element={<ReceivedInvitations/>} />
            <Route path='received' element={<ReceivedInvitations/>} />
            <Route path='sent' element={<SentByMeInvitations/>} />
            <Route path='create' element={ <CreateInvitation />} />
          
          </Route>

          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  )
}

export default App
