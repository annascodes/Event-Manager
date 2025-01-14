import React, { useEffect, useState } from 'react'
import { BsBox } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icons from './Icons';
import DropdownMenu from './DropdownMenu';
import usePost from '../hooks/usePost';
import { logout } from '../redux/user/userSlice';
import useFetch from '../hooks/useFetch';


const Navbar2 = () => {
    const {data:receivedInvs, loading, err} = useFetch('/api/invitation/received')
    const [notresponded, setNotresponded] = useState(null)
    const { currentUser } = useSelector(state => state.user)
    const { post: logoutPost, data: logoutData, loading: logoutLoading, err: logoutErr } = usePost(`/api/auth/logout`)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = (arg) => {
        console.log('logging out this user', arg)
        logoutPost()
    }
    const handleProfile = (arg) => {
        console.log('showing user profile', arg)
        navigate('/profile', { state: currentUser ? currentUser._id : null })
    }

    useEffect(() => {
        if (logoutData) {
            dispatch(logout())
        }
    }, [logoutData])

    useEffect(()=>{
        if(receivedInvs){
          let count = 0;
          receivedInvs.map(i=>{
            if(i.response === 'not responded')
              count+=1
            setNotresponded(count)
          })
        }
          
    
      },[receivedInvs])

    const tailwind = 'btn btn-xs btn-outline rounded-md tracking-widest uppercase border-stone-700 '
    return (
        <div style={{ backgroundColor: '#202020' }} className=' z-50 sticky top-0 border-b border-zinc-600'>
            <div className=" flex flex-row items-center justify-between p-2">
                <div className="">
                    <Link to={'/'} className="p-2 hover:text-yellow-400 duration-200 text-xl">
                        {/* <BsBox /> */}
                        <span className='text-xs tracking-widest uppercase'>adams Eve</span>

                    </Link>
                </div>
                <div className='flex flex-row gap-2'>

                    {
                        currentUser ?
                            <>
                                <Link to={'/testevent'} className={`${location.pathname.toString().includes('/testevent') && 'btn-active'} ${tailwind} `}>

                                    <span className='md:block hidden'> Events</span>
                                    <span className='md:hidden block'> <Icons iconName={'event'} size='lg' /></span>


                                </Link>
                                
                                 

                                <Link to={'/makeevent'} className={`${location.pathname.toString().includes('/makeevent') && 'btn-active'} ${tailwind} `}>
                                    <span className='md:block hidden'> Make event</span>
                                    <span className='md:hidden block'> <Icons iconName={'plus2'} size='xl' /></span>

                                </Link>
                                <Link to={'/tickets'} 
                               className={`${location.pathname.toString().includes('/tickets') && 'btn-active'} ${tailwind} `}>
                                    <span className='md:block hidden'> Tickets</span>
                                    <span className='md:hidden block'> <Icons iconName={'ticket'} size='xl' /></span>

                                </Link>
                                <Link to={'/gallery'} className={`${location.pathname.toString().includes('/gallery') && 'btn-active'} ${tailwind} `}>
                                    <span className='md:block hidden'> Gallery</span>
                                    <span className='md:hidden block'> <Icons iconName={'images'} size='lg' /></span>

                                </Link>
                                <Link to={'/invitations'} className={`${location.pathname.toString().includes('/invitations') && 'btn-active'} ${tailwind} `}>
                                    <span className='md:block hidden'> Invitations
                                        {(notresponded) && <span className='bg-black text-white  rounded-md text-xs'>   </span> }
                                    </span>
                                    <span className='md:hidden block'> <Icons iconName={'mail'} size='xl' /></span>

                                   

                                </Link>
                            </>
                            : <>
                                <Link to={'/register'} className='bg-zinc-800 py-1 px-2 rounded-lg    text-sm hover:text-white'>Registration</Link>
                                <Link to={'/login'} className='bg-zinc-800 py-1 px-2 rounded-lg    text-sm hover:text-white'>Login</Link>
                            </>
                    }



                </div>
                {/* <div className="">
                    <button className="btn btn-square btn-sm rounded-md btn-ghost">
                        <Icons iconName={'user'} size='2xl' />
                    </button>
                </div> */}

                {
                    currentUser &&
                    <div className=''>

                        <DropdownMenu list={[
                            {
                                name: 'profile',
                                handle: handleProfile,
                                arg: 'profile arguments',
                                // link: '/profile',
                                icon: 'userOutline'
                            },
                            {
                                name: 'logout',
                                handle: handleLogout,
                                arg: 'logout arguments',
                                // link: '/',
                                icon: 'logout'
                            },
                        ]} />
                    </div>
                }
            </div>

        </div>
    )
}

export default Navbar2
