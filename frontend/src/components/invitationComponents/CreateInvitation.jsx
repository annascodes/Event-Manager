import React, { useEffect, useState } from 'react'
import InputTag from '../InputTag'
import useFetchData from '../../hooks/useFetchData'
import Icons from '../Icons'
import usePost from '../../hooks/usePost'
import useFetch from '../../hooks/useFetch'
import CheckDropdown from '../CheckDropdown'

import RoleAssigning from './RoleAssigning'
import Loading from '../Loading'
import {toast} from 'sonner'
import { useNavigate } from 'react-router-dom'



const CreateInvitation = () => {
    const {post:sendInvitation, data:sendInvitationData, loading:sendInvitationLoading, err:sendInvitationErr} = usePost('/api/invitation/sendinvitation')
    const [searchedTerm, setSearchedTerm] = useState(null)
    const { post, data, loading: searchedUserLoading, err: searchedUserErr } = usePost('/api/user/searchedusers')
    const { data: eventsbyme, loading: eventsbymeloading, err: eventsbymeerr } = useFetch('/api/event/eventsbyme')
    const [searchedUsers, setSearchedUsers] = useState(null)
    const [selectedUser, setSelectedUser] = useState([])

    const [selectedEvent, setSelectedEvent] = useState(null)
    const [selectedEventId, setSelectedEventId] = useState(null)
    const [err, setErr] = useState(null)
    const navigate = useNavigate()


    const handleSearchedPeople = async () => {
        if (searchedTerm === '')
            return;
        console.log(searchedTerm)
        post({ searchedTerm })
    }
    useEffect(() => {
        if (data) {
            console.log(data)
            setSearchedUsers(data)
        }
    }, [data])

    useEffect(()=>{
         setSelectedUser([])

    },[selectedEvent])

    console.log('SelectedEventId:',selectedEventId)
    console.log('searchedUsers:', searchedUsers )
    console.log('eventsbyme:', eventsbyme )

    const handleSendInvitation = (usersRole) => {
        let temp = {};
        eventsbyme && eventsbyme.map(e=>{
            if(e.name === selectedEvent){
                temp = {...e}
            }
        } )

        console.log({event:temp,usersRole})
        sendInvitation({event:temp,usersRole})


    }

    
    useEffect(()=>{
        if(sendInvitationData){
            toast.success('Invitation sent successflly')
            navigate('/invitations/sent')
            
        }

    },[sendInvitationData])

   

    if(sendInvitationLoading){
        return <Loading type='loading-spinner' size='loading-md'/>
    }


    return (
        <div className='p-2' >
            <h1 className='uppercase text-sm mb-5 text-center tracking-widest'>create invitation</h1>

            {/* step 1  */}
            {/* selecting event from dropdown menu  */}
            {/* <h1 className='text-xs w-full bg-yellow-900 tracking-widest text-center  text-white'>STEP 1</h1> */}
            <div className='my-4 md:w-1/2 mx-auto'>

                <div className='flex flex-row  items-center'>
                    <CheckDropdown
                        options={eventsbyme && eventsbyme.map(e => e.name)}
                        title='Select event'
                        setValue={setSelectedEvent}
                        setErr={setErr}
                    />
                </div>
            </div>

            {/* step 2  */}
            {
                selectedEvent &&
                <div>
                    {/* <h1 className='text-xs w-full bg-yellow-900 tracking-widest text-center  text-white'>STEP 2</h1> */}

                    {/* showing the selectedUser (for invitation sending)   */}
                    <div className='flex flex-row my-4 justify-center  flex-wrap gap-2  items-center'>
                        {
                            selectedUser && selectedUser.map((u, ui) => {
                                return (
                                    <div key={ui} className='flex border border-stone-700 p-1 flex-row gap-2 items-center'>
                                        <h1>{u.email}</h1>
                                        <button
                                            onClick={() => {
                                                setSelectedUser(selectedUser.filter(user => user._id !== u._id))
                                            }}
                                            className='p-2 text-red-500 hover:scale-125 hover:text-white duration-200'>
                                            <Icons iconName={'close'} size='lg' />
                                        </button>

                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* searchTerm div  */}
                    <div className='mt-3 md:w-1/2 mx-auto md:justify-start justify-center p-2 border-stone-700 rounded-lg flex flex-wrap items-center gap-3 '>
                        <InputTag fieldName={'Search people'} setValue={setSearchedTerm} type='text' size='md' />


                        {
                            searchedUserLoading ?
                                <button className='btn btn-outline border-none btn-sm rounded-lg uppercase text-xs tracking-widest'>
                                    searching
                                    <span className='loading loading-dots loading-md'></span>
                                </button>
                                : <button disabled={!searchedTerm} onClick={handleSearchedPeople} className='btn btn-outline btn-sm rounded-lg uppercase text-xs tracking-widest'>search</button>
                        }

                    </div>

                    {
                        searchedUsers && searchedUsers.length === 0 &&
                        <div className='md:ml-10 my-5 tracking-widest text-xs'>
                            <span>no user found</span>
                        </div>
                    }

                    {/* searched user to add  */}
                    <div className={`mx-auto  my-3 ${searchedUsers && 'border'}  border-stone-600 rounded-lg md:w-1/2`}>
                        {
                            searchedUsers && searchedUsers.map((u, ui) => {
                                return (
                                    <div key={ui} className=' my-1 border-stone-700 rounded-lg flex flex-wrap flex-row items-center p-2 justify-between gap-1 ' >

                                        <div className='flex items-center  gap-2'>
                                            <Icons iconName={'user'} size='lg' />
                                            <h1>{u.firstName}</h1>
                                            <h1>{u.lastName}</h1>
                                            <h1 className='text-sm tracking-widest'>( {u.email} )</h1>
                                        </div>
                                        {
                                            u.receivedInv.some(i=> i.event.name === selectedEvent) ? <span className='bg-white text-black   px-1 tracking-widest uppercase text-xs'>sent</span>
                                            :(
                                                selectedUser.some((selected) => selected._id === u._id)
                                                ?
                                                <button className=' p-2 border-none  '>
                                                    <Icons iconName={'good'} size='lg' color='text-green-500' />
                                                </button>
                                                :
                                                <button onClick={() => {
                                                    setSelectedUser([...selectedUser, u])
                                                }} className='btn btn-outline btn-xs border-none  '>
                                                    <Icons iconName={'plus'} size='lg' />
                                                </button>
                                            )

                                        }
                                     

                                        {/* {
                                            selectedUser.some((selected) => selected._id === u._id)
                                                ?
                                                <button className=' p-2 border-none  '>
                                                    <Icons iconName={'good'} size='lg' color='text-green-500' />
                                                </button>
                                                :
                                                <button onClick={() => {
                                                    setSelectedUser([...selectedUser, u])
                                                }} className='btn btn-outline btn-xs border-none  '>
                                                    <Icons iconName={'plus'} size='lg' />
                                                </button>
                                        } */}
                                    </div>
                                )
                            })
                        }

                        {
                            searchedUsers && <div className='flex justify-center'>
                                <button onClick={() => {
                                    setSearchedUsers(null)
                                }} className='btn btn-error btn-sm tracking-widest uppercase text-xs '>clear</button>
                            </div>
                        }
                    </div>

                </div>
            }


            {/* step final  */}

            {/* {
                selectedUser.length > 0 &&
                // <h1 className='text-xs w-full my-4 bg-yellow-900 tracking-widest text-center  text-white'>STEP 3</h1>
            } */}

            {
                selectedUser.length > 0 &&
                <div className='md:w-1/2 mx-auto'>
                    <RoleAssigning selectedUser={selectedUser} handleSendInvitation={handleSendInvitation} />
                </div>
            }








        </div>
    )
}

export default CreateInvitation
