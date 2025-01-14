import React, { useState } from 'react'
import InvitationCard from '../components/InvitationCard'
import { Link } from 'react-router-dom'
import ReceivedInvitations from '../components/invitationComponents/ReceivedInvitations'
import SentByMeInvitations from '../components/invitationComponents/SentByMeInvitations'
import CreateInvitation from '../components/invitationComponents/CreateInvitation'
import Icons from '../components/Icons'

const Invitations = () => {

    const [currentTab, setCurrentTab] = useState('received')
    return (
        <div className=''>

            <div style={{ backgroundColor: '#202020' }} className='md:w-1/2 mx-auto  px-1 sticky top-16 md:px-5  py-2 flex flex-row my-2 w-full justify-center gap-4'>

                <Link onClick={() => {
                    setCurrentTab('received')
                }} className={`bg-zinc-700 text-zinc-200 py-1 px-2 rounded-lg flex flex-row items-center justify-center ${currentTab === 'received' && 'text-white border-2'}    text-sm hover:text-white`}>

                    <span className=''>Received</span>
                    {/* <span className='md:hidden block'> <Icons iconName={'event'} size='xl' /></span> */}
                </Link>

                <Link
                    onClick={() => {
                        setCurrentTab('sentByMe')
                    }}
                    className={`bg-zinc-700 text-zinc-200 py-1 px-2 rounded-lg flex flex-row items-center justify-center ${currentTab === 'sentByMe' && 'text-white border-2'}    text-sm hover:text-white`}>

                    <span className=''>Sent</span>
                    {/* <span className='md:hidden block'> <Icons iconName={'event'} size='xl' /></span> */}
                </Link>



                <Link
                    onClick={() => {
                        setCurrentTab('create')
                    }}
                    className={`bg-zinc-700 text-zinc-200 py-1 px-2 rounded-lg flex flex-row items-center justify-center ${currentTab === 'create' && 'text-white border-2'}    text-sm hover:text-white`}>

                    <span className=' '>Create Invitations</span>
                    {/* <span className='md:hidden block'> <Icons iconName={'event'} size='xl' /></span> */}
                </Link>
            </div>


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
            }
            {/* 
            <div className='flex flex-col gap-4 items-center p-1'>
                <InvitationCard />
                <InvitationCard />
                <InvitationCard />
                <InvitationCard />
                <InvitationCard />
                <InvitationCard />
                <InvitationCard />
                <InvitationCard />
                <InvitationCard />
                <InvitationCard />
                <InvitationCard />
                <InvitationCard />
            </div> */}

        </div>
    )
}

export default Invitations
