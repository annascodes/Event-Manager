import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import usePost from '../hooks/usePost';
import moment from 'moment';
import SortBy from '../components/SortBy';
import useFetch from '../hooks/useFetch';

const Profile = () => {
    const { currentUser } = useSelector(state => state.user);
    const location = useLocation()
    const [user, setUser] = useState(null)
    const [profileData, setProfileData] = useState(null)
    const { post, data, loading, err } = usePost('/api/user/profile')

    const [tab, setTab] = useState('organized-events')

    const { post: getUserProfileData, data: userProfileData, loading: userDataLoading, err: userDataErr } = usePost(`/api/event/userprofiledata`);



    useEffect(() => {
        if (location.state) {
            //use that id to fetch the user 
            console.log(location.state)
            post({ id: location.state })
            getUserProfileData({ id: location.state })

        }
    }, [location.state])

    useEffect(() => {
        if (data)
            setUser(data)
    }, [data])
    useEffect(() => {
        if (userProfileData)
            setProfileData(userProfileData)

    }, [userProfileData])

     
    return (
        user &&
        <div className='lg:w-1/2 mx-auto   '>
            <div className='flex md:flex-row flex-col items-center py-5  justify-between'>
                <div className='md:w-1/2 w-full h-52 max-h-52 overflow-hidden  md:max-h-80  '>
                    <img src={user.profileImg || `https://avatar.iran.liara.run/public/boy?username=${user?.email}`} className=' w-full h-full object-contain' alt="" />
                </div>

                <div className='md:w-1/2 mx-auto '>
                    <div className='flex items-center gap-2'>
                        <h1 className=' text-xs text-yellow-300 tracking-widest uppercase'>first name</h1>
                        <h1>{user.firstName}</h1>
                    </div>
                    <div className='flex items-center gap-2'>
                        <h1 className='text-xs text-yellow-300 tracking-widest uppercase'>last name</h1>
                        <h1>{user.lastName}</h1>
                    </div>
                    <div className='flex items-center gap-2'>
                        <h1 className='text-xs text-yellow-300 tracking-widest uppercase'>email</h1>
                        <h1>{user.email}</h1>
                    </div>
                    <div className='flex items-center gap-2'>
                        <h1 className='text-xs text-yellow-300 tracking-widest uppercase'>joined on</h1>
                        <h1>{moment(user.createdAt).format('ll')}</h1>
                    </div>
                    <div className='flex items-center gap-2'>
                        <h1 className='text-xs text-yellow-300 tracking-widest uppercase'>bio</h1>
                        <h1>{user.bio}</h1>
                    </div>

                </div>
            </div>



            <div style={{ backgroundColor: '#202020' }} className='z-10 sticky top-10 flex flex-row items-center justify-center gap-3 border-t  pt-5 border-zinc-700 p-2 '>
                {/* <button onClick={() => setTab('visited-events')} className={`btn btn-outline btn-xs tracking-widest rounded-md ${tab === 'visited-events' && 'btn-active'}`}>
                    Visited events
                </button> */}
                <button onClick={() => setTab('organized-events')} className={`btn btn-outline btn-xs tracking-widest rounded-md ${tab === 'organized-events' && 'btn-active'}`}>
                    Organized events
                </button>
                <button onClick={() => setTab('invs-by-me')} className={`btn btn-outline btn-xs tracking-widest rounded-md ${tab === 'invs-by-me' && 'btn-active'}`}>
                    Invitation by you
                </button>
            </div>


            <div className=' w-full'>

                {
                    tab === 'visited-events' && 'showing visited events'
                }
                {
                    (tab === 'organized-events' && profileData) &&
                    <div className='flex flex-col gap-5'>
                        {
                            profileData.events.map((e, ei) => {
                                return (
                                    <div className='relative text-lg rounded-xl h-52 w-full overflow-hidden'>
                                        <img src={e?.imgs[0]} className='w-full h-full object-cover opacity-40' alt="" />

                                        <h1 className='italic absolute top-0 h-full w-full flex flex-col items-center justify-center'>
                                            <span className='text-xs tracking-widest text-black bg-white px-1'>{e.isPublic ? 'Public event' : 'Private event'}</span>
                                            <span className='text-xl tracking-widest font-bold'>{e.name}</span>
                                            <span>{e.status}</span>

                                            {/* <span> on Dec 25th, 2025</span> */}
                                            <Link to={`/eventdetails/${e._id}`} className='disabled:hidden text-yellow-200 mt-3 btn btn-outline btn-xs rounded-lg tracking-widest'>
                                                Details
                                            </Link>
                                        </h1>


                                    </div>
                                )
                            })
                        }

                    </div>


                }
                {
                     (tab === 'organized-events' && profileData) &&
                     <div className='flex items-center justify-center text-sm tracking-widest opacity-20'>
                        {profileData.events.length ===0 && <span>no organized event</span>  }
                        </div>

                }
                {
                     (tab === 'organized-events' && profileData) &&
                     <div className='flex items-center justify-center text-sm tracking-widest opacity-20'>
                        {profileData.invs.length ===0 && <span>no invitation yet</span>  }
                        </div>

                }
                {
                    (tab === 'invs-by-me' && profileData) &&
                    <div className='flex flex-col gap-5'>
                    {
                        profileData.invs.map((i, ii) => {
                            return (
                                <div key={i._id} className='border-2 border-zinc-700 relative text-lg rounded-xl h-36 w-full overflow-hidden'>
                                    {/* <img src={e?.imgs[0]} className='w-full h-full object-cover opacity-40' alt="" /> */}

                                    <h1 className='italic absolute top-0 h-full w-full flex flex-col items-center justify-center'>
                                        {/* <span className='text-xs tracking-widest text-black bg-white px-1'>{e.isPublic ? 'Public event' : 'Private event'}</span> */}
                                        <span className='text-xl tracking-widest font-bold'>{i.event.name}</span>
                                        <span className='flex items-center gap-3'> <span className='text-xs text-yellow-200 '>response</span> {i.response}</span>
                                        <span className='flex items-center gap-3'> <span className='text-xs text-yellow-200 '>sent by</span> {i.sendBy.email}</span>

                                        {/* <span> on Dec 25th, 2025</span> */}
                                        {/* <Link className='disabled:hidden text-yellow-200 mt-3 btn btn-outline btn-xs rounded-lg tracking-widest'>
                                            Details
                                        </Link> */}
                                    </h1>


                                </div>
                            )
                        })
                    }

                </div>
                }

            </div>


        </div>
    )
}

export default Profile
