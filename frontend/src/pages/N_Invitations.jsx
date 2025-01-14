import React, { useState } from 'react'
import InvitationCard from '../components/InvitationCard'
import { Link, Outlet, useLocation } from 'react-router-dom'
import ReceivedInvitations from '../components/invitationComponents/ReceivedInvitations'
import SentByMeInvitations from '../components/invitationComponents/SentByMeInvitations'
import CreateInvitation from '../components/invitationComponents/CreateInvitation'
import Icons from '../components/Icons'

const N_Invitations = () => {

    const location = useLocation()

    return (
        <div className=''>

            {/* <div style={{ backgroundColor: '#202020' }} className='md:w-1/2 mx-auto  px-1 sticky top-16 md:px-5  py-2 flex flex-row my-2 w-full justify-center gap-4'>

                <Link onClick={() => {
                    setCurrentTab('received')
                }} className={`bg-zinc-700 text-zinc-200 py-1 px-2 rounded-lg flex flex-row items-center justify-center ${currentTab === 'received' && 'text-white border-2'}    text-sm hover:text-white`}>

                    <span className=''>Received</span>
                    
                </Link>

                <Link
                    onClick={() => {
                        setCurrentTab('sentByMe')
                    }}
                    className={`bg-zinc-700 text-zinc-200 py-1 px-2 rounded-lg flex flex-row items-center justify-center ${currentTab === 'sentByMe' && 'text-white border-2'}    text-sm hover:text-white`}>

                    <span className=''>Sent</span>
                    
                </Link>



                <Link
                    onClick={() => {
                        setCurrentTab('create')
                    }}
                    className={`bg-zinc-700 text-zinc-200 py-1 px-2 rounded-lg flex flex-row items-center justify-center ${currentTab === 'create' && 'text-white border-2'}    text-sm hover:text-white`}>

                    <span className=' '>Create Invitations</span>
                </Link>
                
            </div> */}

            <div style={{ backgroundColor: '#202020' }} className='sticky top-12 py-3 z-10 flex flex-row flex-wrap justify-center gap-3'>
                <Link to={'/invitations/received'}
                    className={`${(location.pathname === '/invitations' || location.pathname === '/invitations/received') && 'btn-active'} btn btn-outline btn-xs rounded-md`}>
                    received
                </Link>
                <Link to={'/invitations/sent'}
                    className={`${(location.pathname === '/invitations/sent') && 'btn-active'} btn btn-outline btn-xs rounded-md`}>
                   sent
                </Link>
                <Link to={'/invitations/create'}
                    className={`${(location.pathname === '/invitations/create') && 'btn-active'} btn btn-outline btn-xs rounded-md`}>
                    create
                </Link>
            </div>

            <Outlet/>

{/* 
            {
                currentTab === 'received' &&
                <ReceivedInvitations />
            }
            {
                currentTab === 'sentByMe' &&
                <SentByMeInvitations />
            }
            {
                currentTab === 'create' &&
                <CreateInvitation />
            } */}



        </div>
    )
}

export default N_Invitations
