import React, { useEffect } from 'react'
import { BsBox } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icons from './Icons';
import DropdownMenu from './DropdownMenu';
import usePost from '../hooks/usePost';
import { logout } from '../redux/user/userSlice';

const Navbar = () => {
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

    return (
        <div style={{ backgroundColor: '#202020' }} className='z-20 sticky top-0 border-b border-zinc-600'>
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
                                <Link to={'/testevent'} className={`${location.pathname.toString().includes('/testevent') && 'btn-active'} btn btn-xs btn-outline rounded-md `}>

                                    <span className='md:block hidden'> Events</span>
                                    <span className='md:hidden block'> <Icons iconName={'event'} size='xl' /></span>


                                </Link>
                                <Link to={'/testevent'} className='bg-zinc-700 text-zinc-200 py-1 px-2 rounded-lg flex flex-row items-center justify-center    text-sm hover:text-white'>

                                    <span className='md:block hidden'> Events</span>
                                    <span className='md:hidden block'> <Icons iconName={'event'} size='xl' /></span>


                                </Link>
                                {/* <Link to={'/events'} className='bg-zinc-700 text-zinc-200 py-1 px-2 rounded-lg flex flex-row items-center justify-center    text-sm hover:text-white'>

                                    <span className='md:block hidden'> Public events</span>
                                    <span className='md:hidden block'> <Icons iconName={'event'} size='xl' /></span>


                                </Link> */}
                                {/* <Link to={'/createevent'} className='bg-zinc-700 text-zinc-200 py-1 px-2 rounded-lg    text-sm hover:text-white'>Create event</Link> */}

                                <Link to={'/makeevent'} className='bg-zinc-700 text-zinc-200 py-1 px-2 rounded-lg    text-sm hover:text-white'>
                                    <span className='md:block hidden'> Make event</span>
                                    <span className='md:hidden block'> <Icons iconName={'plus'} size='xl' /></span>

                                </Link>
                                <Link to={'/tickets'} 
                                className={`${location.pathname.toString().includes('/tickets') && 'text-white '} bg-zinc-700   py-1 px-2 rounded-lg    text-sm hover:text-white`}>
                                    <span className='md:block hidden'> Tickets</span>
                                    <span className='md:hidden block'> <Icons iconName={'ticket'} size='xl' /></span>

                                </Link>
                                <Link to={'/gallery'} className='bg-zinc-700 text-zinc-200 py-1 px-2 rounded-lg    text-sm hover:text-white'>
                                    <span className='md:block hidden'> Gallery</span>
                                    <span className='md:hidden block'> <Icons iconName={'ticket'} size='xl' /></span>

                                </Link>
                                <Link to={'/invitations'} className='bg-zinc-700 text-zinc-200 py-1 px-2 rounded-lg    text-sm hover:text-white flex flex-row items-center gap-1'>
                                    <span className='md:block hidden'> Invitations</span>
                                    <span className='md:hidden block'> <Icons iconName={'mail'} size='xl' /></span>

                                    {/* <span className=' text-black bg-yellow-300 px-2 rounded-lg'> 2 </span> */}

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
                                icon: 'user'
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

export default Navbar
